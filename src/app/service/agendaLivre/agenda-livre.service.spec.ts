import { TestBed } from '@angular/core/testing';

import { AgendaLivreService } from './agenda-livre.service';

describe('AgendaLivreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgendaLivreService = TestBed.get(AgendaLivreService);
    expect(service).toBeTruthy();
  });
});
