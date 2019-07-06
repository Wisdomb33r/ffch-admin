import {Component, OnInit, Input} from '@angular/core';
import {Competence} from '../model/competence.model';

@Component({
  selector: 'app-character-skill-modification-display',
  templateUrl: './character-skill-modification-display.component.html',
  styleUrls: ['./character-skill-modification-display.component.css']
})
export class CharacterSkillModificationDisplayComponent implements OnInit {

  @Input() competence: Competence;
  public modificationPanelDisplayed = false;

  constructor() {
  }

  ngOnInit() {
  }


  public switchModificationPanelDisplayed() {
    this.modificationPanelDisplayed = !this.modificationPanelDisplayed;
  }
}
