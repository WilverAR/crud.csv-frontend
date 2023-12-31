import { TestBed } from '@angular/core/testing';

import { HttpBaseService } from './http-base.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('HttpBaseService', () => {
  let service: HttpBaseService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(HttpBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
