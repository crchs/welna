import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Pattern } from '../models/pattern-partial.model';
import { RavelryService } from '../services/ravelry.service';
import { SearchForPatternComponent } from './search-for-pattern.component';

describe('SearchForPatternComponent', () => {
  let component: SearchForPatternComponent;
  let fixture: ComponentFixture<SearchForPatternComponent>;
  let ravelryServiceStub: Partial<RavelryService>;
  let ravelryService: RavelryService;

  ravelryServiceStub = {
    searchForPatterns(params): Observable<Pattern[]> {
      return of([])
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchForPatternComponent],
      providers: [
        { provide: RavelryService, useValue: ravelryServiceStub },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchForPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    ravelryService = TestBed.inject(RavelryService);
    component.searchParams = {
      craft: 'crochet',
      needleSize: '5.0mm',
      category: 'hat',
      isFree: true
    }

  });

  it('should fetch patterns when form is submitted', () => {
    spyOn(ravelryService, 'searchForPatterns').and.returnValue(of([]));
    component.onSearchPattern({
      craft: 'knitting',
      needleSize: '3.0mm',
      category: 'hat',
      isFree: false
    });
    expect(ravelryService.searchForPatterns).toHaveBeenCalledWith(
      {
        craft: 'knitting',
        needleSize: '3.0mm',
        category: 'hat',
        isFree: false
      }
    )
  });

  it('should fetch patterns with presaved params after an error', () => {
    spyOn(ravelryService, 'searchForPatterns').and.returnValue(of([]));
    component.onSearchPattern('retry');
    expect(ravelryService.searchForPatterns).toHaveBeenCalledWith(
      {
        craft: 'crochet',
        needleSize: '5.0mm',
        category: 'hat',
        isFree: true
      }
    )
  });
});
