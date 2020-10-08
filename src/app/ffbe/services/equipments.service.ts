import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Equipment} from '../model/items/equipment/equipment.model';
import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {Skill} from '../model/skill.model';
import {SkillsService} from './skills.service';

@Injectable()
export class EquipmentsService {
  private static INSTANCE: EquipmentsService;

  private equipmentsFromDataMining = null;

  public static getInstance(): EquipmentsService {
    return EquipmentsService.INSTANCE;
  }

  constructor(private dataMiningClientService: DataMiningClientService,
              private skillsService: SkillsService) {
    this.loadEquipmentsFromDataMining();
    EquipmentsService.INSTANCE = this;
  }

  public loadEquipmentsFromDataMining() {
    if (this.equipmentsFromDataMining == null) {
      this.dataMiningClientService.getEquipments$()
        .subscribe(data => this.equipmentsFromDataMining = data);
    }
  }

  public searchForEquipmentsByNames(english: string, french: string): Array<Equipment> {
    const equipments: Array<Equipment> = [];
    const propertyNames: string[] = Object.getOwnPropertyNames(this.equipmentsFromDataMining);
    let matchingProperties: Array<string> = [];
    if (english && french) {
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.equipmentsFromDataMining[propertyName].name === english
          && this.equipmentsFromDataMining[propertyName].strings.name[FFBE_FRENCH_TABLE_INDEX] === french
      );
    } else if (english) {
      matchingProperties = propertyNames.filter(
        propertyName => this.equipmentsFromDataMining[propertyName].name === english
      );
    } else if (french) {
      matchingProperties = propertyNames.filter(
        propertyName => this.equipmentsFromDataMining[propertyName].strings.name[FFBE_FRENCH_TABLE_INDEX] === french
      );
    }
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      matchingProperties.forEach(property => {
        const equipment: Equipment = this.equipmentsFromDataMining[property];
        equipment.gumi_id = +property;
        this.searchForEquipmentSkills(equipment);
        equipments.push(equipment);
      });
    }
    return equipments;
  }

  public searchForEquipmentByGumiId(id: number): Equipment {
    if (this.equipmentsFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.equipmentsFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        const equipment: Equipment = this.equipmentsFromDataMining[property];
        equipment.gumi_id = +property;
        this.searchForEquipmentSkills(equipment);
        return equipment;
      }
    }
    return null;
  }

  public searchForEquipmentSkills(equipment: Equipment) {
    if (Array.isArray(equipment.skills) && equipment.skills.length > 0) {
      const skills: Array<Skill> = [];
      equipment.skills.forEach(id => skills.push(this.skillsService.searchForSkillByGumiId(id)));
      equipment.dmSkills = skills;
    }
  }

  public isLoaded(): boolean {
    return this.equipmentsFromDataMining != null;
  }
}

