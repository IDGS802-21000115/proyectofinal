import { TestBed } from '@angular/core/testing';

import { PedidocService } from './pedidoc.service';

describe('PedidocService', () => {
  let service: PedidocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
