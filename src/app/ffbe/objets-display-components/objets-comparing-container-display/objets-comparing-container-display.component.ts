import {Component, Input, OnInit} from '@angular/core';
import {ObjetsComparingContainer} from '../../model/objet/objets-comparing-container.model';
import {Objet} from '../../model/objet/objet.model';

@Component({
  selector: 'app-objets-comparing-container-display',
  templateUrl: './objets-comparing-container-display.component.html',
  styleUrls: ['./objets-comparing-container-display.component.css']
})
export class ObjetsComparingContainerDisplayComponent implements OnInit {

  @Input() objetsContainer: ObjetsComparingContainer;
  public modificationPanelDisplayed = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public switchModificationPanelDisplayed() {
    this.modificationPanelDisplayed = !this.modificationPanelDisplayed;
  }

  public objetModified(o: Objet) {
    this.switchModificationPanelDisplayed();
    this.objetsContainer.dbObjet = o;
  }

}
