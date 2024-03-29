import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {Competence} from '../model/competence.model';
import {FfchClientService} from '../services/ffch-client.service';
import {CompetencesComparingContainer} from '../model/competences-comparing-container.model';
import {forkJoin, Observable, of, Subscription} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {FfbeUtils} from '../utils/ffbe-utils';
import {classToClass} from 'class-transformer';

@Component({
  selector: 'app-skills-display',
  templateUrl: './skills-display.component.html',
  styleUrls: ['./skills-display.component.css']
})
export class SkillsDisplayComponent implements OnDestroy, OnChanges {

  @Input() competences: Array<Competence>;
  @Input() shouldStayOpen = true;
  @Input() shouldDisplayTitle = true;
  public skillsErrors: Array<string> = [];
  public competencesContainers: Array<CompetencesComparingContainer> = [];
  public subscription: Subscription;
  public displayed = false;

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnChanges() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.skillsErrors = [];
    this.competencesContainers = [];
    if (Array.isArray(this.competences)) {
      const observables: Array<Observable<Competence>> = [];
      this.competences.forEach(competence => {
        observables.push(this.ffchClientService.getCompetenceByGumiId$(competence.gumi_id)
          .pipe(catchError(error => {
            this.skillsErrors.push('Erreur lors du traitement de la compétence '
              + competence.nom + ' (' + competence.gumi_id + ') : ' + error);
            return of(error);
          })));
      });
      this.subscription = forkJoin(observables).subscribe(results => {
        results.forEach((c, index) => {
            this.competences[index].id = FfbeUtils.isNullOrUndefined(c) ? undefined : c.id;
            this.competencesContainers.push(
              new CompetencesComparingContainer(
                this.competences[index],
                FfbeUtils.isNullOrUndefined(c) ? undefined : c,
                classToClass(this.competences[index]))
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

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

  public isSkillsErrorsDisplayed(): boolean {
    return Array.isArray(this.skillsErrors) && this.skillsErrors.length > 0;
  }

}
