import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pattern } from 'src/app/models/pattern.model';

@Component({
  selector: 'pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.scss']
})
export class PatternListComponent {
  @Input() patterns$: Observable<Pattern[]>;
  @Input() spinner: boolean;
}
