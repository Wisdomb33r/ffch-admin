import {Component, Input, OnInit} from '@angular/core';
import {Competence} from '../model/competence.model';

@Component({
  selector: 'app-character-skills-display',
  templateUrl: './character-skills-display.component.html',
  styleUrls: ['./character-skills-display.component.css']
})
export class CharacterSkillsDisplayComponent implements OnInit {

  @Input() competences: Array<Competence>;
  skillsColumnsToDisplay = ['gumi_id', 'nom', 'description'];

  constructor() {
  }

  ngOnInit() {
  }

}
