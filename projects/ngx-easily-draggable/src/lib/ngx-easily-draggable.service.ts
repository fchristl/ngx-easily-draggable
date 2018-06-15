import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxEasilyDraggableService {

  draggedElement = null;

  constructor() { }
}
