import {Component, Input, OnInit} from '@angular/core';
import {UniteCompetence, UniteCompetenceStatus} from '../../model/unite-competence.model';
import {Competence} from '../../model/competence.model';
import {FfbeUtils} from '../../utils/ffbe-utils';
import {FfchClientService} from '../../services/ffch-client.service';
import {Unite} from '../../model/unite.model';


@Component({
  selector: 'app-unite-competences-array-display',
  templateUrl: './unite-competences-array-display.component.html',
  styleUrls: ['./unite-competences-array-display.component.css']
})
export class UniteCompetencesArrayDisplayComponent implements OnInit {

  @Input() uniteCompetences: Array<UniteCompetence>;
  @Input() titre: string;
  @Input() unite: Unite;
  @Input() allowPosting = true;
  @Input() showLevelMismatch = true;

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit(): void {
  }

  public hasLevelMismatch(uniteCompetence: UniteCompetence): boolean {
    return !FfbeUtils.isNullOrUndefined(UniteCompetence) &&
      (this.showLevelMismatch && uniteCompetence.status === UniteCompetenceStatus.LevelMismatch
        || uniteCompetence.status === UniteCompetenceStatus.LevelAndActivationMismatch);
  }

  public isNotFoundInCounterPart(uniteCompetence: UniteCompetence): boolean {
    return !FfbeUtils.isNullOrUndefined(UniteCompetence) && uniteCompetence.status === UniteCompetenceStatus.NotFoundInCounterPart;
  }

  public isMissingInFfchDb(uniteCompetence: UniteCompetence): boolean {
    return this.allowPosting && !FfbeUtils.isNullOrUndefined(UniteCompetence) && uniteCompetence.status === UniteCompetenceStatus.NotFoundInCounterPart;
  }

  public isCompetencePresentInFfchDb(competence: Competence): boolean {
    return !FfbeUtils.isNullOrUndefined(competence?.id);
  }

  public sendUniteCompetenceToFfch(uniteCompetence: UniteCompetence) {
    this.ffchClientService.postUniteCompetence$(uniteCompetence, this.unite?.id)
      .subscribe(uC => {
        if (uC.niveau === uniteCompetence.niveau) {
          uniteCompetence.id = uC.id;
          uniteCompetence.status = UniteCompetenceStatus.Correct;
        }
      });
  }

  public updateUniteCompetenceInFfch(uniteCompetence: UniteCompetence) {
    this.ffchClientService.putUniteCompetence$(uniteCompetence)
      .subscribe(uC => {
        if (uC.niveau === uniteCompetence.niveau) {
          uniteCompetence.status = UniteCompetenceStatus.Correct;
        }
      });
  }

}
