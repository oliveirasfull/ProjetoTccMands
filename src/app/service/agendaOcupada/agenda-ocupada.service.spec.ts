import { TestBed } from '@angular/core/testing';

import { AgendaOcupadaService } from './agenda-ocupada.service';

describe('AgendaOcupadaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgendaOcupadaService = TestBed.get(AgendaOcupadaService);
    expect(service).toBeTruthy();
  });
});
