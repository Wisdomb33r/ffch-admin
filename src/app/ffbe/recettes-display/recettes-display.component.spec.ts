import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecettesDisplayComponent } from './recettes-display.component';

describe('RecettesDisplayComponent', () => {
  let component: RecettesDisplayComponent;
  let fixture: ComponentFixture<RecettesDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecettesDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecettesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
