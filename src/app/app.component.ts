import { Component } from '@angular/core';

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
  dropped($event) {
    const draggedElement = $event.draggedElement;
    const droppedOn = $event.droppedOn;
    const from = this.entries.findIndex(e => e.id === draggedElement.nativeElement.id);
    const to = this.entries.findIndex(e => e.id === droppedOn.nativeElement.id);
    const remove = this.entries.splice(from, 1)[0];
    this.entries.splice(to, 0, remove);
  }
}
