import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SkillsService} from '../services/skills.service';
import {Competence} from '../model/competence.model';
import {Skill} from '../model/skill.model';
import {SkillMapper} from '../mappers/skill-mapper';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  englishName: FormControl;
  frenchName: FormControl;
  competences: Array<Competence>;

  constructor(private skillsService: SkillsService) {
    this.englishName = new FormControl('');
    this.frenchName = new FormControl('');
  }

  ngOnInit() {
  }

  public searchSkillsInDataMining() {
    this.competences = [];
    const skills: Array<Skill> = this.skillsService.searchForSkillsByNames(this.englishName.value, this.frenchName.value);
    skills.forEach(skill => this.competences.push(SkillMapper.toCompetence(skill)));
  }

  public isSkillsDisplayed(): boolean {
    return Array.isArray(this.competences) && this.competences.length > 0;
  }

  public isDataMiningLoading(): boolean {
    return !this.skillsService.isLoaded();
  }
}
