import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import {Item} from '../model/item.model';
import {ItemsService} from '../services/items.service';
import {ItemMapper} from '../mappers/item-mapper';
import {Objet} from '../model/objet.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  englishName: FormControl;
  frenchName: FormControl;
  gumiId: FormControl;
  objets: Array<Objet>;

  constructor(private itemsService: ItemsService) {
    this.englishName = new FormControl('');
    this.frenchName = new FormControl('');
    this.gumiId = new FormControl('');
  }

  ngOnInit() {
  }

  public searchItemsInDataMining() {
    this.objets = [];
    let items: Array<Item> = [];
    if (!isNullOrUndefined(this.gumiId.value) && this.gumiId.value > 0) {
      this.englishName.patchValue('');
      this.frenchName.patchValue('');
      items = this.itemsService.searchForItemsByGumiId(this.gumiId.value);
    } else {
      items = this.itemsService.searchForItemsByNames(this.englishName.value, this.frenchName.value);
    }
    items.forEach(item => this.objets.push(ItemMapper.toObjet(item)));
  }

  public isDataMiningLoading(): boolean {
    return !this.itemsService.isLoaded();
  }

  public areObjetsDisplayed(): boolean {
    return Array.isArray(this.objets) && this.objets.length > 0;
  }
}
