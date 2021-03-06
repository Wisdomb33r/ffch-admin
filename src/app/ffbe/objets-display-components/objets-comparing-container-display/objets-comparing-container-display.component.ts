import {Component, Input, OnInit} from '@angular/core';
import {ObjetsComparingContainer} from '../../model/objet/objets-comparing-container.model';

@Component({
  selector: 'app-objets-comparing-container-display',
  templateUrl: './objets-comparing-container-display.component.html',
  styleUrls: ['./objets-comparing-container-display.component.css']
})
export class ObjetsComparingContainerDisplayComponent implements OnInit {

  @Input() objetsContainer: ObjetsComparingContainer;

  constructor() { }

  ngOnInit(): void {
  }

}
