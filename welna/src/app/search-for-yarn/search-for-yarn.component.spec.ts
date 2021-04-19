import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForYarnComponent } from './search-for-yarn.component';

describe('SearchForYarnComponent', () => {
  let component: SearchForYarnComponent;
  let fixture: ComponentFixture<SearchForYarnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchForYarnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchForYarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
