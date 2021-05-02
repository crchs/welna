import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { RavelryService } from 'src/app/services/ravelry.service';
import { PatternDetailsComponent } from './pattern-details.component';

describe('PatternDetailsComponent', () => {
  let component: PatternDetailsComponent;
  let fixture: ComponentFixture<PatternDetailsComponent>;
  let ravelryServiceStub: Partial<RavelryService>;
  let ravelryService: RavelryService;

  ravelryServiceStub = {
    getPatternDetails(id): Observable<any> {
      return of({
        pattern_author: 'author',
        name: 'name',
        packs: {},
        photos: [],
        sliderImages: [],
        permalink: 'link',
        difficulty_average: 7,
        currency_symbol: 'eur',
        price: 43,
        free: true,
        pattern_needle_sizes: [3, 2, 5],
        craft: {}
      });
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PatternDetailsComponent],
      providers: [
        { provide: RavelryService, useValue: ravelryServiceStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    ravelryService = TestBed.inject(RavelryService);
  });

  it('should reload component on try again ', () => {
    spyOn(component, 'ngOnInit');
    component.onTryAgain();
    expect(component.ngOnInit).toHaveBeenCalled();
  });
});
