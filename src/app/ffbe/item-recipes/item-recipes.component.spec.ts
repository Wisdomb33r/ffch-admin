import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRecipesComponent } from './item-recipes.component';

describe('ItemRecipesComponent', () => {
  let component: ItemRecipesComponent;
  let fixture: ComponentFixture<ItemRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
