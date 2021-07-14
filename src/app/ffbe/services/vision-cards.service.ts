import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {SkillsService} from './skills.service';
import {Skill} from '../model/skill.model';
import {VisionCard} from '../model/items/vision-cards/vision-card.model';
import {forkJoin} from 'rxjs';


@Injectable()
export class VisionCardsService {
  private static INSTANCE: VisionCardsService;

  private visionCardsFromDataMining = null;
  private visionCardsNamesFromDataMining = null;
  private visionCardsDescriptionsFromDataMining = null;

  public static getInstance(): VisionCardsService {
    return VisionCardsService.INSTANCE;
  }

  constructor(private dataMiningClientService: DataMiningClientService,
              private skillsService: SkillsService) {
    this.loadVisionCardsFromDataMining();
    VisionCardsService.INSTANCE = this;
  }

  public loadVisionCardsFromDataMining() {
    if (this.visionCardsFromDataMining == null) {
      const observables = [];
      observables.push(this.dataMiningClientService.getVisionCards$());
      observables.push(this.dataMiningClientService.getVisionCardsNames$());
      observables.push(this.dataMiningClientService.getVisionCardsDescriptions$());
      forkJoin(observables)
        .subscribe(data => {
          this.visionCardsFromDataMining = data[0];
          this.visionCardsNamesFromDataMining = data[1];
          this.visionCardsDescriptionsFromDataMining = data[2];
        });
    }
  }

  public searchForVisionCardsByNames(english: string, french: string): Array<VisionCard> {
    const visionCards: Array<VisionCard> = [];
    const propertyNames: string[] = Object.getOwnPropertyNames(this.visionCardsFromDataMining);
    let matchingProperties: Array<string> = [];
    if (english && french) {
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.visionCardsFromDataMining[propertyName].name === english
          && this.visionCardsNamesFromDataMining[propertyName]
          && this.visionCardsNamesFromDataMining[propertyName][FFBE_FRENCH_TABLE_INDEX] === french
      );
    } else if (english) {
      matchingProperties = propertyNames.filter(
        propertyName => this.visionCardsFromDataMining[propertyName].name === english
      );
    } else if (french) {
      matchingProperties = propertyNames.filter(
        propertyName => this.visionCardsNamesFromDataMining[propertyName]
          && this.visionCardsNamesFromDataMining[propertyName][FFBE_FRENCH_TABLE_INDEX] === french
      );
    }
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      matchingProperties.forEach(property => {
        const visionCard: VisionCard = this.visionCardsFromDataMining[property];
        visionCard.gumi_id = +property;
        visionCard.names = this.visionCardsNamesFromDataMining[property];
        visionCard.desc_short = this.visionCardsDescriptionsFromDataMining[property];
        this.searchForVisionCardSkills(visionCard);
        visionCards.push(visionCard);
      });
    }
    return visionCards;
  }

  public searchForVisionCardByGumiId(id: number): VisionCard {
    if (this.visionCardsFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.visionCardsFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        const visionCard: VisionCard = this.visionCardsFromDataMining[property];
        visionCard.gumi_id = +property;
        visionCard.names = this.visionCardsNamesFromDataMining[property];
        visionCard.desc_short = this.visionCardsDescriptionsFromDataMining[property];
        this.searchForVisionCardSkills(visionCard);
        return visionCard;
      }
    }
    return null;
  }

  public searchForVisionCardSkills(visionCard: VisionCard) {
    if (visionCard.skills) {
      const skills: Array<Skill> = [];
      const propertyNames: string[] = Object.getOwnPropertyNames(visionCard.skills);
      propertyNames.forEach(property => {
        const skillId: number = visionCard.skills[property];
        skills.push(this.skillsService.searchForSkillByGumiId(+skillId));
      });
      visionCard.dmSkills = skills;
    }
  }

  public isLoaded(): boolean {
    return this.visionCardsFromDataMining != null;
  }
}

