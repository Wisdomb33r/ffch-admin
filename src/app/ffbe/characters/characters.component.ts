import {CharactersService} from '../services/characters.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Personnage} from '../model/personnage.model';
import {LimitBurstsService} from '../services/limit-bursts.service';
import {SkillsService} from '../services/skills.service';
import {Character} from '../model/character/character.model';
import {CharacterMapper} from '../mappers/character-mapper';
import {EquipmentsService} from '../services/equipments.service';
import {MateriasService} from '../services/materias.service';
import {FfbeUtils} from '../utils/ffbe-utils';
import {ConsumablesService} from '../services/consumables.service';
import {VisionCardsService} from '../services/vision-cards.service';

@Component({
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  searchForm: FormGroup;
  name: FormControl;
  personnages: Array<Personnage>;
  localStorageLabel = 'characters-search-form';

  constructor(private charactersService: CharactersService,
              private limitBurstsService: LimitBurstsService,
              private skillsService: SkillsService,
              // do not remove the injection of services, it serves to load the INSTANCE singletons
              private consumablesService: ConsumablesService,
              private equipmentsService: EquipmentsService,
              private materiasService: MateriasService,
              private visionsCardsService: VisionCardsService) {
    this.name = new FormControl('', Validators.required);
    this.searchForm = new FormGroup({
      name: this.name
    })
  }

  ngOnInit() {
    const storedValue = localStorage.getItem(this.localStorageLabel);
    if (storedValue) {
      this.searchForm.patchValue(JSON.parse(storedValue));
    }
  }

  public searchCharactersInDataMining() {
    this.personnages = null;
    const characters: Array<Character> = this.charactersService.searchForCharactersByNameOrGumiId(this.name.value);
    if (characters) {
      this.personnages = characters.map(character => CharacterMapper.toPersonnage(character));
    }
    localStorage.setItem(this.localStorageLabel, JSON.stringify(this.searchForm.value));
  }

  public areCharactersDisplayed(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.personnages);
  }

  public isDataMiningLoading(): boolean {
    return !this.charactersService.isLoaded()
      || !this.limitBurstsService.isLoaded()
      || !this.skillsService.isLoaded();
  }
}
