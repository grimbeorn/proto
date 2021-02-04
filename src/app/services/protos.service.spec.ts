import { TestBed } from '@angular/core/testing';

import { ProtosService } from './protos.service';

describe('ProtosService', () => {
  let service: ProtosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
