import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterSkillsDisplayComponent} from './character-skills-display.component';

xdescribe('CharacterSkillsDisplayComponent', () => {
  let component: CharacterSkillsDisplayComponent;
  let fixture: ComponentFixture<CharacterSkillsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterSkillsDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSkillsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
