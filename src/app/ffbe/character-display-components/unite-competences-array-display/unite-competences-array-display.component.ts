import {Component, Input, OnInit} from '@angular/core';
import {UniteCompetence, UniteCompetenceStatus} from '../../model/unite-competence.model';
import {FfbeUtils} from '../../utils/ffbe-utils';
import {FfchClientService} from '../../services/ffch-client.service';

@Component({
  selector: 'app-unite-competences-array-display',
  templateUrl: './unite-competences-array-display.component.html',
  styleUrls: ['./unite-competences-array-display.component.css']
})
export class UniteCompetencesArrayDisplayComponent implements OnInit {

  @Input() uniteCompetences: Array<UniteCompetence>;
  @Input() titre: string;
  @Input() showLevelMismatch = true;

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit(): void {
  }

  public hasLevelMismatch(uniteCompetence: UniteCompetence) {
    return this.showLevelMismatch && !FfbeUtils.isNullOrUndefined(UniteCompetence) && uniteCompetence.status === UniteCompetenceStatus.LevelMismatch;
  }

  public isNotFoundInCounterPart(uniteCompetence: UniteCompetence) {
    return !FfbeUtils.isNullOrUndefined(UniteCompetence) && uniteCompetence.status === UniteCompetenceStatus.NotFoundInCounterPart;
  }

  public updateUniteCompetenceInFfch(uniteCompetence: UniteCompetence) {
    this.ffchClientService.putUniteCompetence$(uniteCompetence)
      .subscribe(uC => {
        if (uC.niveau === uniteCompetence.niveau) {
          uniteCompetence = uC;
          uniteCompetence.status = UniteCompetenceStatus.Correct;
        }
      });
  }

}
