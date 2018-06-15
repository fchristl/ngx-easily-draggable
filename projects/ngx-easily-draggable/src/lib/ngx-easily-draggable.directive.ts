import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {NgxEasilyDraggableService} from './ngx-easily-draggable.service';

/**
 * Directive that makes a DOM element draggable.
 */
@Directive({
  selector: '[ngxEasilyDraggable]'
})
export class NgxEasilyDraggableDirective {

  /**
   * Enable the drag image ("ghost") generated by the browser? Defaults to true. If set to false, does not render any drag image.
   */
  @Input() enableDragImage = true;

  /**
   * Entity that's represented by the DOM element. Will be passed to (dropped) event listeners as
   * NgxEasilyDraggableDropElement.draggedElement.representing.
   */
  @Input() representing: any = null;

  /**
   * How is the visual feedback supposed to look like that represents this operation?
   * @type {"move"}
   */
  @Input() dropEffect: 'copy' | 'move' | 'link' | 'none' = 'none';

  constructor(private elementRef: ElementRef,
              private service: NgxEasilyDraggableService) {
    this.elementRef.nativeElement.draggable = 'true';
  }

  @HostListener('dragstart', ['$event'])
  private dragStart(event: DragEvent) {
    this.service.draggedElement = {
      elementRef: this.elementRef,
      representing: this.representing
    };
    if (!this.enableDragImage) {
      const dragImage = document.createElement('img');
      dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      event.dataTransfer.setDragImage(dragImage, 0, 0);
    }
    event.dataTransfer.effectAllowed = this.dropEffect;
  }
}
