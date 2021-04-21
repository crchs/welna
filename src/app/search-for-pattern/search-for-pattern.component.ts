import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../models/category.model';
import { Craft } from '../models/craft.model';
import { Size } from '../models/size.model';

@Component({
  selector: 'search-for-pattern',
  templateUrl: './search-for-pattern.component.html',
  styleUrls: ['./search-for-pattern.component.scss']
})
export class SearchForPatternComponent implements OnInit {
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
      key: 'crochet',
      name: 'Szydełko'
    },
    {
      key: 'knitting',
      name: 'Druty'
    }
  ];

  // change to be fetched from the server
  // make a generic interface
  sizes: Size[];
  categories: Category[];


  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      color: this.colorControl,
      fontSize: this.fontSizeControl,
      crafts: ['', Validators.required],
      size: ['', Validators.required],
      categories: ['', Validators.required],
      freePattern: '',
    });
  }

  ngOnInit(): void {
    this.form.controls.crafts.valueChanges.subscribe(val => {
      console.log('morfuję!!', val)
      //todo tutaj fetchować sajzy szydełek i drutów
      //i również kategorie szmatek
      // $observable?? 
      this.sizes = [
        { key: 'size1', name: '1' },
        { key: 'size2', name: '2' },
        { key: 'size3', name: '3' },
        { key: 'size4', name: '4' }
      ];
      this.categories = [
        { key: 'category1', name: 'sweter' },
        { key: 'category2', name: 'szal' },
        { key: 'category3', name: 'poncho' },
        { key: 'category4', name: 'top' }
      ];
    });
  }

  searchPatterns(): void {
    console.log('to forma', this.form)
    if (!this.form.valid) {
      console.warn('INVALIDA');
      return;
    }
  }

  getFontSize(): number {
    return Math.max(10, this.fontSizeControl.value);
  }
}
