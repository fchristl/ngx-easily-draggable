import { TestBed, inject } from '@angular/core/testing';

import { NgxEasilyDraggableService } from './ngx-easily-draggable.service';

describe('NgxEasilyDraggableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxEasilyDraggableService]
    });
  });

  it('should be created', inject([NgxEasilyDraggableService], (service: NgxEasilyDraggableService) => {
    expect(service).toBeTruthy();
  }));
});
