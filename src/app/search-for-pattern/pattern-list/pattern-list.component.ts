import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pattern } from 'src/app/models/pattern.model';

@Component({
  selector: 'pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.scss']
})
export class PatternListComponent implements OnInit {
  @Input() patterns$: Observable<Pattern[]>;

  constructor() { }

  ngOnInit(): void {
    console.log('inited', this.patterns$)
  }

}
