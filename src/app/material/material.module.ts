import { NgModule } from '@angular/core';
import {
  MatSnackBarModule, MatButtonModule, MatAutocompleteModule, MatFormFieldModule,
  MatInputModule, MatIconModule, MatCardModule, MatTooltipModule
} from '@angular/material';

@NgModule({
  exports: [
    MatSnackBarModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }
