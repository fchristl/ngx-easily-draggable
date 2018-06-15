import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxEasilyDraggableModule} from '../../projects/ngx-easily-draggable/src/lib/ngx-easily-draggable.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxEasilyDraggableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
