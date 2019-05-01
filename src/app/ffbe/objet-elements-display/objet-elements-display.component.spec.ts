import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ObjetElementsDisplayComponent} from './objet-elements-display.component';

describe('ObjetElementsDisplayComponent', () => {
  let component: ObjetElementsDisplayComponent;
  let fixture: ComponentFixture<ObjetElementsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjetElementsDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetElementsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
