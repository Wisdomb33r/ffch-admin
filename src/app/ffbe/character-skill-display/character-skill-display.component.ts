import {Component, Input, OnInit} from '@angular/core';
import {Competence} from '../model/competence.model';
import {SkillMapper} from '../mappers/skill-mapper';
import {isNullOrUndefined} from 'util';
import {FfchClientService} from '../services/ffch-client.service';

@Component({
  selector: 'app-character-skill-display',
  templateUrl: './character-skill-display.component.html',
  styleUrls: ['./character-skill-display.component.css']
})
export class CharacterSkillDisplayComponent implements OnInit {

  @Input() competence: Competence;
  @Input() present: boolean;
  @Input() different: boolean;
  @Input() inError: boolean;
  @Input() editable: boolean;
  public displayed = false;

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit() {
  }

  public sendToFfch() {
    SkillMapper.mapCategorieToDamageType(this.competence);
    SkillMapper.mapUndefinedEnhanced(this.competence);
    if (!this.present) {
      this.ffchClientService.postCompetence$(this.competence)
        .subscribe(c => this.competence.id = (isNullOrUndefined(c) ? null : c.id));
    } else {
      this.ffchClientService.putCompetence$(this.competence)
        .subscribe(c => this.competence.id = (isNullOrUndefined(c) ? null : c.id));
    }
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

  public shouldDisplayEnhanced() {
    return !isNullOrUndefined(this.competence.enhanced);
  }

  public generateLinkToFfch(): String {
    return '<a href="ffexvius_skills.php?compid=' + (this.present ? this.competence.id.toString() : '') + '">'
      + this.competence.nom + '</a>';
  }
}
