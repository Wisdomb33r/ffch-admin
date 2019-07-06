import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterSkillModificationDisplayComponent} from './character-skill-modification-display.component';

describe('CharacterSkillModificationDisplayComponent', () => {
  let component: CharacterSkillModificationDisplayComponent;
  let fixture: ComponentFixture<CharacterSkillModificationDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterSkillModificationDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSkillModificationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
