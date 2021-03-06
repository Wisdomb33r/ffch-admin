import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EnhancementsService} from '../services/enhancements.service';
import {EnhancementMapper} from '../mappers/enhancement-mapper.model';
import {Amelioration} from '../model/amelioration.model';
import {CharactersService} from '../services/characters.service';
import {Character} from '../model/character/character.model';
import {EquipmentsService} from '../services/equipments.service';
import {MateriasService} from '../services/materias.service';
import {FfbeUtils} from '../utils/ffbe-utils';
import {ConsumablesService} from '../services/consumables.service';
import {VisionCardsService} from '../services/vision-cards.service';

@Component({
  templateUrl: './enhancements.component.html',
  styleUrls: ['./enhancements.component.css']
})
export class EnhancementsComponent implements OnInit {

  searchForm: FormGroup;
  characterName: FormControl;
  englishName: FormControl;
  frenchName: FormControl;
  gumiId: FormControl;
  character: Character;
  ameliorations: Array<Amelioration>;
  localStorageLabel = 'enhancements-search-form';

  constructor(private enhancementsService: EnhancementsService,
              private charactersService: CharactersService,
              // do not remove the injection of services, it serves to load the INSTANCE singletons
              private consumableService: ConsumablesService,
              private equipmentsService: EquipmentsService,
              private materiasService: MateriasService,
              private visionsCardsService: VisionCardsService) {
    this.characterName = new FormControl('');
    this.englishName = new FormControl('');
    this.frenchName = new FormControl('');
    this.gumiId = new FormControl('');
    this.searchForm = new FormGroup({
      characterName: this.characterName,
      englishName: this.englishName,
      frenchName: this.frenchName,
      gumiId: this.gumiId
    });
  }

  ngOnInit() {
    const storedValue = localStorage.getItem(this.localStorageLabel);
    if (storedValue) {
      this.searchForm.patchValue(JSON.parse(storedValue));
    }
  }

  public searchEnhancementsInDataMining() {
    this.ameliorations = [];
    let enhancements = [];
    if (!FfbeUtils.isNullOrUndefined(this.gumiId.value) && this.gumiId.value > 0) {
      this.characterName.patchValue('');
      this.englishName.patchValue('');
      this.frenchName.patchValue('');
      enhancements = this.enhancementsService.searchForEnhancementsBySkillGumiId(this.gumiId.value);
    } else if (!FfbeUtils.isNullOrUndefined(this.characterName.value) && this.characterName.value.length > 0) {
      this.englishName.patchValue('');
      this.frenchName.patchValue('');
      this.gumiId.patchValue('');
      const characters = this.charactersService.searchForCharactersByNameOrGumiId(this.characterName.value);
      if (!FfbeUtils.isNullOrUndefined(characters) && Array.isArray(characters) && characters.length > 0) {
        this.character = characters[0];
        enhancements = this.enhancementsService.searchForEnhancementsByCharacterGumiId(this.character.gumi_id);
      }
    } else {
      enhancements = this.enhancementsService.searchForEnhancementsByNames(this.englishName.value, this.frenchName.value);
    }
    enhancements.forEach(enhancement => {
      const amelioration = EnhancementMapper.toAmelioration(enhancement);
      if (!FfbeUtils.isNullOrUndefined(this.character)) {
        amelioration.perso_gumi_id = this.character.gumi_id;
      }
      this.ameliorations.push(amelioration);
    });
    localStorage.setItem(this.localStorageLabel, JSON.stringify(this.searchForm.value));
  }

  public areEnhancementsDisplayed(): boolean {
    return Array.isArray(this.ameliorations) && this.ameliorations.length > 0;
  }

  public isDataMiningLoading(): boolean {
    return !this.enhancementsService.isLoaded();
  }
}
