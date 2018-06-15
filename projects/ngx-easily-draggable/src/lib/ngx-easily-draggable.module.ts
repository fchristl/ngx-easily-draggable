import { NgModule } from '@angular/core';
import {NgxEasilyDraggableDirective} from './ngx-easily-draggable.directive';
import {NgxEasilyDroppableDirective} from './ngx-easily-droppable.directive';
import {NgxEasilyDraggableService} from './ngx-easily-draggable.service';



@NgModule({
  imports: [
  ],
  declarations: [NgxEasilyDraggableDirective, NgxEasilyDroppableDirective],
  exports: [NgxEasilyDraggableDirective, NgxEasilyDroppableDirective],
  providers: [NgxEasilyDraggableService]
})
export class NgxEasilyDraggableModule { }
