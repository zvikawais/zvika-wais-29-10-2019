import { NgModule } from '@angular/core';
import {
  MatSnackBarModule, MatButtonModule, MatAutocompleteModule, MatFormFieldModule,
  MatInputModule, MatIconModule, MatCardModule, MatTooltipModule, MatSlideToggleModule
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
    MatTooltipModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }
