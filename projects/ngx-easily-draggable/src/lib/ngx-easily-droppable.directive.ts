import {Directive, ElementRef, EventEmitter, Host, HostListener, Input, Output} from '@angular/core';
import {NgxEasilyDraggableService} from './ngx-easily-draggable.service';

@Directive({selector: '[ngxEasilyDroppable]'})
export class NgxEasilyDroppableDirective {

  @Input() fireOnDragOver = false;
  @Output() dropped = new EventEmitter<{draggedElement: any, droppedOn: any}>();

  constructor(private servive: NgxEasilyDraggableService, private elementRef: ElementRef) {
  }

  @HostListener('dragover', ['$event']) private dragOver(event) {
    event.preventDefault();
    if (this.fireOnDragOver) {
      this.fire(this.servive.draggedElement, this.elementRef);
    }
  }

  @HostListener('drop', ['$event']) private drop(event) {
    this.fire(this.servive.draggedElement, this.elementRef);
  }

  private fire(draggedElement: any, droppedOn: any) {
    this.dropped.emit({draggedElement, droppedOn});
  }
}
