import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {Amelioration} from '../model/amelioration.model';
import {FfchClientService} from '../services/ffch-client.service';
import {CharactersService} from '../services/characters.service';
import {forEach} from '@angular/router/src/utils/collection';
import {Character} from '../model/character.model';
import {CharacterMapper} from '../mappers/character-mapper';
import {Personnage} from '../model/personnage.model';
import {Competence} from '../model/competence.model';
import {SkillsService} from '../services/skills.service';
import {isNullOrUndefined} from 'util';
import {SkillMapper} from '../mappers/skill-mapper';

@Component({
  selector: 'app-enhancement-display',
  templateUrl: './enhancement-display.component.html',
  styleUrls: ['./enhancement-display.component.css']
})
export class EnhancementDisplayComponent implements OnInit, OnChanges {

  @Input() amelioration: Amelioration;
  public displayed = false;
  public personnages: Array<Personnage>;
  public competences: Array<Competence>;

  constructor(private charactersService: CharactersService,
              private  skillService: SkillsService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.getPersonnages();
    this.getCompetences();
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

  public isSingleCharacter() {
    return this.personnages.length === 1;
  }

  protected getPersonnages() {
    this.personnages = [];
    this.amelioration.units.forEach(unit =>
      this.personnages.push(CharacterMapper.toPersonnage(this.charactersService.searchForCharacterByGumiId(unit))));
    if (this.personnages.length === 1) {
      this.amelioration.perso_gumi_id = this.personnages[0].gumi_id;
    }
  }

  protected getCompetences() {
    this.competences = [];
    if (!isNullOrUndefined(this.amelioration.skill_id_base)) {
      this.competences.push(SkillMapper.toCompetence(this.skillService.searchForSkillByGumiId(this.amelioration.skill_id_base)));
    }
    if (!isNullOrUndefined(this.amelioration.skill_id_old) && (this.amelioration.skill_id_old !== this.amelioration.skill_id_base)) {
      this.competences.push(SkillMapper.toCompetence(this.skillService.searchForSkillByGumiId(this.amelioration.skill_id_old)));
    }
    if (!isNullOrUndefined(this.amelioration.skill_id_new)) {
      this.competences.push(SkillMapper.toCompetence(this.skillService.searchForSkillByGumiId(this.amelioration.skill_id_new)));
    }
  }

  public areSkillsDisplayed(): boolean {
    return Array.isArray(this.competences) && this.competences.length > 0;
  }
}
