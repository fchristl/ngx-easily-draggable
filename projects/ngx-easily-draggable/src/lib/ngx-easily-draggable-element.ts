import {ElementRef} from '@angular/core';

/**
 * Represents an element that can be dragged or that another element can be dropped on.
 */
export interface NgxEasilyDraggableElement {
  /**
   * The actual DOM element that was dragged
   */
  elementRef: ElementRef;

  /**
   * The entity that is represented by the DOM element and that was handed over as [representing] in ngxEasilyDraggable or
   * ngxEasilyDroppable.
   */
  representing: any;
}
