import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Pattern } from 'src/app/models/pattern.model';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RavelryService } from 'src/app/services/ravelry.service';

@Component({
  selector: 'pattern-details',
  templateUrl: './pattern-details.component.html',
  styleUrls: ['./pattern-details.component.scss']
})
export class PatternDetailsComponent implements OnInit {
  pattern$: Observable<Pattern>;
  showSpinner: boolean = true;
  showError: boolean;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private ravelryService: RavelryService
  ) { }

  ngOnInit() {
    this.showError = false;
    this.pattern$ = this.route.paramMap
    .pipe(
      switchMap((params: ParamMap) =>
        this.ravelryService.getPatternDetails(params.get('id'))
          .pipe(
            map(pattern => {
              return this.mapImages(pattern)
            }),
            catchError((error) => {
              this.showError = true;
              return of(error);
            }),
            finalize(() => this.showSpinner = false)
          )
      )
    );
  }

  back(): void {
    this.location.back()
  }

  onTryAgain(): void {
    this.ngOnInit();
  }

  private mapImages(pattern): Pattern {
    return {
      ...pattern,
      sliderImages: pattern.photos.map(
        photo => {
          return {
            image: photo.medium2_url,
            thumbImage: photo.small_url,
          }
        })
    }
  }
}
