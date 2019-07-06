import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetencesCompararingContainerDisplayComponent} from './competences-compararing-container-display.component';

describe('CompetencesCompararingContainerDisplayComponent', () => {
  let component: CompetencesCompararingContainerDisplayComponent;
  let fixture: ComponentFixture<CompetencesCompararingContainerDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencesCompararingContainerDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetencesCompararingContainerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
