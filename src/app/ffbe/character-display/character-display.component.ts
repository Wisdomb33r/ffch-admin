import {Component, Input, OnChanges} from '@angular/core';
import {Personnage} from '../model/personnage.model';
import {Competence} from '../model/competence.model';

@Component({
  selector: 'app-character-display',
  templateUrl: './character-display.component.html',
  styleUrls: ['./character-display.component.css']
})
export class CharacterDisplayComponent implements OnChanges {

  @Input() personnage: Personnage;
  competences: Array<Competence>;
  competencesActivees: Array<Competence>;
  isCharacterDetailDisplayed = true;

  constructor() {
  }

  ngOnChanges() {
    this.competences = this.personnage.unites[this.personnage.unites.length - 1].competences
      .map(uniteCompetence => uniteCompetence.competence);
    this.competencesActivees = this.personnage.unites[this.personnage.unites.length - 1].competencesActivees
      .map(uniteCompetence => uniteCompetence.competence);
  }

  public switchCharacterDisplay() {
    this.isCharacterDetailDisplayed = !this.isCharacterDetailDisplayed;
  }
}
