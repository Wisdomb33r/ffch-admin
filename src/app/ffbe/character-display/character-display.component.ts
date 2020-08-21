import {Component, Input, OnInit} from '@angular/core';
import {Personnage} from '../model/personnage.model';
import {Competence} from '../model/competence.model';

@Component({
  selector: 'app-character-display',
  templateUrl: './character-display.component.html',
  styleUrls: ['./character-display.component.css']
})
export class CharacterDisplayComponent implements OnInit {

  @Input() personnage: Personnage;
  competences: Array<Competence>;

  constructor() {
  }

  ngOnInit() {
    this.competences = [];
    this.personnage.unites[this.personnage.unites.length - 1].competences
      .forEach(uniteCompetence => this.competences.push(uniteCompetence.competence));
  }

  public areCharacterSkillsDisplayed(): boolean {
    return Array.isArray(this.competences) && this.competences.length > 0;
  }

}
