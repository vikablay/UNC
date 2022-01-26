import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSnackBarModule} from "@angular/material/snack-bar";

const MaterialComponents = [
  MatSnackBarModule
];

@NgModule({
  declarations: [],
  imports: [
    MaterialComponents,
    CommonModule
  ],
  exports: [MaterialComponents]
})
export class MaterialModule {
}
