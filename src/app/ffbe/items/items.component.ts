import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Item} from '../model/item.model';
import {ItemsService} from '../services/items.service';
import {ItemMapper} from '../mappers/item-mapper';
import {Objet} from '../model/objet/objet.model';
import {CharactersService} from '../services/characters.service';
import {FfbeUtils} from '../utils/ffbe-utils';

@Component({
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  englishName: FormControl;
  frenchName: FormControl;
  gumiId: FormControl;
  objets: Array<Objet>;

  constructor(private itemsService: ItemsService, private charactersService: CharactersService) {
    this.englishName = new FormControl('');
    this.frenchName = new FormControl('');
    this.gumiId = new FormControl('');
  }

  ngOnInit() {
  }

  public searchItemsInDataMining() {
    this.objets = [];
    let items: Array<Item> = [];
    if (!FfbeUtils.isNullOrUndefined(this.gumiId.value) && this.gumiId.value > 0) {
      this.englishName.patchValue('');
      this.frenchName.patchValue('');
      items = this.itemsService.searchForItemsByGumiId(this.gumiId.value);
    } else {
      items = this.itemsService.searchForItemsByNames(this.englishName.value, this.frenchName.value);
    }
    items.forEach(item => {
      const character = this.charactersService.searchForCharacterByTrustMasterReward(item.category, item.getGumiId());
      const objet = ItemMapper.toObjet(item);
      objet.lienTMR = ItemMapper.mapLienTRM(item, character);
      this.objets.push(objet);
    });
  }

  public isDataMiningLoading(): boolean {
    return !this.itemsService.isLoaded();
  }

  public areObjetsDisplayed(): boolean {
    return Array.isArray(this.objets) && this.objets.length > 0;
  }
}
