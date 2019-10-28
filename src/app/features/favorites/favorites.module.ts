import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';



@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    SharedModule,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
