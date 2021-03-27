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
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  name: FormControl;
  characters: Array<Character>;
  personnages: Array<Personnage>;

  constructor(private route: ActivatedRoute,
              private charactersService: CharactersService,
              private limitBurstsService: LimitBurstsService,
              private skillsService: SkillsService,
              // do not remove the injection of Equipments, Consumables and Materias services, it serves to load the INSTANCE singletons
              private consumablesService: ConsumablesService,
              private equipmentsService: EquipmentsService,
              private materiasService: MateriasService) {
    this.name = new FormControl('', Validators.required);
  }

  ngOnInit() {
    this.route.data.subscribe((data: { characters: Array<Character> }) => this.characters = data.characters);
  }

  public searchCharactersInDataMining() {
    this.personnages = null;
    //const characters: Array<Character> = this.charactersService.searchForCharactersByNameOrGumiId(this.name.value);
    if (this.characters) {
      this.personnages = this.characters.map(character => CharacterMapper.toPersonnage(character));
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
