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

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  englishName: FormControl;
  frenchName: FormControl;
  gumiId: FormControl;
  competences: Array<Competence>;

  constructor(private skillsService: SkillsService,
              // do not remove the injection of Characters, Equipments and Materias services, it serves to load the INSTANCE singletons
              private charactersService: CharactersService,
              private equipmentsService: EquipmentsService,
              private materiasService: MateriasService) {
    this.englishName = new FormControl('');
    this.frenchName = new FormControl('');
    this.gumiId = new FormControl('');
  }

  ngOnInit() {
  }

  public searchSkillsInDataMining() {
    this.competences = [];
    if (!FfbeUtils.isNullOrUndefined(this.gumiId.value) && this.gumiId.value > 0) {
      this.englishName.patchValue('');
      this.frenchName.patchValue('');
      const skill = this.skillsService.searchForSkillByGumiId(this.gumiId.value);
      if (!FfbeUtils.isNullOrUndefined((skill))) {
        this.competences.push(SkillMapper.toCompetence(skill));
      }
    } else {
      const skills: Array<Skill> = this.skillsService.searchForSkillsByNames(this.englishName.value, this.frenchName.value);
      skills.forEach(skill => this.competences.push(SkillMapper.toCompetence(skill)));
    }
  }

  public isSkillsDisplayed(): boolean {
    return Array.isArray(this.competences) && this.competences.length > 0;
  }

  public isDataMiningLoading(): boolean {
    return !this.skillsService.isLoaded();
  }
}
