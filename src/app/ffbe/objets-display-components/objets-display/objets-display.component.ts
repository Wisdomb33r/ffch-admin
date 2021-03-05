import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {Objet} from '../../model/objet/objet.model';
import {forkJoin, Observable, of, Subscription} from 'rxjs';
import {ObjetsComparingContainer} from '../../model/objet/objets-comparing-container.model';
import {FfchClientService} from '../../services/ffch-client.service';
import {catchError} from 'rxjs/operators';
import {FfbeUtils} from '../../utils/ffbe-utils';

@Component({
  selector: 'app-objets-display',
  templateUrl: './objets-display.component.html',
  styleUrls: ['./objets-display.component.css']
})
export class ObjetsDisplayComponent implements OnChanges, OnDestroy {

  @Input() objets: Array<Objet>;
  public objetsErrors: Array<string> = [];
  public objetsContainer: Array<ObjetsComparingContainer>;
  public subscription: Subscription;

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnChanges() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.objetsErrors = [];
    this.objetsContainer = [];
    if (Array.isArray(this.objets)) {
      const observables: Array<Observable<Objet>> = [];
      this.objets.forEach(objet => {
        observables.push(this.ffchClientService.getObjetByGumiId$(objet.gumi_id)
          .pipe(catchError(error => {
            this.objetsErrors.push('Erreur lors du traitement de l\'objet '
              + objet.nom + ' (' + objet.gumi_id + ') : ' + error);
            return of(null);
          })));
      });
      this.subscription = forkJoin(observables).subscribe(results => {
        results.forEach((o, index) => {
            this.objets[index].id = FfbeUtils.isNullOrUndefined(o) ? undefined : o.id;
            this.objetsContainer.push(
              new ObjetsComparingContainer(this.objets[index],
                FfbeUtils.isNullOrUndefined(o) ? null : Objet.produce(o),
                Objet.produce(this.objets[index]))
            );
          }
        );
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public areObjetsErrorsDisplayed(): boolean {
    return Array.isArray(this.objetsErrors) && this.objetsErrors.length > 0;
  }
}
