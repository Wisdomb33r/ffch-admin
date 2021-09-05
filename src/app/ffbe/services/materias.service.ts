import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Materia} from '../model/items/materia/materia.model';
import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {SkillsService} from './skills.service';
import {Skill} from '../model/skill.model';


@Injectable()
export class MateriasService {
  private static INSTANCE: MateriasService;

  private materiasFromDataMining = null;

  public static getInstance(): MateriasService {
    return MateriasService.INSTANCE;
  }

  constructor(private dataMiningClientService: DataMiningClientService,
              private skillsService: SkillsService) {
    this.loadMateriasFromDataMining();
    MateriasService.INSTANCE = this;
  }

  public loadMateriasFromDataMining() {
    if (this.materiasFromDataMining == null) {
      this.dataMiningClientService.getMaterias$()
        .subscribe(data => this.materiasFromDataMining = data);
    }
  }

  public searchForMateriasByNames(english: string, french: string): Array<Materia> {
    const materias: Array<Materia> = [];
    const propertyNames: string[] = Object.getOwnPropertyNames(this.materiasFromDataMining);
    let matchingProperties: Array<string> = [];
    if (english && french) {
      matchingProperties = propertyNames
        .filter(
          propertyName =>
            this.materiasFromDataMining[propertyName].name === english
            && this.materiasFromDataMining[propertyName].strings?.names
            && this.materiasFromDataMining[propertyName].strings?.names[FFBE_FRENCH_TABLE_INDEX] === french
        );
    } else if (english) {
      matchingProperties = propertyNames.filter(
        propertyName => this.materiasFromDataMining[propertyName].name === english
      );
    } else if (french) {
      matchingProperties = propertyNames.filter(
        propertyName => this.materiasFromDataMining[propertyName].strings?.names
          && this.materiasFromDataMining[propertyName].strings?.names[FFBE_FRENCH_TABLE_INDEX] === french);
    }
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      matchingProperties.forEach(property => {
        const materia: Materia = this.materiasFromDataMining[property];
        materia.gumi_id = +property;
        this.searchForMateriaSkills(materia);
        materias.push(materia);
      });
    }
    return materias;
  }

  public searchForMateriaByGumiId(id: number): Materia {
    if (this.materiasFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.materiasFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        const materia: Materia = this.materiasFromDataMining[property];
        materia.gumi_id = +property;
        this.searchForMateriaSkills(materia);
        return materia;
      }
    }
    return null;
  }

  public searchForMateriaSkills(materia: Materia) {
    if (Array.isArray(materia.skills) && materia.skills.length > 0) {
      const skills: Array<Skill> = [];
      materia.skills.forEach(id => skills.push(this.skillsService.searchForSkillByGumiId(id)));
      materia.dmSkills = skills;
    }
  }

  public isLoaded(): boolean {
    return this.materiasFromDataMining != null;
  }
}

