import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {Competence} from '../model/competence.model';
import {FfchClientService} from '../services/ffch-client.service';
import {isNullOrUndefined} from 'util';
import {CompetencesComparingContainer} from '../model/competences-comparing-container.model';
import {forkJoin, Observable, of, Subscription} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-character-skills-display',
  templateUrl: './character-skills-display.component.html',
  styleUrls: ['./character-skills-display.component.css']
})
export class CharacterSkillsDisplayComponent implements OnDestroy, OnChanges {

  @Input() competences: Array<Competence>;
  public skillsErrors: Array<string> = [];
  public competencesContainers: Array<CompetencesComparingContainer> = [];
  public subscription: Subscription;

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
            this.competences[index].id = isNullOrUndefined(c) ? undefined : c.id;
            this.competencesContainers.push(new CompetencesComparingContainer(this.competences[index], c));
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

  public isSkillsErrorsDisplayed(): boolean {
    return Array.isArray(this.skillsErrors) && this.skillsErrors.length > 0;
  }

}
