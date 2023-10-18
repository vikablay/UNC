import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AboutComponent} from "./about/about.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LoginComponent} from "./login/login.component";
import {BooksComponent} from "./books/books.component";
import {AddbookComponent} from "./addbook/addbook.component";
import {DetailsComponent} from "./details/details.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AccountComponent} from "./account/account.component";

const routes: Routes = [
  {path: '', redirectTo: 'about', pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'books', component: BooksComponent},
  {path: 'addbook', component: AddbookComponent},
  {path: 'details/:bookName', component: DetailsComponent},
  {path: 'account', component: AccountComponent},

  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
