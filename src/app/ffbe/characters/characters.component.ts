import {CharactersService} from '../services/characters.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Personnage} from '../model/personnage.model';
import {LimitBurstsService} from '../services/limit-bursts.service';
import {SkillsService} from '../services/skills.service';

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
    this.personnage = this.charactersService.searchForCharacterByName(this.name.value);
  }

  public isCharacterDisplayed(): boolean {
    return this.personnage != null;
  }

  public isDataMiningLoading(): boolean {
    return this.charactersService.charactersFromDataMining == null
      || this.limitBurstsService.limitBurstsFromDataMining == null
      || this.skillsService.skillsFromDataMining == null;
  }
}
