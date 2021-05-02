import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternDetailsTableComponent } from './pattern-details-table.component';

describe('PatternDetailsTableComponent', () => {
  let component: PatternDetailsTableComponent;
  let fixture: ComponentFixture<PatternDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatternDetailsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
