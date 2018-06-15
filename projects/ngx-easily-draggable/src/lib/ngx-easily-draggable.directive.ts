import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {NgxEasilyDraggableService} from "./ngx-easily-draggable.service";

@Directive({
  selector: '[ngxEasilyDraggable]'
})
export class NgxEasilyDraggableDirective {

  @Input() enableDragImage = true;

  constructor(private elementRef: ElementRef,
              private service: NgxEasilyDraggableService) {
    this.elementRef.nativeElement.draggable = 'true';
  }

  @HostListener('dragstart', ['$event']) private dragStart(event: DragEvent) {
    this.service.draggedElement = this.elementRef;
    if (!this.enableDragImage) {
      const dragImage = new Image();
      dragImage.style.display = 'none';
      event.dataTransfer.setDragImage(dragImage, 0, 0);
    }
  }
}
