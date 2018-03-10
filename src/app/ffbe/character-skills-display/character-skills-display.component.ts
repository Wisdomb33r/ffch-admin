import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Competence} from '../model/competence.model';
import {FfchClientService} from '../services/ffch-client.service';
import {isNullOrUndefined} from 'util';
import {CompetencesComparingContainer} from '../model/competences-comparing-container.model';

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
      this.competences.forEach(competence => {
        this.ffchClientService.getCompetenceByGumiId$(competence.gumi_id)
          .subscribe(c => {
              competence.id = isNullOrUndefined(c) ? undefined : c.id;
              this.competencesContainers.push(new CompetencesComparingContainer(competence, c));
            },
            error => this.skillsErrors.push('Erreur lors du traitement de la compétence ' + competence.nom + ' : ' + error)
          );
      });
    }
  }

  public isSkillsErrorsDisplayed(): boolean {
    return Array.isArray(this.skillsErrors) && this.skillsErrors.length > 0;
  }

}
