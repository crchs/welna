import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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
  colorControl = new FormControl('primary');
  fontSizeControl = new FormControl(16, Validators.min(10));
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
      color: this.colorControl,
      fontSize: this.fontSizeControl,
      crafts: ['', Validators.required],
      needleSize: ['', Validators.required],
      categories: ['', Validators.required],
      freePattern: '',
    });
  }

  ngOnInit(): void {
    this.form.controls.crafts.valueChanges
      .subscribe(val => {
        this.sizes$ = this.ravelry.fetchNeedlesSizes(val)

      });
  }

  searchPatterns(): void {
    if (!this.form.valid) {
      //TODO to be handled
      console.warn('INVALIDA');
      return;
    }

    this.searchPattern.emit({
      craft: this.form.controls.crafts.value,
      needleSize: this.form.controls.needleSize.value,
      category: this.form.controls.categories.value,
      isFree: this.form.controls.freePattern.value
    })
  }

  getFontSize(): number {
    return Math.max(10, this.fontSizeControl.value);
  }

}
