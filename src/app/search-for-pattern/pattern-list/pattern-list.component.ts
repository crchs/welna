import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Paginator } from 'src/app/models/paginator.model';
import { PatternPartial } from 'src/app/models/pattern-partial.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.scss']
})
export class PatternListComponent implements OnInit {
  patterns$: PatternPartial[];
  pageInfo$: Paginator | undefined;
  pageEvent: PageEvent;

  spinner: Observable<boolean> = this.store.getSpinnerStatus();

  constructor(
    private router: Router,
    private store: StoreService
  ) { }

  ngOnInit(): void {
    this.store.getFetchedPatterns().subscribe((patterns) => {
      this.patterns$ = patterns;
    });
    this.store.getPagination().subscribe((pageInfo) => {
      this.pageInfo$ = pageInfo;
    });
  }

  openDetails(id): void {
    this.router.navigate(['schemat', id])
  }

  fetchMorePatterns(event: PageEvent) {
    this.store.fetchPatterns(undefined, event.pageIndex + 1)
    return event;
  }
}
