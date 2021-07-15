import {Component, Input, OnInit} from '@angular/core';
import {Unite} from '../../model/unite.model';
import {FfbeUtils} from '../../utils/ffbe-utils';
import {UniteCompetenceArray} from '../../model/unite-competence-array.model';
import {UniteCompetence, UniteCompetenceStatus} from '../../model/unite-competence.model';

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
    if (this.unite.isPresentInFfchDb() && !FfbeUtils.isNullOrUndefined(this.dbUnite)) {
      this.dbUniteCompetences = new UniteCompetenceArray(...this.dbUnite.competences.filter(uniteCompetence => !UniteCompetence.isActivatedCompetence(uniteCompetence)));
      this.dbUniteCompetencesActivees = new UniteCompetenceArray(...this.dbUnite.competences.filter(uniteCompetence => UniteCompetence.isActivatedCompetence(uniteCompetence)));
      this.unite.competences.compare(this.dbUniteCompetences);
      this.unite.competencesActivees?.compare(this.dbUniteCompetencesActivees);
      this.dbUniteCompetencesOrphelines = new UniteCompetenceArray(
        ...this.dbUniteCompetences.filter(uniteCompetence => uniteCompetence.status === UniteCompetenceStatus.NotFoundInCounterPart),
        ...this.dbUniteCompetencesActivees.filter(uniteCompetence => uniteCompetence.status === UniteCompetenceStatus.NotFoundInCounterPart)
      );
    }
  }

}
