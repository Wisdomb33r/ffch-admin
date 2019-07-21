import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ObjetElementsTripletDisplayComponent} from './objet-elements-triplet-display.component';

describe('ObjetElementsTripletDisplayComponent', () => {
  let component: ObjetElementsTripletDisplayComponent;
  let fixture: ComponentFixture<ObjetElementsTripletDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjetElementsTripletDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetElementsTripletDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
