import {Component, Input, OnInit} from '@angular/core';
import {Unite} from '../model/unite.model';

@Component({
  selector: 'app-caracteristiques-container-display',
  templateUrl: './caracteristiques-container-display.component.html',
  styleUrls: ['./caracteristiques-container-display.component.css']
})
export class CaracteristiquesContainerDisplayComponent implements OnInit {

  @Input() unite: Unite;

  constructor() {
  }

  ngOnInit(): void {
  }

}
