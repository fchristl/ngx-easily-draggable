import {Directive, ElementRef, EventEmitter, Host, HostListener, Input, Output} from '@angular/core';
import {NgxEasilyDraggableService} from './ngx-easily-draggable.service';
import {NgxEasilyDraggableElement} from './ngx-easily-draggable-element';
import {NgxEasilyDraggableDropEvent} from './ngx-easily-draggable-drop-event';

/**
 * Directive that allows other elements to be dropped on a DOM element.
 */
@Directive({selector: '[ngxEasilyDroppable]'})
export class NgxEasilyDroppableDirective {

  /**
   * Fire the (dropped) event already when another element is dragged over this one? Defaults to false.
   */
  @Input() fireDropEventOnDragOver = false;
  @Input() set dropEffect(value) {
    if (value === 'none' && this.fireDropEventOnDragOver) {
      console.warn('NgxEasilyDraggable: If you have a "none" drop effect combined with "fireDropEventonDragOver", drag and drop will not work. Please' +
                    'either pick another drop effect or disable "fireDropEventOnDragOver"');
    }
  }

  /**
   * Entity that's represented by the DOM element. Will be passed to (dropped) event listeners as
   * NgxEasilyDraggableDropElement.droppedOn.representing.
   */
  @Input() representing: any = null;

  /**
   * Event that's fired when another element has been dropped on this one.
   */
  @Output() dropped = new EventEmitter<NgxEasilyDraggableDropEvent>();


  constructor(private servive: NgxEasilyDraggableService, private elementRef: ElementRef) {
  }

  @HostListener('dragover', ['$event']) private dragOver(event: DragEvent) {
    event.preventDefault();
    if (this.fireDropEventOnDragOver) {
      this.fire(this.servive.draggedElement, {
        elementRef: this.elementRef,
        representing: this.representing
      });
    }
  }

  @HostListener('drop', ['$event']) private drop(event: DragEvent) {
    this.fire(this.servive.draggedElement, {
      elementRef: this.elementRef,
      representing: this.representing
    });
  }

  private fire(draggedElement: NgxEasilyDraggableElement, droppedOn: NgxEasilyDraggableElement) {
    this.dropped.emit({draggedElement, droppedOn});
  }
}
