import {Component, Input, OnInit} from '@angular/core';
import {Unite} from '../../model/unite.model';
import {UniteCompetence} from '../../model/unite-competence.model';

@Component({
  selector: 'app-unite-competences-array-display',
  templateUrl: './unite-competences-array-display.component.html',
  styleUrls: ['./unite-competences-array-display.component.css']
})
export class UniteCompetencesArrayDisplayComponent implements OnInit {

  @Input() uniteCompetences: Array<UniteCompetence>;
  @Input() titre: string;

  constructor() { }

  ngOnInit(): void {
  }

}
