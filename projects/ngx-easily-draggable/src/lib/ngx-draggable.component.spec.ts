import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDraggableComponent } from './ngx-easily-draggable.component';

describe('NgxDraggableComponent', () => {
  let component: NgxDraggableComponent;
  let fixture: ComponentFixture<NgxDraggableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDraggableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDraggableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
