import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ObjetDisplayComponent} from './objet-display.component';

describe('ObjetDisplayComponent', () => {
  let component: ObjetDisplayComponent;
  let fixture: ComponentFixture<ObjetDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjetDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
