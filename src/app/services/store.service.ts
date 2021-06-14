import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paginator } from '../models/paginator.model';
import { PatternPartial } from '../models/pattern-partial.model';
import { RavelryService } from './ravelry.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _wasInstructionsPanelSeen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _patternsSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _patternsError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _patterns: BehaviorSubject<PatternPartial[]> = new BehaviorSubject<PatternPartial[]>([]);
  private _paginator: BehaviorSubject<Paginator | undefined> = new BehaviorSubject<Paginator | undefined>(undefined);
  private lastParams: any;

  constructor(
    private ravelry: RavelryService
  ) { }

  /* Instructions Panel shown only on first opening of the app */
  setInstructionsPanelSeen(): void {
    this._wasInstructionsPanelSeen.next(true);
  }

  getInstructionsPanelSeen(): Observable<boolean> {
    return this._wasInstructionsPanelSeen.asObservable();
  }

  /* Patterns */

  fetchPatterns(searchParams?, page?): void {
    this._patternsError.next(false);
    this._patternsSpinner.next(true);
    this.lastParams = (!this.lastParams || !page) ? searchParams : this.lastParams;

    this.ravelry.searchForPatterns(searchParams || this.lastParams, page || 1)
      .subscribe(
        patternData => {
          this._patterns.next(patternData.patterns)
          this._paginator.next(patternData.paginator)
        },
        () => {
          this._patternsError.next(true);
          this._patternsSpinner.next(false);
        },
        () => {
          this._patternsSpinner.next(false);
        }
      )
  }

  getFetchedPatterns(): Observable<PatternPartial[]> {
    return this._patterns.asObservable();
  }

  getPagination(): Observable<Paginator | undefined> {
    return this._paginator.asObservable();
  }

  /* Spinner status */
  getSpinnerStatus(): Observable<boolean> {
    return this._patternsSpinner.asObservable();
  }

  /* Error status */
  getErrorStatus(): Observable<boolean> {
    return this._patternsError.asObservable();
  }
}
