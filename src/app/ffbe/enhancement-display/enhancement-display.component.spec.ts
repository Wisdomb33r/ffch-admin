import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnhancementDisplayComponent } from './enhancement-display.component';

xdescribe('EnhancementDisplayComponent', () => {
  let component: EnhancementDisplayComponent;
  let fixture: ComponentFixture<EnhancementDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnhancementDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnhancementDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
