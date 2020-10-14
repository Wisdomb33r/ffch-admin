import {Component, Input, OnInit} from '@angular/core';
import {Amelioration} from '../model/amelioration.model';

@Component({
  selector: 'app-enhancements-display',
  templateUrl: './enhancements-display.component.html',
  styleUrls: ['./enhancements-display.component.css']
})
export class EnhancementsDisplayComponent implements OnInit {

  @Input() ameliorations: Array<Amelioration>;
  @Input() titre: string;

  constructor() {
  }

  ngOnInit() {
  }

}
