import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Paginator } from '../models/paginator.model';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'search-for-pattern',
  templateUrl: './search-for-pattern.component.html',
  styleUrls: ['./search-for-pattern.component.scss']
})
export class SearchForPatternComponent {
  detailsOpened: boolean;      
  showSpinner: Observable<boolean> = this.store.getSpinnerStatus();
  pageLoaded$: Observable<Paginator | undefined> = this.store.getPagination();
  showError: Observable<boolean> = this.store.getErrorStatus();
  searchParams: any = {
    searchedCraft: '',
    searchedNeedleSize: '',
    searchedCategory: '',
    searchedIsFree: ''
  }
  wasInstructionsPanelSeen$ = this.store.getInstructionsPanelSeen();

  constructor(
    private router: Router,
    private store: StoreService,
  ) { }

  onSearchPattern(event?): void {
    this.router.navigate(['/schemat']);
    this.store.setInstructionsPanelSeen();
    this.searchParams =  {
      craft: event.craft,
      needleSize: event.needleSize,
      category: event.category,
      isFree: event.isFree
    }

    this.store.fetchPatterns(this.searchParams);
  }

  onTryAgain(): void {
    this.store.fetchPatterns();
  }

  onActivate(e): void {
    this.detailsOpened = true;
  }
  onDeactivate(e): void {
    this.detailsOpened = false;
  }
}
