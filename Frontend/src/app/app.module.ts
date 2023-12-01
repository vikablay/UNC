import {ClassProvider, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import {AppComponent} from "./app.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AboutComponent} from './about/about.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from './login/login.component';
import {BooksComponent} from './books/books.component';
import {CookieService} from 'ngx-cookie-service';
import {AddbookComponent} from './addbook/addbook.component';
import {DetailsComponent} from './details/details.component';
import {RegistrationComponent} from './registration/registration.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {MaterialModule} from "./material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AccountComponent} from './account/account.component';
import {StarComponent} from './star/star.component';
import {LoggingInterceptorService} from "./logging-interceptor.service";
import { UserComponent } from './user/user.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";

const LOGGING_INTERCEPTOR_PROVIDER: ClassProvider = {
    provide: HTTP_INTERCEPTORS ,
    useClass: LoggingInterceptorService,
    multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent,
    LoginComponent,
    BooksComponent,
    AddbookComponent,
    DetailsComponent,
    AddbookComponent,
    RegistrationComponent,
    AccountComponent,
    StarComponent,
    UserComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        NgSelectModule,
        MaterialModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatButtonModule
    ],
  providers: [
      CookieService,
      LOGGING_INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
