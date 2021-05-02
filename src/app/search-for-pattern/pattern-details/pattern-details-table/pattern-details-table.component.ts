import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pattern-details-table',
  templateUrl: './pattern-details-table.component.html',
  styleUrls: ['./pattern-details-table.component.scss']
})
export class PatternDetailsTableComponent implements OnInit {
  @Input() pattern;
  //todo add type

  constructor() { }

  ngOnInit(): void {
    console.log('this pattern', this.pattern)
  }

  
}
