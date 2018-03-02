import {Component, Input, OnInit} from '@angular/core';
import {Unite} from '../model/unite.model';

@Component({
  selector: 'app-unit-display',
  templateUrl: './unit-display.component.html',
  styleUrls: ['./unit-display.component.css']
})
export class UnitDisplayComponent implements OnInit {

  @Input() unite: Unite;
  skillsColumnsToDisplay = ['level', 'id_nom', 'description'];

  constructor() {
  }

  ngOnInit() {
  }

}
