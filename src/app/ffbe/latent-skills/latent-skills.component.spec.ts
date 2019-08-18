import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LatentSkillsComponent} from './latent-skills.component';

describe('LatentSkillsComponent', () => {
  let component: LatentSkillsComponent;
  let fixture: ComponentFixture<LatentSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LatentSkillsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatentSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
