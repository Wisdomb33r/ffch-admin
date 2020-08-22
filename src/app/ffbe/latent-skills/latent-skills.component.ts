import {Component, OnInit} from '@angular/core';
import {LatentSkillsService} from '../services/latent-skills.service';
import {FormControl} from '@angular/forms';
import {CharactersService} from '../services/characters.service';
import {Character} from '../model/character.model';
import {Amelioration} from '../model/amelioration.model';
import {LatentSkillMapper} from '../mappers/latent-skill-mapper';
import {EquipmentsService} from '../services/equipments.service';
import {MateriasService} from '../services/materias.service';
import {FfbeUtils} from '../utils/ffbe-utils';
import {ConsumablesService} from '../services/consumables.service';

@Component({
  selector: 'app-latent-skills',
  templateUrl: './latent-skills.component.html',
  styleUrls: ['./latent-skills.component.css']
})
export class LatentSkillsComponent implements OnInit {

  characterName: FormControl;
  character: Character;
  ameliorations: Array<Amelioration>;

  constructor(private latentSkillsService: LatentSkillsService,
              private charactersService: CharactersService,
              // do not remove the injection of Consumables, Equipments and Materias services, it serves to load the INSTANCE singletons
              private consumableService: ConsumablesService,
              private equipmentsService: EquipmentsService,
              private materiasService: MateriasService) {
    this.characterName = new FormControl('');
  }

  ngOnInit() {
  }

  public isDataMiningLoading(): boolean {
    return !this.latentSkillsService.isLoaded();
  }

  public searchForLatentSkillsInDataMining() {
    this.ameliorations = [];
    let latentSkills = [];
    if (!FfbeUtils.isNullOrUndefined(this.characterName.value) && this.characterName.value.length > 0) {
      const characters = this.charactersService.searchForCharactersByNameOrGumiId(this.characterName.value);
      if (!FfbeUtils.isNullOrUndefined(characters) && Array.isArray(characters) && characters.length > 0) {
        this.character = characters[0];
        latentSkills = this.latentSkillsService.searchForLatentSkillsByCharacterGumiId(this.character.gumi_id);
      }
    }
    latentSkills.filter(latentSkill => latentSkill.level === 1 || latentSkill.level === 2)
      .forEach(enhancement => {
        const amelioration = LatentSkillMapper.toAmelioration(enhancement);
        if (!FfbeUtils.isNullOrUndefined(this.character)) {
          amelioration.perso_gumi_id = this.character.gumi_id;
        }
        this.ameliorations.push(amelioration);
      });
  }

  public areLatentSkillsDisplayed(): boolean {
    return Array.isArray(this.ameliorations) && this.ameliorations.length > 0;
  }
}
