import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ObjetAlterationsEtatDisplayComponent} from './objet-alterations-etat-display.component';

describe('ObjetAlterationsEtatDisplayComponent', () => {
  let component: ObjetAlterationsEtatDisplayComponent;
  let fixture: ComponentFixture<ObjetAlterationsEtatDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjetAlterationsEtatDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetAlterationsEtatDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
