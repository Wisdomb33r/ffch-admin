import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetencesComparingContainerDisplayComponent} from './competences-comparing-container-display.component';

describe('CompetencesComparingContainerDisplayComponent', () => {
  let component: CompetencesComparingContainerDisplayComponent;
  let fixture: ComponentFixture<CompetencesComparingContainerDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompetencesComparingContainerDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetencesComparingContainerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
