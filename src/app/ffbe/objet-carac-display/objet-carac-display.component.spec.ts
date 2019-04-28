import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ObjetCaracDisplayComponent} from './objet-carac-display.component';

describe('ObjetCaracDisplayComponent', () => {
  let component: ObjetCaracDisplayComponent;
  let fixture: ComponentFixture<ObjetCaracDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjetCaracDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetCaracDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
