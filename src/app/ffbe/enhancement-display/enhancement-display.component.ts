import {Component, Input, OnInit} from '@angular/core';
import {Amelioration} from '../model/amelioration.model';

@Component({
  selector: 'app-enhancement-display',
  templateUrl: './enhancement-display.component.html',
  styleUrls: ['./enhancement-display.component.css']
})
export class EnhancementDisplayComponent implements OnInit {

  @Input() amelioration: Amelioration;

  constructor() { }

  ngOnInit() {
  }

}
