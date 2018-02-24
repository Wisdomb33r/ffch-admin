import {CharactersService} from '../services/characters.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Personnage} from '../model/personnage.model';
import {LimitBurstsService} from '../services/limit-bursts.service';
import {SkillsService} from '../services/skills.service';
import {Character} from '../model/character.model';
import {CharacterMapper} from '../mappers/character-mapper';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  name: FormControl;
  personnage: Personnage;

  constructor(private charactersService: CharactersService,
              private limitBurstsService: LimitBurstsService,
              private skillsService: SkillsService) {
    this.name = new FormControl('', Validators.required);
  }

  ngOnInit() {
  }

  public searchCharacterInDataMining() {
    this.personnage = null;
    const character: Character = this.charactersService.searchForCharacterByName(this.name.value);
    if (character) {
      this.personnage = CharacterMapper.toPersonnage(character);
    }
  }

  public isCharacterDisplayed(): boolean {
    return this.personnage != null;
  }

  public isCharacterSkillsDisplayed(): boolean {
    return this.personnage != null
      && Array.isArray(this.personnage.unites)
      && this.personnage.unites.length > 0
      && Array.isArray(this.personnage.unites[this.personnage.unites.length - 1].competences);
  }

  public isDataMiningLoading(): boolean {
    return !this.charactersService.isLoaded()
      || !this.limitBurstsService.isLoaded()
      || !this.skillsService.isLoaded();
  }
}
