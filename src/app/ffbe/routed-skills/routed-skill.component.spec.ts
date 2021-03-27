import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutedSkillComponent } from './routed-skill.component';

describe('RoutedSkillsComponent', () => {
  let component: RoutedSkillComponent;
  let fixture: ComponentFixture<RoutedSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutedSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutedSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
