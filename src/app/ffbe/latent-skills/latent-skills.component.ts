import {Component, OnInit} from '@angular/core';
import {LatentSkillsService} from '../services/latent-skills.service';
import {FormControl} from '@angular/forms';
import {CharactersService} from '../services/characters.service';
import {Character} from '../model/character.model';
import {Amelioration} from '../model/amelioration.model';
import {isNullOrUndefined} from 'util';
import {LatentSkillMapper} from '../mappers/latent-skill-mapper';

@Component({
  selector: 'app-latent-skills',
  templateUrl: './latent-skills.component.html',
  styleUrls: ['./latent-skills.component.css']
})
export class LatentSkillsComponent implements OnInit {

  characterName: FormControl;
  character: Character;
  ameliorations: Array<Amelioration>;

  constructor(private latentSkillsService: LatentSkillsService, private charactersService: CharactersService) {
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
    if (!isNullOrUndefined(this.characterName.value) && this.characterName.value.length > 0) {
      this.character = this.charactersService.searchForCharacterByNameOrGumiId(this.characterName.value);
      if (!isNullOrUndefined(this.character)) {
        latentSkills = this.latentSkillsService.searchForLatentSkillsByCharacterGumiId(this.character.gumi_id);
      }
    }
    latentSkills.filter(latentSkill => latentSkill.level === 1 || latentSkill.level === 2)
      .forEach(enhancement => {
        const amelioration = LatentSkillMapper.toAmelioration(enhancement);
        if (!isNullOrUndefined(this.character)) {
          amelioration.perso_gumi_id = this.character.gumi_id;
        }
        this.ameliorations.push(amelioration);
      });
  }

  public areLatentSkillsDisplayed(): boolean {
    return Array.isArray(this.ameliorations) && this.ameliorations.length > 0;
  }
}
