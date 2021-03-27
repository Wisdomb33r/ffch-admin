import {CharactersService} from '../services/characters.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Personnage} from '../model/personnage.model';
import {LimitBurstsService} from '../services/limit-bursts.service';
import {SkillsService} from '../services/skills.service';
import {Character} from '../model/character/character.model';
import {CharacterMapper} from '../mappers/character-mapper';
import {EquipmentsService} from '../services/equipments.service';
import {MateriasService} from '../services/materias.service';
import {FfbeUtils} from '../utils/ffbe-utils';
import {ConsumablesService} from '../services/consumables.service';

@Component({
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  name: FormControl;
  personnages: Array<Personnage>;
  private localStorageLabel = 'character-search-name';

  constructor(private charactersService: CharactersService,
              private limitBurstsService: LimitBurstsService,
              private skillsService: SkillsService,
              // do not remove the injection of Equipments, Consumables and Materias services, it serves to load the INSTANCE singletons
              private consumablesService: ConsumablesService,
              private equipmentsService: EquipmentsService,
              private materiasService: MateriasService) {
    this.name = new FormControl('', Validators.required);
  }

  ngOnInit() {
    this.name.patchValue(localStorage.getItem(this.localStorageLabel));
  }

  public searchCharactersInDataMining() {
    this.personnages = null;
    localStorage.setItem(this.localStorageLabel, this.name.value);
    const characters: Array<Character> = this.charactersService.searchForCharactersByNameOrGumiId(this.name.value);
    if (characters) {
      this.personnages = characters.map(character => CharacterMapper.toPersonnage(character));
    }
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
