import {Component, Input, OnInit} from '@angular/core';
import {Competence} from '../model/competence.model';
import {FfchClientService} from '../services/ffch-client.service';

@Component({
  selector: 'app-character-skills-display',
  templateUrl: './character-skills-display.component.html',
  styleUrls: ['./character-skills-display.component.css']
})
export class CharacterSkillsDisplayComponent implements OnInit {

  @Input() competences: Array<Competence>;
  public skillsColumnsToDisplay = ['gumi_id', 'nom', 'description', 'ffch'];
  public skillsErrors: Array<string> = [];

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.refreshAfterChanges();
  }

  private refreshAfterChanges() {
    this.skillsErrors = [];
    if (Array.isArray(this.competences)) {
      this.competences.forEach(competence => {
        this.ffchClientService.getCompetenceByGumiId$(competence.gumi_id)
          .subscribe(c => competence.id = c.id,
            error => this.skillsErrors.push('Erreur lors du traitement de la compétence ' + competence.nom + " : " + error));
      });
    }
  }
}
