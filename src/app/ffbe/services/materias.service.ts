import {DataMiningClientService} from './data-mining-client.service';
import {Injectable} from '@angular/core';
import {Materia} from '../model/materia.model';
import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';


@Injectable()
export class MateriasService {

  private materiasFromDataMining = null;

  constructor(private dataMiningClientService: DataMiningClientService) {
    this.loadMateriasFromDataMining();
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
      matchingProperties = propertyNames.filter(
        propertyName =>
          this.materiasFromDataMining[propertyName].name === english
          && this.materiasFromDataMining[propertyName].strings.names[FFBE_FRENCH_TABLE_INDEX] === french
      );
    } else if (english) {
      matchingProperties = propertyNames.filter(
        propertyName => this.materiasFromDataMining[propertyName].name === english
      );
    } else if (french) {
      matchingProperties = propertyNames.filter(
        propertyName => this.materiasFromDataMining[propertyName].strings.names[FFBE_FRENCH_TABLE_INDEX] === french
      );
    }
    if (Array.isArray(matchingProperties) && matchingProperties.length > 0) {
      matchingProperties.forEach(property => {
        const materia: Materia = this.materiasFromDataMining[property];
        materia.gumi_id = +property;
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
        return materia;
      }
    }
    return null;
  }

  public isLoaded(): boolean {
    return this.materiasFromDataMining != null;
  }
}

