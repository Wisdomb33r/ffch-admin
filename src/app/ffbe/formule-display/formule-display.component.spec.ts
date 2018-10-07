import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormuleDisplayComponent } from './formule-display.component';

xdescribe('FormuleDisplayComponent', () => {
  let component: FormuleDisplayComponent;
  let fixture: ComponentFixture<FormuleDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormuleDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormuleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
