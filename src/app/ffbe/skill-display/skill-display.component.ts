import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Competence} from '../model/competence.model';
import {SkillMapper} from '../mappers/skill-mapper';
import {FfchClientService} from '../services/ffch-client.service';
import {FfbeUtils} from '../utils/ffbe-utils';
import {Element} from '../model/element.model';
import {FFBE_ELEMENTS} from '../ffbe.constants';

@Component({
  selector: 'app-skill-display',
  templateUrl: './skill-display.component.html',
  styleUrls: ['./skill-display.component.css']
})
export class SkillDisplayComponent implements OnInit, OnChanges {

  @Input() competence: Competence;
  @Input() present: boolean;
  @Input() different: boolean;
  @Input() editable: boolean;
  public displayed = false;
  @Output() skillModifiedEvent: EventEmitter<Competence> = new EventEmitter();
  public elements: Array<Element> = [];
  public multiLineDisplay = false;

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.elements = [];
    if (!FfbeUtils.isNullOrUndefined(this.competence.elements)) {
      const elementArray = this.competence.elements.split(',');
      this.elements = elementArray.map(elementId => FFBE_ELEMENTS[elementId]);
    }
  }

  public sendToFfch() {
    SkillMapper.mapUndefinedEnhanced(this.competence);
    if (!this.present) {
      this.ffchClientService.postCompetence$(this.competence)
        .subscribe(c => this.competence.id = (FfbeUtils.isNullOrUndefined(c) ? null : c.id));
    } else {
      this.ffchClientService.putCompetence$(this.competence)
        .subscribe(c => {
          this.competence.id = (FfbeUtils.isNullOrUndefined(c) ? null : c.id);
          this.skillModifiedEvent.emit(c);
        });
    }
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

  public shouldDisplayEnhanced() {
    return !FfbeUtils.isNullOrUndefined(this.competence.enhanced);
  }

  public generateLinkToFfch(): string {
    return `<a href="ffexvius_skills.php?gumiid=${this.competence.gumi_id}">${this.competence.nom}</a>`;
  }

  public isSKillFromDamagingCategory(): boolean {
    return [2, 6, 7, 8, 9].find(idCateg => idCateg === this.competence.categorie) >= 0;
  }

  public shouldDisplayElements(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.elements) && this.elements.length > 0;
  }
}
