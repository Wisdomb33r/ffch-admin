import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Skill} from '../model/skill.model';
import {SkillMapper} from '../mappers/skill-mapper';
import {Competence} from '../model/competence.model';

@Component({
  templateUrl: './routed-skill.component.html',
  styleUrls: ['./routed-skill.component.css']
})
export class RoutedSkillComponent implements OnInit {

  public skill: Skill;
  public competence: Competence;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { skill: Skill }) => {
      this.skill = data.skill;
      this.competence = SkillMapper.toCompetence(this.skill);
    });
  }

}
