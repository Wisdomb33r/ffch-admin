import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ObjetsDisplayComponent} from './objets-display.component';

describe('ObjetsDisplayComponent', () => {
  let component: ObjetsDisplayComponent;
  let fixture: ComponentFixture<ObjetsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjetsDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
