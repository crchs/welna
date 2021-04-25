import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable, of, throwError } from 'rxjs';
import { concatMap, filter, map, mergeMap, tap, toArray } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { CraftType } from '../models/craftType.enum';
import { NeedleSize } from '../models/needle-size.model';
import { Pattern } from '../models/pattern.model';
import { CATEGORIES } from './resources/pattern-categories';

type NeedleSizes = {
  needle_sizes: NeedleSize[];
}

type Patterns = {
  patterns: Pattern[];
}

@Injectable({
  providedIn: 'root'
})
export class RavelryService {
  readonly ravelryBaseUrl = 'https://api.ravelry.com/';
  readonly httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    //TODO: way to hide this
    'Authorization': 'Basic ' + btoa('206c16d1b8ceec8a74b77dcb783ab01c:kTzrxxXd7xWMF3iY9Q0FDJawdOpCsQDLMu4HIPiZ')
  });

  constructor(
    private http: HttpClient
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
        toArray()
      )
  }

  fetchPatternCategories(): Observable<Category[]> {
    return of(CATEGORIES);
  }

  searchForPatterns(searchParams): Observable<Pattern[]> {
    let params = new HttpParams();
    params = params.append('craft', searchParams.craft);
    //TODO: ravelry service accepts needle size of the exactly specified format, handle ints
    params = params.append(searchParams.craft === CraftType.CROCHET ? 'hooks' : 'needles', searchParams.needleSize);
    params = params.append('pc', searchParams.category);
    params = params.append('availability', searchParams.isFree ? 'free' : '');

    return this.http
      .get<Patterns>(`${this.ravelryBaseUrl}patterns/search.json`, {
        headers: this.httpHeaders,
        params: params
      })
      .pipe(
        map(response => {
          return response.patterns
        })
      )
  }

  private getPopularSizes(size: number): boolean {
    return size > 2 && size < 7
  }
}
