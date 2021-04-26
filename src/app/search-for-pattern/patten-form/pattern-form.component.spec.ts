import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CraftType } from 'src/app/models/craftType.enum';
import { NeedleSize } from 'src/app/models/needle-size.model';
import { Pattern } from 'src/app/models/pattern.model';
import { RavelryService } from 'src/app/services/ravelry.service';
import { PatternFormComponent } from './pattern-form.component';

describe('PatternFormComponent', () => {
  let component: PatternFormComponent;
  let fixture: ComponentFixture<PatternFormComponent>;
  let ravelryServiceStub: Partial<RavelryService>;
  let ravelryService: RavelryService;

  ravelryServiceStub = {
    searchForPatterns(params): Observable<Pattern[]> {
      return of([]);
    },
    fetchNeedlesSizes(craft: CraftType): Observable<NeedleSize[]> {
      return of([]);
    },
    fetchPatternCategories(): Observable<Category[]> {
      return of([]);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatOptionModule],
      providers: [FormBuilder,
        { provide: RavelryService, useValue: ravelryServiceStub },
      ],
      declarations: [PatternFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    ravelryService = TestBed.inject(RavelryService);
  });

  it('should fetch available sizes when craft is changed', () => {
    spyOn(ravelryService, 'fetchNeedlesSizes').and.returnValue(of([]));
    component.form.controls.crafts.setValue(CraftType.KNITTING);
    expect(ravelryService.fetchNeedlesSizes).toHaveBeenCalledOnceWith(CraftType.KNITTING);
  });

  it('should emit search event on form submit', () => {
    spyOn(component.searchPattern, 'emit');
    component.form.controls.crafts.setValue(CraftType.KNITTING);
    component.form.controls.needleSize.setValue(5);
    component.form.controls.categories.setValue('bag');
    component.form.controls.freePattern.setValue(true);
    component.searchPatterns();
    expect(component.searchPattern.emit).toHaveBeenCalledWith({
      craft: 'knitting',
      needleSize: 5,
      category: 'bag',
      isFree: true
    });
  });
});
