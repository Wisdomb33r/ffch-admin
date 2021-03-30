import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SkillsService} from '../services/skills.service';
import {Competence} from '../model/competence.model';
import {Skill} from '../model/skill.model';
import {SkillMapper} from '../mappers/skill-mapper';
import {EquipmentsService} from '../services/equipments.service';
import {MateriasService} from '../services/materias.service';
import {FfbeUtils} from '../utils/ffbe-utils';
import {CharactersService} from '../services/characters.service';
import {ConsumablesService} from '../services/consumables.service';
import {StorableFormControl} from '../model/storable-form-control';

@Component({
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  englishName: StorableFormControl;
  frenchName: StorableFormControl;
  gumiId: StorableFormControl;
  competences: Array<Competence>;

  constructor(private skillsService: SkillsService,
              // do not remove the injection of Characters, Consumables, Equipments and Materias services, it serves to load the INSTANCE singletons
              private charactersService: CharactersService,
              private consumableService: ConsumablesService,
              private equipmentsService: EquipmentsService,
              private materiasService: MateriasService) {
    this.englishName = new StorableFormControl('skill-search-english-name');
    this.frenchName = new StorableFormControl('skill-search-french-name');
    this.gumiId = new StorableFormControl('skill-search-gumi-id', true);
  }

  ngOnInit() {
    this.englishName.fetch();
    this.frenchName.fetch();
    this.gumiId.fetch();
  }

  public searchSkillsInDataMining() {
    this.competences = [];
    if (!FfbeUtils.isNullOrUndefined(this.gumiId.value) && this.gumiId.value > 0) {
      this.englishName.formControl.patchValue('');
      this.frenchName.formControl.patchValue('');
      const skill = this.skillsService.searchForSkillByGumiId(this.gumiId.value);
      if (!FfbeUtils.isNullOrUndefined((skill))) {
        this.competences.push(SkillMapper.toCompetence(skill));
      }
    } else {
      const skills: Array<Skill> = this.skillsService.searchForSkillsByNames(this.englishName.value, this.frenchName.value);
      skills.forEach(skill => this.competences.push(SkillMapper.toCompetence(skill)));
    }
    this.englishName.store();
    this.frenchName.store();
    this.gumiId.store();
  }

  public isSkillsDisplayed(): boolean {
    return Array.isArray(this.competences) && this.competences.length > 0;
  }

  public isDataMiningLoading(): boolean {
    return !this.skillsService.isLoaded();
  }
}
