import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
    {path:'',redirectTo:'allEmployees',pathMatch:'full'},
    {path:'**',component:HomeComponent}
];
