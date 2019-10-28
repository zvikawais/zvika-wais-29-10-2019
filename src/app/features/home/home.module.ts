import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from './services/home.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  providers: [HomeService]
})
export class HomeModule { }
