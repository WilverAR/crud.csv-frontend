import { Routes } from '@angular/router';
import {HomeComponent} from "./resale/pages/home/home.component";
import {NotFoundComponent} from "./shared/pages/not-found/not-found.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path:'**', component: NotFoundComponent }
];
