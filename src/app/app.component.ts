import { Component } from '@angular/core';
import {NgxEasilyDraggableDropEvent} from "../../projects/ngx-easily-draggable/src/lib/ngx-easily-draggable-drop-event";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  entries = [
    {
      color: 'blue',
      id: 'blue'
    },
    {
      color: 'green',
      id: 'green'
    },
    {
      color: 'red',
      id: 'red'
    }
  ];
  dropped($event: NgxEasilyDraggableDropEvent) {
    const draggedElement = $event.draggedElement;
    const droppedOn = $event.droppedOn;

    const from = this.entries.findIndex(e => e.id === draggedElement.representing.id);
    const to = this.entries.findIndex(e => e.id === droppedOn.representing.id);
    const remove = this.entries.splice(from, 1)[0];
    this.entries.splice(to, 0, remove);
  }
}
