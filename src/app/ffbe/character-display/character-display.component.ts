import {Component, Input, OnChanges, OnInit} from '@angular/core';
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
  isCharacterDetailDisplayed = true;

  constructor() {
  }

  ngOnChanges() {
    this.competences = this.personnage.unites[this.personnage.unites.length - 1].competences
      .map(uniteCompetence => uniteCompetence.competence);
  }

  public areCharacterSkillsDisplayed(): boolean {
    return Array.isArray(this.competences) && this.competences.length > 0;
  }

  public switchCharacterDisplay() {
    this.isCharacterDetailDisplayed = !this.isCharacterDetailDisplayed;
  }
}
