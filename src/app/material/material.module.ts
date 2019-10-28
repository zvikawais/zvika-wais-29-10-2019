import { NgModule } from '@angular/core';
import {
  MatSnackBarModule, MatButtonModule, MatAutocompleteModule, MatFormFieldModule,
  MatInputModule, MatIconModule, MatCardModule
} from '@angular/material';

@NgModule({
  exports: [
    MatSnackBarModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule
  ]
})
export class MaterialModule { }
