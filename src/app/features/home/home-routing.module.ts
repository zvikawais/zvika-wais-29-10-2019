import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home/home.component';


const routes: Routes = [
    {
        path: '',
        data: { state: 'home' },
        component: HomeComponent,
    },
    {
        path: ':id',
        data: { state: 'home' },
        component: HomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }

