import { TestBed } from '@angular/core/testing';
import { RavelryService } from './ravelry.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CraftType } from '../models/craftType.enum';
import { of } from 'rxjs';

describe('RavelryService', () => {
  let service: RavelryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RavelryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should fetch needle sizes', () => {
    const testData = [
      {
        hook: '1',
        id: 1,
        metric: 1,
        us: '1',
      },
      {
        hook: '2',
        id: 2,
        metric: 2,
        us: '2',
      }
    ];
    service.fetchNeedlesSizes(CraftType.CROCHET)
      .subscribe(data => {
        expect(data).toBe(testData)
      }
      );
    const req = httpTestingController.expectOne('https://api.ravelry.com/needles/sizes.json?craft=crochet');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });

  it('should fetch patterns', () => {
    const searchParams = {
      craft: CraftType.CROCHET,
      needleSize: '5',
      category: 'hat',
      isFree: true
    }
    service.searchForPatterns(searchParams)
      .subscribe();
    const req = httpTestingController.expectOne('https://api.ravelry.com/patterns/search.json?craft=crochet&hooks=5mm&pc=hat&availability=free');
    expect(req.request.method).toEqual('GET');
    req.flush(of(true));
    httpTestingController.verify();
  });
});
