import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TreeModule } from 'angular-tree-component';
<<<<<<< HEAD
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
=======
>>>>>>> origin/master


import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
<<<<<<< HEAD
import { StoryComponent } from './story/story.component';
=======
import { TreeRootComponent } from './tree-root/tree-root.component';
>>>>>>> origin/master


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
<<<<<<< HEAD
    StoryComponent
=======
    TreeRootComponent
>>>>>>> origin/master
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
<<<<<<< HEAD
    TreeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
=======
    TreeModule
>>>>>>> origin/master
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
