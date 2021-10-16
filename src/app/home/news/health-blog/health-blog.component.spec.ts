import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthBlogComponent } from './health-blog.component';

describe('HealthBlogComponent', () => {
  let component: HealthBlogComponent;
  let fixture: ComponentFixture<HealthBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
