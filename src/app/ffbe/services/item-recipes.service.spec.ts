import { TestBed } from '@angular/core/testing';

import { ItemRecipesService } from './item-recipes.service';

describe('ItemRecipesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemRecipesService = TestBed.get(ItemRecipesService);
    expect(service).toBeTruthy();
  });
});
