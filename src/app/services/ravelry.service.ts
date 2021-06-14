import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, filter, map, shareReplay, toArray } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { CraftType } from '../models/craftType.enum';
import { NeedleSize } from '../models/needle-size.model';
import { Paginator } from '../models/paginator.model';
import { PatternPartial } from '../models/pattern-partial.model';
import { Pattern } from '../models/pattern.model';
import { CATEGORIES } from './resources/pattern-categories';

type NeedleSizes = {
  needle_sizes: NeedleSize[];
}

type PatternEnvelope = {
  pattern: Pattern;
}

type PatternData = {
  paginator: Paginator,
  patterns: PatternPartial[]
}

@Injectable({
  providedIn: 'root'
})
export class RavelryService {
  readonly ravelryBaseUrl = 'https://api.ravelry.com/';
  readonly httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    //TODO: way to hide this -- store in firebase?
    'Authorization': 'Basic ' + btoa('206c16d1b8ceec8a74b77dcb783ab01c:kTzrxxXd7xWMF3iY9Q0FDJawdOpCsQDLMu4HIPiZ')
  });

  constructor(
    private http: HttpClient,
  ) { }

  fetchNeedlesSizes(craft: CraftType): Observable<NeedleSize[]> {
    const params = new HttpParams().append('craft', craft);
    return this.http
      .get<NeedleSizes>(`${this.ravelryBaseUrl}needles/sizes.json`, {
        headers: this.httpHeaders,
        params: params
      })
      .pipe(
        concatMap((response) => {
          return response.needle_sizes
        }),
        filter(size => {
          return this.getPopularSizes(size.metric);
        }),
        map((size) => {
          return {
            ...size,
            metric: Number.isInteger(size.metric) ? size.metric.toFixed(1) : size.metric
          } as NeedleSize
        }),
        toArray()
      )
  }

  fetchPatternCategories(): Observable<Category[]> {
    return of(CATEGORIES);
  }

  searchForPatterns(searchParams, page: number): Observable<PatternData> {
    let params = new HttpParams();
    params = params.append('craft', searchParams.craft);
    params = params.append(searchParams.craft === CraftType.CROCHET ? 'hooks' : 'needles', `${searchParams.needleSize}mm`);
    params = params.append('pc', searchParams.category);
    params = params.append('availability', searchParams.isFree ? 'free' : '');
    params = params.append('page_size', '30');
    params = params.append('page', page.toString());

    return this.http
      .get<PatternData>(`${this.ravelryBaseUrl}patterns/search.json`, {
        headers: this.httpHeaders,
        params: params
      })
      .pipe(
        map(response => {
          return response
        })
      )
  }

  getPatternDetails(id): Observable<Pattern> {
    return this.http
      .get<PatternEnvelope>(`${this.ravelryBaseUrl}patterns/${id}.json`, {
        headers: this.httpHeaders
      })
      .pipe(
        map(response => {
          return response.pattern;
        }),
        shareReplay()
      )
  }

  private getPopularSizes(size: number): boolean {
    return size >= 2 && size < 7
  }
}
