import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PatternPartial } from 'src/app/models/pattern-partial.model';

@Component({
  selector: 'pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.scss']
})
export class PatternListComponent {
  @Input() patterns$: Observable<PatternPartial[]>;
  @Input() spinner: boolean;

  constructor(
    private router: Router
  ) {}

  openDetails(id): void {

    this.router.navigate(['schemat', id])
  }
}
