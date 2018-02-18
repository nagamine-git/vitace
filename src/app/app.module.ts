import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TreeModule } from 'angular-tree-component';


import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TreeRootComponent } from './tree-root/tree-root.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TreeRootComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    TreeModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
