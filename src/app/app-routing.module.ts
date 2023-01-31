import { UpdateBookComponent } from './components/update-book/update-book.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './components/add-book/add-book.component';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './components/login-page/login-page.component'; 

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path :'login', component:LoginPageComponent},
  {path:'add/new',component:AddBookComponent},
  {path:'book/update/:id',component:UpdateBookComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
