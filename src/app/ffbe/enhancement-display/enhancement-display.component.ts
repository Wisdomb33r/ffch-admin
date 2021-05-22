import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Amelioration} from '../model/amelioration.model';
import {FfchClientService} from '../services/ffch-client.service';
import {CharactersService} from '../services/characters.service';
import {Character} from '../model/character/character.model';
import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {Competence} from '../model/competence.model';
import {SkillsService} from '../services/skills.service';
import {SkillMapper} from '../mappers/skill-mapper';
import {FfbeUtils} from '../utils/ffbe-utils';
import {Formule} from '../model/formule.model';

@Component({
  selector: 'app-enhancement-display',
  templateUrl: './enhancement-display.component.html',
  styleUrls: ['./enhancement-display.component.css']
})
export class EnhancementDisplayComponent implements OnInit, OnChanges {

  @Input() amelioration: Amelioration;
  public displayed = false;
  public characters: Array<Character>;
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
    this.getCharacters();
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
    return !FfbeUtils.isNullOrUndefined(this.ameliorationFromFfch);
  }

  public isAmeliorationCorrectInFfchDb(): boolean {
    return FfbeUtils.isNullOrUndefined(this.ameliorationFromFfch) ||
      this.amelioration.formule.isEqual(this.ameliorationFromFfch.formule);
  }

  public isAmeliorationUpToDateInFfchDb(): boolean {
    return this.isAmeliorationCorrectInFfchDb() && !FfbeUtils.isNullOrUndefined(this.ameliorationFromFfch.skill_id_new);
  }

  public isSingleCharacter(): boolean {
    return this.characters.length === 1;
  }

  public isAnyCharacterSelected(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.amelioration.perso_gumi_id);
  }

  public getFormuleFromFfchAmelioration(): Formule {
    if (!FfbeUtils.isNullOrUndefined(this.ameliorationFromFfch)) {
      return this.ameliorationFromFfch.formule;
    } else {
      return undefined;
    }
  }

  protected getCharacters() {
    this.characters = this.amelioration.units.map(unit => this.charactersService.searchForShallowCharacterByGumiId(unit))
      .filter(character => !FfbeUtils.isNullOrUndefined(character));
    if (this.characters.length === 1) {
      this.amelioration.perso_gumi_id = this.characters[0].gumi_id;
    }
  }

  protected getAmelioration() {
    this.ameliorationFromFfch = null;
    this.ffchClientService.getAmelioration$(this.amelioration.perso_gumi_id, this.amelioration.skill_id_base, this.amelioration.niveau)
      .subscribe(amelioration => {
          this.ameliorationFromFfch = FfbeUtils.isNullOrUndefined(amelioration) ? null : (Amelioration.produce(amelioration));
          if (!FfbeUtils.isNullOrUndefined(this.ameliorationFromFfch) && !FfbeUtils.isNullOrUndefined(this.ameliorationFromFfch.formule)) {
            FfbeUtils.sortArrayIngredients(this.ameliorationFromFfch.formule.ingredients);
          }
        },
        error => this.ameliorationErrors.push('Erreur lors de la recherche de l\'amélioration de '
          + this.amelioration.nom + ' pour le perso ' + this.amelioration.perso_gumi_id + ' : ' + error));
  }

  protected getCompetences() {
    this.competences = [];
    if (!FfbeUtils.isNullOrUndefined(this.amelioration.skill_id_base)) {
      this.competences.push(SkillMapper.toCompetence(this.skillService.searchForSkillByGumiId(this.amelioration.skill_id_base)));
    }
    if (!FfbeUtils.isNullOrUndefined(this.amelioration.skill_id_old) && (this.amelioration.skill_id_old !== this.amelioration.skill_id_base)) {
      this.competences.push(SkillMapper.toCompetence(this.skillService.searchForSkillByGumiId(this.amelioration.skill_id_old)));
    }
    if (!FfbeUtils.isNullOrUndefined(this.amelioration.skill_id_new)) {
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
    return this.competences.every(competence => !FfbeUtils.isNullOrUndefined(competence.id));
  }

  public sendAmeliorationToFfch() {
    this.ffchClientService.postAmelioration$(this.amelioration)
      .subscribe(status => this.getAmelioration(), status => this.ameliorationErrors.push('Could not send amelioration'));
  }

  public getNomAmelioration(): string {
    let nom = null;
    if (!FfbeUtils.isNullOrUndefined(this.amelioration.nom)) {
      nom = this.amelioration.nom;
    } else if (Array.isArray(this.competences) && this.competences.length > 0 && !FfbeUtils.isNullOrUndefined(this.competences[0].nom)) {
      nom = this.competences[0].nom;
    }
    return nom;
  }

  public getNom(character: Character): string {
    if (!Array.isArray(character.names) || character.names.length <= FFBE_FRENCH_TABLE_INDEX ||
      FfbeUtils.isNullOrUndefined(character.names[FFBE_FRENCH_TABLE_INDEX]) || character.names[FFBE_FRENCH_TABLE_INDEX].length === 0) {
      return 'Personnage Inconnu';
    }

    return character.names[FFBE_FRENCH_TABLE_INDEX];
  }

  public getName(character: Character): string {
    if (FfbeUtils.isNullOrUndefined(character.name) || character.name.length === 0) {
      return 'Unknown Character';
    }

    return character.name;
  }
}
