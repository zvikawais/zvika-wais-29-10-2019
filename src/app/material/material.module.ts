import { NgModule } from '@angular/core';
import {
  MatSnackBarModule, MatButtonModule, MatAutocompleteModule, MatFormFieldModule,
  MatInputModule, MatIconModule, MatCardModule, MatTooltipModule, MatSlideToggleModule,
  MatToolbarModule, MatProgressBarModule, MatRippleModule
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
    MatSlideToggleModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatRippleModule
  ]
})
export class MaterialModule { }
