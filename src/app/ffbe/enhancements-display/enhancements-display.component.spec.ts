import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnhancementsDisplayComponent } from './enhancements-display.component';

xdescribe('EnhancementsDisplayComponent', () => {
  let component: EnhancementsDisplayComponent;
  let fixture: ComponentFixture<EnhancementsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnhancementsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnhancementsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
