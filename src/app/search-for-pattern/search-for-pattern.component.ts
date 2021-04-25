import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Pattern } from '../models/pattern.model';
import { RavelryService } from '../services/ravelry.service';

@Component({
  selector: 'search-for-pattern',
  templateUrl: './search-for-pattern.component.html',
  styleUrls: ['./search-for-pattern.component.scss']
})
export class SearchForPatternComponent {
  patterns$: Observable<Pattern[]>;
  showSpinner: boolean = false;
  showError: boolean = false;
  searchParams: any = {
    searchedCraft: '',
    searchedNeedleSize: '',
    searchedCategory: '',
    searchedIsFree: ''
  }

  constructor(
    private ravelry: RavelryService,
  ) { }

  onSearchPattern(event): void {
    this.showSpinner = true;
    this.showError = false;
    this.searchParams = event ==='retry' ? this.searchParams : {
      craft: event.craft,
      needleSize: event.needleSize,
      category: event.category,
      isFree: event.isFree
    }

    this.patterns$ = this.ravelry.searchForPatterns(
      this.searchParams
    ).pipe(
      catchError((error) => {
        this.showError = true;
        return of(error);
      }),
      finalize(() => { this.showSpinner = false; })
    )
  }

  onTryAgain(): void {
    this.onSearchPattern('retry');
  }
}
