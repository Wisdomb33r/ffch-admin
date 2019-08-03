import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ObjetAlterationsEtatDuoDisplayComponent} from './objet-alterations-etat-duo-display.component';

describe('ObjetAlterationsEtatDuoDisplayComponent', () => {
  let component: ObjetAlterationsEtatDuoDisplayComponent;
  let fixture: ComponentFixture<ObjetAlterationsEtatDuoDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjetAlterationsEtatDuoDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetAlterationsEtatDuoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
