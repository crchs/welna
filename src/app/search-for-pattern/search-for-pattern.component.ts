import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Pattern } from '../models/pattern.model';
import { RavelryService } from '../services/ravelry.service';

@Component({
  selector: 'search-for-pattern',
  templateUrl: './search-for-pattern.component.html',
  styleUrls: ['./search-for-pattern.component.scss']
})
export class SearchForPatternComponent implements OnInit {
  patterns$: Observable<Pattern[]>;
  showSpinner: boolean = false;

  constructor(
    private ravelry: RavelryService,
  ) {}

  ngOnInit(): void {

  }

  onSearchPattern(event): void {
    this.showSpinner = true;
    this.patterns$ =  this.ravelry.searchForPatterns(
      event.craft, event.needleSize, event.category, event.isFree
    ).pipe(
      finalize(() => {this.showSpinner = false;})
    )
  }
}
