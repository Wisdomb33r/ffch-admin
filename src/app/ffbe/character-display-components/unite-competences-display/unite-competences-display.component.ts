import {Component, Input, OnInit} from '@angular/core';
import {Unite} from '../../model/unite.model';
import {FfbeUtils} from '../../utils/ffbe-utils';
import {UniteCompetenceArray} from '../../model/unite-competence-array.model';
import {UniteCompetenceStatus} from '../../model/unite-competence.model';

@Component({
  selector: 'app-unite-competences-display',
  templateUrl: './unite-competences-display.component.html',
  styleUrls: ['./unite-competences-display.component.css']
})
export class UniteCompetencesDisplayComponent implements OnInit {

  @Input() unite: Unite;
  @Input() dbUnite: Unite;
  public dbUniteCompetences: UniteCompetenceArray;
  public dbUniteCompetencesActivees: UniteCompetenceArray;
  public dbUniteCompetencesOrphelines: UniteCompetenceArray;


  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.updateUniteCompetencesStatuses();
  }

  public updateUniteCompetencesStatuses() {
    if (this.unite.isPresentInFfchDb() && !FfbeUtils.isNullOrUndefined(this.dbUnite)) {
      this.unite.competences.compare(this.dbUnite.competences);
      this.dbUniteCompetences = new UniteCompetenceArray(...this.dbUnite.competences.filter(uC => uC.status !== UniteCompetenceStatus.NotFoundInCounterPart));
      const dbUniteCompetencesRestantes = new UniteCompetenceArray(...this.dbUnite.competences.filter(uC => uC.status === UniteCompetenceStatus.NotFoundInCounterPart));
      this.unite.competencesActivees?.compare(dbUniteCompetencesRestantes);
      this.dbUniteCompetencesActivees = new UniteCompetenceArray(...dbUniteCompetencesRestantes.filter(uC => uC.status !== UniteCompetenceStatus.NotFoundInCounterPart));
      this.dbUniteCompetencesOrphelines = new UniteCompetenceArray(...dbUniteCompetencesRestantes.filter(uC => uC.status === UniteCompetenceStatus.NotFoundInCounterPart));
    }
  }

}
