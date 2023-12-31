import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
