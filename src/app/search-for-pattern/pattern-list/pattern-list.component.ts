import { Component, Input } from '@angular/core';
import { PatternPartial } from 'src/app/models/pattern-partial.model';

@Component({
  selector: 'pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.scss']
})
export class PatternListComponent {
  @Input() patterns$: PatternPartial[] | null;
  @Input() spinner: boolean;
}
