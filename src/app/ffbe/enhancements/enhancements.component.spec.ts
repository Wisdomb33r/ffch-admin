import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnhancementsComponent } from './enhancements.component';

xdescribe('EnhancementsComponent', () => {
  let component: EnhancementsComponent;
  let fixture: ComponentFixture<EnhancementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnhancementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnhancementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
