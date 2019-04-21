import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteDisplayComponent } from './recette-display.component';

describe('RecetteDisplayComponent', () => {
  let component: RecetteDisplayComponent;
  let fixture: ComponentFixture<RecetteDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecetteDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetteDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
