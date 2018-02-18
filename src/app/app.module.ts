import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TreeRootComponent } from './tree-root/tree-root.component';
import { TreeModule } from 'angular-tree-component';


@NgModule({
  declarations: [
    AppComponent,
    TreeRootComponent
  ],
  imports: [
    BrowserModule,
    TreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
