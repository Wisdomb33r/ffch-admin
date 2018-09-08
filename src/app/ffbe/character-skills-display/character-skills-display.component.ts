import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Competence} from '../model/competence.model';
import {FfchClientService} from '../services/ffch-client.service';
import {isNullOrUndefined} from 'util';
import {CompetencesComparingContainer} from '../model/competences-comparing-container.model';
import {SkillMapper} from '../mappers/skill-mapper';
import {Observable} from 'rxjs/Observable';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-character-skills-display',
  templateUrl: './character-skills-display.component.html',
  styleUrls: ['./character-skills-display.component.css']
})
export class CharacterSkillsDisplayComponent implements OnInit, OnChanges {

  @Input() competences: Array<Competence>;
  public skillsErrors: Array<string> = [];
  public competencesContainers: Array<CompetencesComparingContainer> = [];

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.skillsErrors = [];
    this.competencesContainers = [];
    if (Array.isArray(this.competences)) {
      const observables:Array< Observable<Competence> > = [] ;
      this.competences.forEach(competence => {
        //observables.push( this.ffchClientService.getCompetenceByGumiId$(competence.gumi_id).pipe(catchError(error => this.skillsErrors.push('Erreur lors du traitement de la compétence ' + competence.nom + ' : ' + error))) );
        observables.push( this.ffchClientService.getCompetenceByGumiId$(competence.gumi_id) );
      });
      forkJoin(observables).subscribe(results => {
      results.forEach( (c, index) => {
              this.competences[index].id = isNullOrUndefined(c) ? undefined : c.id;
              this.competencesContainers.push(new CompetencesComparingContainer(this.competences[index], c));
            },
            //error => this.skillsErrors.push('Erreur lors du traitement de la compétence ' + competence.nom + ' : ' + error)
          );
      });
    }
  }

  public isSkillsErrorsDisplayed(): boolean {
    return Array.isArray(this.skillsErrors) && this.skillsErrors.length > 0;
  }

}
