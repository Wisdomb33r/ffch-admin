import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterSkillDisplayComponent} from './character-skill-display.component';

xdescribe('CharacterSkillDisplayComponent', () => {
  let component: CharacterSkillDisplayComponent;
  let fixture: ComponentFixture<CharacterSkillDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterSkillDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSkillDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
