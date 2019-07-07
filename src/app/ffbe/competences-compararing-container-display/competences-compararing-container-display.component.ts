import {Component, Input, OnInit} from '@angular/core';
import {CompetencesComparingContainer} from '../model/competences-comparing-container.model';
import {Competence} from '../model/competence.model';

@Component({
  selector: 'app-competences-compararing-container-display',
  templateUrl: './competences-compararing-container-display.component.html',
  styleUrls: ['./competences-compararing-container-display.component.css']
})
export class CompetencesCompararingContainerDisplayComponent implements OnInit {

  @Input() competencesContainer: CompetencesComparingContainer;
  public modificationPanelDisplayed = false;

  constructor() {
  }

  ngOnInit() {
  }

  public switchModificationPanelDisplayed() {
    this.modificationPanelDisplayed = !this.modificationPanelDisplayed;
  }

  public skillModified(c: Competence) {
    this.switchModificationPanelDisplayed();
    this.competencesContainer.dbCompetence = c;
  }
}
