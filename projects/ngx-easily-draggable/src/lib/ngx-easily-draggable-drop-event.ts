import {NgxEasilyDraggableElement} from './ngx-easily-draggable-element';

/**
 * Represents a drop event, emitted by (dropped)
 */
export interface NgxEasilyDraggableDropEvent {
  /**
   * The element that was dragged on another element
   */
  draggedElement: NgxEasilyDraggableElement;

  /**
   * The element that another element was dropped on
   */
  droppedOn: NgxEasilyDraggableElement;
}
