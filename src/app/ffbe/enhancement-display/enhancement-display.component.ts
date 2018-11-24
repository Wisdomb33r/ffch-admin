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
import {FfbeUtils} from '../utils/ffbe-utils';
import {Formule} from '../model/formule.model';
import {EnhancementMapper} from '../mappers/enhancement-mapper.model';

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
  public ameliorationFromFfch: Amelioration;
  public ameliorationErrors = [];

  constructor(private charactersService: CharactersService,
              private skillService: SkillsService,
              private ffchClientService: FfchClientService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.getPersonnages();
    this.getCompetences();
    this.getAmelioration();
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

  public isSingleAmeliorationSelected(): boolean {
    return this.isSingleCharacter() || this.isAnyCharacterSelected();
  }

  public isAmeliorationPresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.ameliorationFromFfch);
  }

  public isAmeliorationCorrectInFfchDb(): boolean {
    return isNullOrUndefined(this.ameliorationFromFfch) ||
      this.amelioration.formule.isEqual(this.ameliorationFromFfch.formule);
  }

  public isAmeliorationUpToDateInFfchDb(): boolean {
    return this.isAmeliorationCorrectInFfchDb() && !isNullOrUndefined(this.ameliorationFromFfch.skill_id_new);
  }

  public isSingleCharacter(): boolean {
    return this.personnages.length === 1;
  }

  public isAnyCharacterSelected(): boolean {
    return !isNullOrUndefined(this.amelioration.perso_gumi_id);
  }

  public getFormuleFromFfchAmelioration(): Formule {
    if (!isNullOrUndefined(this.ameliorationFromFfch)) {
      return this.ameliorationFromFfch.formule;
    } else {
      return undefined;
    }
  }

  protected getPersonnages() {
    this.personnages = [];
    this.amelioration.units.forEach(unit =>
      this.personnages.push(CharacterMapper.toPersonnage(this.charactersService.searchForCharacterByGumiId(unit))));
    if (this.personnages.length === 1) {
      this.amelioration.perso_gumi_id = this.personnages[0].gumi_id;
    }
  }

  protected getAmelioration() {
    this.ameliorationFromFfch = null;
    this.ffchClientService.getAmelioration$(this.amelioration.perso_gumi_id, this.amelioration.skill_id_base, this.amelioration.niveau)
      .subscribe(amelioration => {
          this.ameliorationFromFfch = isNullOrUndefined(amelioration) ? null : (Amelioration.produce(amelioration));
          this.amelioration.released = isNullOrUndefined(this.ameliorationFromFfch) ? false : this.ameliorationFromFfch.released;
          if (!isNullOrUndefined(this.ameliorationFromFfch) && !isNullOrUndefined(this.ameliorationFromFfch.formule)) {
            FfbeUtils.sortArrayIngredients(this.ameliorationFromFfch.formule.ingredients);
          }
        },
        error => this.ameliorationErrors.push('Erreur lors de la recherche de l\'amélioration de '
          + this.amelioration.nom + ' pour le perso ' + this.amelioration.perso_gumi_id + ' : ' + error));
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

  public areAmeliorationErrorsDiplayed(): boolean {
    return Array.isArray(this.ameliorationErrors) && this.ameliorationErrors.length > 0;
  }

  public areAllCompetencesPresentInFfchDb(): boolean {
    return this.competences.every(competence => !isNullOrUndefined(competence.id));
  }

  public sendAmeliorationToFfch() {
    EnhancementMapper.mapUndefinedReleased(this.amelioration);
    this.ffchClientService.postAmelioration$(this.amelioration)
      .subscribe(status => this.getAmelioration(), status => this.ameliorationErrors.push('Could not send amelioration'));
  }
}