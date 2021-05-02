import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { PatternPartial } from '../models/pattern-partial.model';
import { RavelryService } from '../services/ravelry.service';

@Component({
  selector: 'search-for-pattern',
  templateUrl: './search-for-pattern.component.html',
  styleUrls: ['./search-for-pattern.component.scss']
})
export class SearchForPatternComponent {
  detailsOpened: boolean;

  //TODO if a call was made to the service previously, the data should be prefilled
  patterns$: Observable<PatternPartial[]>;
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
    private router: Router
  ) { }

  onSearchPattern(event?): void {
    this.router.navigate(['/schemat']);
    this.showSpinner = true;
    this.showError = false;
    this.searchParams = event === 'retry' ? this.searchParams : {
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

  onActivate(e): void {
    console.log('eeeeeeeeeee', e)
    this.detailsOpened = true;
  }
  onDeactivate(e): void {
    this.detailsOpened = false;
  }
}
