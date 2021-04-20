import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForPatternComponent } from './search-for-pattern.component';

describe('SearchForPatternComponent', () => {
  let component: SearchForPatternComponent;
  let fixture: ComponentFixture<SearchForPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchForPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchForPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
