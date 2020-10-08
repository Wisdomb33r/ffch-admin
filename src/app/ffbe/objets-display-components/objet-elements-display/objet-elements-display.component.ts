import {Component, Input, OnInit} from '@angular/core';
import {ResistancesElementaires} from '../../model/resistances-elementaires.model';

@Component({
  selector: 'app-objet-elements-display',
  templateUrl: './objet-elements-display.component.html',
  styleUrls: ['./objet-elements-display.component.css']
})
export class ObjetElementsDisplayComponent implements OnInit {

  @Input() objetElements: ResistancesElementaires;
  @Input() titre: string;
  @Input() estModifiable: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
