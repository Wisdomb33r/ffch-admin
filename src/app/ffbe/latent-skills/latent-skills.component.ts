import {Component, OnInit} from '@angular/core';
import {LatentSkillsService} from '../services/latent-skills.service';
import {FormControl} from '@angular/forms';
import {CharactersService} from '../services/characters.service';
import {Character} from '../model/character.model';
import {Amelioration} from '../model/amelioration.model';
import {isNullOrUndefined} from 'util';

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
    console.log(latentSkills);
  }
}
