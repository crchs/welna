import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternDetailsComponent } from './pattern-details.component';

describe('PatternDetailsComponent', () => {
  let component: PatternDetailsComponent;
  let fixture: ComponentFixture<PatternDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatternDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
