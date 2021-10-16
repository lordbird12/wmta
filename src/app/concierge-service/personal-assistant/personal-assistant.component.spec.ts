import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAssistantComponent } from './personal-assistant.component';

describe('PersonalAssistantComponent', () => {
  let component: PersonalAssistantComponent;
  let fixture: ComponentFixture<PersonalAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalAssistantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
