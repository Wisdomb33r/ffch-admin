import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {Recette} from '../model/recette.model';
import {RecettesComparingContainer} from '../model/recettes-comparing-container.model';
import {Objet} from '../model/objet/objet.model';
import {FfchClientService} from '../services/ffch-client.service';
import {forkJoin, Observable, of, Subscription} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {FfbeUtils} from '../utils/ffbe-utils';

@Component({
  selector: 'app-recettes-display',
  templateUrl: './recettes-display.component.html',
  styleUrls: ['./recettes-display.component.css']
})
export class RecettesDisplayComponent implements OnDestroy, OnChanges {

  @Input() recettes: Array<Recette>;
  public recettesErrors: Array<string> = [];
  public recettesContainers: Array<RecettesComparingContainer> = [];
  public subscription: Subscription;

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnChanges() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.recettesErrors = [];
    this.recettesContainers = [];
    if (Array.isArray(this.recettes)) {
      const observables: Array<Observable<any>> = [];
      this.recettes.forEach(recette => {
        observables.push(this.ffchClientService.getRecette$(recette.recette_gumi_id, recette.resultat_gumi_id)
          .pipe(catchError(error => {
            this.recettesErrors.push('Erreur lors du traitement de la recette '
              + recette.resultat_gumi_id + ' (' + recette.recette_gumi_id + ') : ' + error);
            return of(error);
          })));
        observables.push(this.ffchClientService.getObjetByGumiId$(recette.recette_gumi_id)
          .pipe(catchError(error => {
            this.recettesErrors.push('Erreur lors du traitement de l\'objet'
              + recette.recette_gumi_id + ' (' + recette.recette_gumi_id + ') : ' + error);
            return of(error);
          })));
        observables.push(this.ffchClientService.getObjetByGumiId$(recette.resultat_gumi_id)
          .pipe(catchError(error => {
            this.recettesErrors.push('Erreur lors du traitement de l\'objet'
              + recette.resultat_gumi_id + ' (' + recette.resultat_gumi_id + ') : ' + error);
            return of(error);
          })));
      });
      this.subscription = forkJoin(observables).subscribe(results => {
        this.recettes.forEach((r, index) => {
          const indiceRecetteFromFfch = 3 * index;
          const indiceObjetRecette = indiceRecetteFromFfch + 1;
          const indiceObjetResultat = indiceRecetteFromFfch + 2;
          this.recettes[index].id = FfbeUtils.isNullOrUndefined(results[indiceRecetteFromFfch]) ? null : results[indiceRecetteFromFfch].id;
          this.recettes[index].recette = FfbeUtils.isNullOrUndefined(results[indiceObjetRecette]) ? null : Objet.produce(results[indiceObjetRecette]);
          this.recettes[index].resultat = FfbeUtils.isNullOrUndefined(results[indiceObjetResultat]) ? null : Objet.produce(results[indiceObjetResultat]);
          const dbRecette = FfbeUtils.isNullOrUndefined(results[indiceRecetteFromFfch]) ? null : Recette.produce(results[indiceRecetteFromFfch]);
          this.recettesContainers.push(new RecettesComparingContainer(this.recettes[index], dbRecette));
        });
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public isRecettesErrorsDisplayed(): boolean {
    return Array.isArray(this.recettesErrors) && this.recettes.length > 0;
  }
}
