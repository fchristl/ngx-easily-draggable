import {Directive, ElementRef, HostListener} from '@angular/core';
import {NgxEasilyDraggableService} from "./ngx-easily-draggable.service";

@Directive({
  selector: '[ngxEasilyDraggable]'
})
export class NgxEasilyDraggableDirective {

  constructor(private elementRef: ElementRef,
              private service: NgxEasilyDraggableService) {
    this.elementRef.nativeElement.draggable = 'true';
  }

  @HostListener('dragstart') private dragStart() {
    this.service.draggedElement = this.elementRef;
  }
}
