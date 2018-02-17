import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenusComponent} from './menus.component';

xdescribe('MenusComponent', () => {
  let component: MenusComponent;
  let fixture: ComponentFixture<MenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenusComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
