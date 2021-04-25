import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { Craft } from 'src/app/models/craft.model';
import { CraftType } from 'src/app/models/craftType.enum';
import { NeedleSize } from 'src/app/models/needle-size.model';
import { Pattern } from 'src/app/models/pattern.model';
import { RavelryService } from 'src/app/services/ravelry.service';

@Component({
  selector: 'pattern-form',
  templateUrl: './pattern-form.component.html',
  styleUrls: ['./pattern-form.component.scss']
})
export class PatternFormComponent implements OnInit {
  @Output() searchPattern = new EventEmitter<any>();

  form: FormGroup;
  sizeError: boolean = false;
  freePatternToggle: any = {
    color: 'accent',
    checked: false,
    disabled: false,
  }

  crafts: Craft[] = [
    {
      key: CraftType.CROCHET,
      name: 'Szydełko'
    },
    {
      key: CraftType.KNITTING,
      name: 'Druty'
    }
  ];

  sizes$: Observable<NeedleSize[]>;
  categories$: Observable<Category[]> = this.ravelry.fetchPatternCategories();
  patterns$: Observable<Pattern[]>;

  constructor(
    formBuilder: FormBuilder,
    private ravelry: RavelryService,
  ) {
    this.form = formBuilder.group({
      crafts: ['', Validators.required],
      needleSize: ['', Validators.required],
      categories: ['', Validators.required],
      freePattern: '',
    });
  }

  ngOnInit(): void {
    this.form.controls.crafts.valueChanges
      .subscribe(val => {
        this.sizes$ = this.fetchSizes(val);
        this.form.controls['needleSize'].reset();
      });
  }

  searchPatterns(): void {
    if (!this.form.valid) {
      return;
    }

    this.searchPattern.emit({
      craft: this.form.controls.crafts.value,
      needleSize: this.form.controls.needleSize.value,
      category: this.form.controls.categories.value,
      isFree: this.form.controls.freePattern.value
    })
  }

  fetchSizes(val): Observable<NeedleSize[]> {
    this.sizeError = false;
    return this.ravelry.fetchNeedlesSizes(val)
      .pipe(
        catchError((error) => {
          this.sizeError = true;
          return of(error);
        }),
        shareReplay()
      )
  }
}
