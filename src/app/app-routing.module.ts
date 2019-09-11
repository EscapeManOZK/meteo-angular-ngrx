import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/layout/home/home.component';
import { NotFoundComponent } from './component/layout/not-found/not-found.component';
import { ContactComponent } from './component/Pages/contact/contact.component';
import { MeteoDetailComponent } from './component/Pages/meteo-detail/meteo-detail.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'meteo/:id', component: MeteoDetailComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
