import {Component, Input, OnInit} from '@angular/core';
import {Unite} from '../../model/unite.model';

@Component({
  selector: 'app-unite-competences-display',
  templateUrl: './unite-competences-display.component.html',
  styleUrls: ['./unite-competences-display.component.css']
})
export class UniteCompetencesDisplayComponent implements OnInit {

  @Input() unite: Unite;

  constructor() { }

  ngOnInit(): void {
  }

}
