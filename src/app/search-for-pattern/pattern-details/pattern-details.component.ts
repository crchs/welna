import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Pattern } from 'src/app/models/pattern.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RavelryService } from 'src/app/services/ravelry.service';

@Component({
  selector: 'pattern-details',
  templateUrl: './pattern-details.component.html',
  styleUrls: ['./pattern-details.component.scss']
})
export class PatternDetailsComponent implements OnInit {
  pattern$: Observable<Pattern>;

  //TODO generate this from ravelry images
  imageObject: Array<object> = [{
    image: 'assets/images/welna3.png',
    thumbImage: 'assets/img/slider/1_min.jpeg',
    alt: 'alt of image',
    title: 'title of image'
}, {
    image: 'assets/images/no-results-batcat.svg', // Support base64 image
    thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
    title: 'Image title', //Optional: You can use this key if want to show image with title
    alt: 'Image alt', //Optional: You can use this key if want to show image with alt
    order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
}
];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private ravelryService: RavelryService
  ) { }

  ngOnInit() {
    this.pattern$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.ravelryService.getPatternDetails(params.get('id')))
    );
  }

  back(): void {
    this.location.back()
  }
}
