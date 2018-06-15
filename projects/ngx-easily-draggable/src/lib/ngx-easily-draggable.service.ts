import { Injectable } from '@angular/core';
import {NgxEasilyDraggableElement} from "./ngx-easily-draggable-element";

@Injectable({
  providedIn: 'root'
})
export class NgxEasilyDraggableService {

  draggedElement?: NgxEasilyDraggableElement = null;

  constructor() { }
}
