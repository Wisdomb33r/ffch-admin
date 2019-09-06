import {Component, OnInit} from '@angular/core';
import {LatentSkillsService} from '../services/latent-skills.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-latent-skills',
  templateUrl: './latent-skills.component.html',
  styleUrls: ['./latent-skills.component.css']
})
export class LatentSkillsComponent implements OnInit {

  characterName: FormControl;

  constructor(private latentSkillsService: LatentSkillsService) {
    this.characterName = new FormControl('');
  }

  ngOnInit() {
  }

  public isDataMiningLoading(): boolean {
    return !this.latentSkillsService.isLoaded();
  }

  public searchLatentSkillsInDataMining() {
  }
}
