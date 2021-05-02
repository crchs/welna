import { Component, Input, OnInit } from '@angular/core';
import { Pattern } from 'src/app/models/pattern.model';

@Component({
  selector: 'pattern-details-table',
  templateUrl: './pattern-details-table.component.html',
  styleUrls: ['./pattern-details-table.component.scss']
})
export class PatternDetailsTableComponent implements OnInit {
  @Input() pattern: Pattern;

  constructor() { }

  ngOnInit(): void { } 
}
