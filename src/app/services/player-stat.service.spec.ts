import { TestBed } from '@angular/core/testing';

import { PlayerStatService } from './player-stat.service';

describe('PlayerStatService', () => {
  let service: PlayerStatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerStatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
