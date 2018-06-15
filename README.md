# ngx-easily-draggable

ngx-easily-draggable is a small library that makes developing drag-and-drop components in Angular painless.

## Installation

In your Angular project, run `npm install ngx-easily-draggable --save` and import the `NgxEasilyDraggableModule`
into your `AppModule`:

```typescript
import { NgxEasilyDraggableModule } from 'ngx-easily-draggable';
// ...
  imports: [
    NgxEasilyDraggableModule,
    // ...
  ],
``` 
    

## Usage

This library knows two kinds of elements: 

1. draggable elements (that have an `ngxEasilyDraggable` directive set) and
2. elements that draggable elements can be dropped on (that have an `ngxEasilyDroppable` directive set).

### Elements Representing Entities

Let's assume you build up a UI dynamically based on an array. You iterate over that array
using `*ngFor`. For each element of the array, you generate a `div` element. You now want to allow re-ordering
the array elements by drag and drop.

For cases like that, it's highly useful to know which original array element the user wanted to drag/drop rather
than just knowing which `div`. 

To support cases like that, ngx-easily-draggable uses so called **representing entities**. 

A representing entity can be any object (e.g. an element from your array). It can be set using the `representing` attribute. When a drop
event occurs, this representing entity will be passed along to the event listeners.

Like this, you don't need to painfully find the underlying array element which belongs to a `div` that was dragged.
Instead, you just get the element delivered in your drop event right away.

For example:

**test.component.ts**

    @Component()
    export class TestComponent {
        colors = ['red', 'blue', 'yellow'];
        
        dropped($event: NgxEasilyDraggableDropEvent) {
            console.log(`${event.draggedElement.representing} dragged on ${event.droppedOn.representing}`);
        }
    }
    
**test.component.html**

    <div *ngFor="let color of colors"
        ngxEasilyDraggable
        [representing]="color">
    </div>
    
    <div ngxEasilyDroppable
        [representing]="'dropzone'"
        (dropped)="dropped($event)">
    </div>
    
In this case, the draggable elements are representing one color each. The `ngxEasilyDroppable` element
represents a drop zone.

### Dual Elements Can Be Dragged and Dropped On

An element can both have an `ngxEasilyDraggable` and an `ngxEasilyDroppable` directive set. Like that, 
the element can be dragged itself and other elements can be dropped on it.

This is especially helpful to have lists that you want to re-order using drag and drop.

### API

#### `ngxEasilyDraggable`

| name           | type             | description
|----------------|------------------|------------------
| \[representing\] | input (any)           | which entity does this element represent? (see above)
| \[enableDragImage\] | input (boolean) | when dragging, should a drag/ghost image be displayed? default: true
| \[dropEffect\] | input ('copy' \| 'move' \| 'link' \| 'none') | sets the [drop effect](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/dropEffect) for when this element is dragged

### `ngxEasilyDroppable`

| name           | type             | description
|----------------|------------------|------------------
| \[representing\] | input (any)           | which entity does this element represent? (see above)
| \[fireDropEventOnDragOver\] | input (boolean)           | should the drop event already be fired when a draggable element is just dragged over (and not yet dropped over) this element? Useful for live-reordering lists to display the changes immediately rather than only after dropping. default: false   
| \(dropped\) | output (emits `NgxEasilyDraggableDropEvent`)           | fired when a drop event happend (either an actual drop or, if `fireDropEventOnDragOver` is set to `true`, a drag over event).

### `NgxEasilyDraggableDropEvent`
An object that's passed to event listeners that subscribe to the `(dropped)` event. Contains two properties:

* `draggedElement: NgxEasilyDraggableElement`: Represents the element that was dragged on the other element.
* `droppedElement: NgxEasilyDraggableElement`: Represents the element that another element was dragged on to.


### `NgxEasilyDraggableElement`
Represents an element that was either dragged or that another element was dropped on to (see above).

Properties:

* `elementRef`: The Angular `ElementRef` referencing the DOM element that was dragged/dropped on to.
* `representing`: The entity set as `[representing]` on the original DOM element. 

## Examples

### Building a List That can Be Re-Ordered

In this example, we'll build a list of colored DIVs that can be re-ordered by drag and drop.

**app.component.ts**

```typescript
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
```

**app.component.html**
```typescript
<ng-container *ngFor="let entry of entries">
  <div ngxEasilyDraggable ngxEasilyDroppable
       [representing]="entry"
       [enableDragImage]="false"
       [dropEffect]="'none'"
       style="width: 200px; height: 200px" [fireDropEventOnDragOver]="true"
       (dropped)="dropped($event)"
       [ngStyle]="{'background': entry.color}">

  </div>
</ng-container>
```

* Each div is both an `ngxEasilyDraggable` and an `ngxEasilyDroppable`, which means any div can be dragged
  and dropped on any other div.
* Each div represents one color that's set using the `[representing]` attribute.
* The drag/ghost image is disabled using `[enableDragImage]="false"`, and no drop effect is displayed 
  (`[dropEffect]="'none'"`)
* `[fireDropEventOnDragOver]="true"` enables live re-ordering as the user drags a div over other divs. If 
  it was set to false, the user would have to drop a div before the list would re-order.
* The `dropped` function, assigned as an event listener to `(dropped)` events, first finds out which element
  was dragged (`draggedElement`) and which other element it was dragged on to (`droppedOn`). It then checks
  which position the represented values have in the `entries` array at the moment and re-oders the array
  accordingly.
