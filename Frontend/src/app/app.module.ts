import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {Routes, RouterModule} from "@angular/router";

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './home.component';
import {AboutComponent} from './about.component';
import {NotFoundComponent} from './not-found.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
