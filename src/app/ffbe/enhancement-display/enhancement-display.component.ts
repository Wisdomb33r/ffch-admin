import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {Amelioration} from '../model/amelioration.model';
import {FfchClientService} from '../services/ffch-client.service';
import {CharactersService} from '../services/characters.service';
import {forEach} from '@angular/router/src/utils/collection';
import {Character} from '../model/character.model';
import {CharacterMapper} from '../mappers/character-mapper';
import {Personnage} from '../model/personnage.model';

@Component({
  selector: 'app-enhancement-display',
  templateUrl: './enhancement-display.component.html',
  styleUrls: ['./enhancement-display.component.css']
})
export class EnhancementDisplayComponent implements OnInit, OnChanges {

  @Input() amelioration: Amelioration;
  public displayed = false;
  public personnages: Array<Personnage>;

  constructor(private charactersService: CharactersService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.getPersonnages();
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

  public isSingleCharacter()
  {
    return this.personnages.length === 1;
  }

  protected getPersonnages()
  {
    this.personnages = [];
    this.amelioration.units.forEach(unit => this.personnages.push(CharacterMapper.toPersonnage(this.charactersService.searchForCharacterByGumiId(unit))));
    if (this.personnages.length == 1)
    {
      this.amelioration.perso_gumi_id = this.personnages[0].gumi_id;
    }
  }



}
