import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ItemsService} from '../services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  englishName: FormControl;
  frenchName: FormControl;
  gumiId: FormControl;

  constructor(private itemsService: ItemsService) {
    this.englishName = new FormControl('');
    this.frenchName = new FormControl('');
    this.gumiId = new FormControl('');
  }

  ngOnInit() {
  }

  public searchItemsInDataMining() {

  }


  public isDataMiningLoading(): boolean {
    return !this.itemsService.isLoaded();
  }
}
