import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternFormComponent } from './pattern-form.component';

describe('PatternFormComponent', () => {
  let component: PatternFormComponent;
  let fixture: ComponentFixture<PatternFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatternFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
