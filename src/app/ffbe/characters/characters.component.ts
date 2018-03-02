import {CharactersService} from '../services/characters.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Personnage} from '../model/personnage.model';
import {LimitBurstsService} from '../services/limit-bursts.service';
import {SkillsService} from '../services/skills.service';
import {Character} from '../model/character.model';
import {CharacterMapper} from '../mappers/character-mapper';
import {isNullOrUndefined} from 'util';
import {Competence} from '../model/competence.model';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  name: FormControl;
  personnage: Personnage;
  competences: Array<Competence>;

  constructor(private charactersService: CharactersService,
              private limitBurstsService: LimitBurstsService,
              private skillsService: SkillsService) {
    this.name = new FormControl('', Validators.required);
  }

  ngOnInit() {
  }

  public searchCharacterInDataMining() {
    this.personnage = null;
    this.competences = [];
    const character: Character = this.charactersService.searchForCharacterByName(this.name.value);
    if (character) {
      this.personnage = CharacterMapper.toPersonnage(character);
      this.personnage.unites[this.personnage.unites.length - 1].competences
        .forEach(uniteCompetence => this.competences.push(uniteCompetence.competence));
    }
  }

  public isCharacterDisplayed(): boolean {
    return !isNullOrUndefined(this.personnage);
  }

  public isCharacterSkillsDisplayed(): boolean {
    return Array.isArray(this.competences) && this.competences.length > 0;
  }

  public isDataMiningLoading(): boolean {
    return !this.charactersService.isLoaded()
      || !this.limitBurstsService.isLoaded()
      || !this.skillsService.isLoaded();
  }
}
