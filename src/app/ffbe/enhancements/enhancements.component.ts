import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {EnhancementsService} from '../services/enhancements.service';
import {Enhancement} from '../model/enhancement.model';
import {EnhancementMapper} from '../mappers/enhancement-mapper.model';
import {Amelioration} from '../model/amelioration.model';
import {CharactersService} from '../services/characters.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-enhancements',
  templateUrl: './enhancements.component.html',
  styleUrls: ['./enhancements.component.css']
})
export class EnhancementsComponent implements OnInit {

  characterName: FormControl;
  englishName: FormControl;
  frenchName: FormControl;
  gumiId: FormControl;
  ameliorations: Array<Amelioration>;

  constructor(private enhancementsService: EnhancementsService, private charactersService: CharactersService) {
    this.characterName = new FormControl('');
    this.englishName = new FormControl('');
    this.frenchName = new FormControl('');
    this.gumiId = new FormControl('');
  }

  ngOnInit() {
  }

  public searchEnhancementsInDataMining() {
    this.ameliorations = [];
    let enhancements = [];
    if (!isNullOrUndefined(this.gumiId.value) && this.gumiId.value > 0) {
      this.characterName.patchValue('');
      this.englishName.patchValue('');
      this.frenchName.patchValue('');
      enhancements = this.enhancementsService.searchForEnhancementsBySkillGumiId(this.gumiId.value);
    } else if (!isNullOrUndefined(this.characterName.value) && this.characterName.value.length > 0) {
      this.englishName.patchValue('');
      this.frenchName.patchValue('');
      this.gumiId.patchValue('');
      const character = this.charactersService.searchForCharacterByName(this.characterName.value);
      if (!isNullOrUndefined(character)) {
        enhancements = this.enhancementsService.searchForEnhancementsByCharacterGumiId(character.gumi_id);
      }
    } else {
      enhancements = this.enhancementsService.searchForEnhancementsByNames(this.englishName.value, this.frenchName.value);
    }
    enhancements.forEach(enhancement => this.ameliorations.push(EnhancementMapper.toAmelioration(enhancement)));
  }

  public areEnhancementsDisplayed(): boolean {
    return Array.isArray(this.ameliorations) && this.ameliorations.length > 0;
  }

  public isDataMiningLoading(): boolean {
    return !this.enhancementsService.isLoaded();
  }
}
