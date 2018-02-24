import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Competence} from '../model/competence.model';
import {FfchClientService} from '../services/ffch-client.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-character-skills-display',
  templateUrl: './character-skills-display.component.html',
  styleUrls: ['./character-skills-display.component.css']
})
export class CharacterSkillsDisplayComponent implements OnInit, OnChanges {

  @Input() competences: Array<Competence>;
  public skillsErrors: Array<string> = [];

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.skillsErrors = [];
    if (Array.isArray(this.competences)) {
      this.competences.forEach(competence => {
        this.ffchClientService.getCompetenceByGumiId$(competence.gumi_id)
          .subscribe(c => competence.id = (isNullOrUndefined(c) ? null : c.id),
            error => this.skillsErrors.push('Erreur lors du traitement de la compétence ' + competence.nom + ' : ' + error));
      });
    }
  }

  public isSkillsErrorsDisplayed(): boolean {
    return Array.isArray(this.skillsErrors) && this.skillsErrors.length > 0;
  }

  public sendCompetenceToFfch(competence: Competence) {
    this.ffchClientService.postCompetence(competence).subscribe();
  }
}
