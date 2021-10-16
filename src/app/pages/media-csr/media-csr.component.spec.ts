import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCsrComponent } from './media-csr.component';

describe('MediaCsrComponent', () => {
  let component: MediaCsrComponent;
  let fixture: ComponentFixture<MediaCsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaCsrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaCsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
