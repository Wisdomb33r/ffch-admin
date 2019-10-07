import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() editable: boolean;
  public displayed = false;
  @Output() skillModifiedEvent: EventEmitter<Competence> = new EventEmitter();

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit() {
  }

  public sendToFfch() {
    SkillMapper.mapUndefinedEnhanced(this.competence);
    if (!this.present) {
      this.ffchClientService.postCompetence$(this.competence)
        .subscribe(c => this.competence.id = (isNullOrUndefined(c) ? null : c.id));
    } else {
      this.ffchClientService.putCompetence$(this.competence)
        .subscribe(c => {
          this.competence.id = (isNullOrUndefined(c) ? null : c.id);
          this.skillModifiedEvent.emit(c);
        });
    }
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

  public shouldDisplayEnhanced() {
    return !isNullOrUndefined(this.competence.enhanced);
  }

  public generateLinkToFfch(): string {
    return '<a href="ffexvius_skills.php?compid=' + (this.present ? this.competence.id.toString() : '') + '">'
      + this.competence.nom + '</a>';
  }

  public isSKillFromDamagingCategory(): boolean {
    return [2, 6, 7, 8, 9].find(idCateg => idCateg === this.competence.categorie) >= 0;
  }
}
