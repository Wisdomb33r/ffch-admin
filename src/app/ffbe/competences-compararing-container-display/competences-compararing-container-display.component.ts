import {Component, OnInit, Input} from '@angular/core';
import {CompetencesComparingContainer} from '../model/competences-comparing-container.model';

@Component({
  selector: 'app-competences-compararing-container-display',
  templateUrl: './competences-compararing-container-display.component.html',
  styleUrls: ['./competences-compararing-container-display.component.css']
})
export class CompetencesCompararingContainerDisplayComponent implements OnInit {

  @Input() competencesContainer: CompetencesComparingContainer;

  constructor() {
  }

  ngOnInit() {
  }

}
