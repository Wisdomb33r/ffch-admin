import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulesDisplayComponent } from './formules-display.component';

describe('FormulesDisplayComponent', () => {
  let component: FormulesDisplayComponent;
  let fixture: ComponentFixture<FormulesDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulesDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
