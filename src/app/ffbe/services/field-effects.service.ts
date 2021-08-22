import {FieldEffect} from '../model/effects/field-effect.model';
import {Injectable} from '@angular/core';
import {DataMiningClientService} from './data-mining-client.service';
import {forkJoin} from 'rxjs';
import {plainToClass} from 'class-transformer';

@Injectable()
export class FieldEffectsService {
  private static INSTANCE: FieldEffectsService;

  private fieldEffectsFromDataMining = null;

  public static getInstance(): FieldEffectsService {
    return FieldEffectsService.INSTANCE;
  }

  constructor(private dataMiningClientService: DataMiningClientService) {
    this.loadFieldEffectsFromDataMining();
    FieldEffectsService.INSTANCE = this;
  }


  public loadFieldEffectsFromDataMining() {
    if (this.fieldEffectsFromDataMining == null) {
      const observables = [];
      observables.push(this.dataMiningClientService.getFieldEffects$());
      forkJoin(observables)
        .subscribe((data: any) => {
          this.fieldEffectsFromDataMining = data[0];
        });
    }
  }

  public searchForFieldEffectByGumiId(id: number): FieldEffect {
    if (this.fieldEffectsFromDataMining != null) {
      const propertyNames: string[] = Object.getOwnPropertyNames(this.fieldEffectsFromDataMining);
      const property = propertyNames.find(propertyName => +propertyName === id);
      if (property) {
        return this.convertPlainDataMiningObjectToFieldEffect(property);
      }
    }
    return null;
  }

  private convertPlainDataMiningObjectToFieldEffect(property: string): FieldEffect {
    const fieldEffect: FieldEffect = plainToClass(FieldEffect, this.fieldEffectsFromDataMining[property]);
    fieldEffect.gumi_id = +property;
    return fieldEffect;
  }

  public isLoaded(): boolean {
    return this.fieldEffectsFromDataMining;
  }
}
