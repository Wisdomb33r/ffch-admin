import {Component, Input, OnInit} from '@angular/core';
import {UniteCompetence, UniteCompetenceStatus} from '../../model/unite-competence.model';
import {FfbeUtils} from '../../utils/ffbe-utils';

@Component({
  selector: 'app-unite-competences-array-display',
  templateUrl: './unite-competences-array-display.component.html',
  styleUrls: ['./unite-competences-array-display.component.css']
})
export class UniteCompetencesArrayDisplayComponent implements OnInit {

  @Input() uniteCompetences: Array<UniteCompetence>;
  @Input() titre: string;
  @Input() showLevelMismatch = true;

  constructor() { }

  ngOnInit(): void {
  }

  public hasLevelMismatch(uniteCompetence: UniteCompetence) {
    return this.showLevelMismatch && !FfbeUtils.isNullOrUndefined(UniteCompetence) && uniteCompetence.status === UniteCompetenceStatus.LevelMismatch;
  }

  public isNotFoundInCounterPart(uniteCompetence: UniteCompetence) {
    return !FfbeUtils.isNullOrUndefined(UniteCompetence) && uniteCompetence.status === UniteCompetenceStatus.NotFoundInCounterPart;
  }

}
