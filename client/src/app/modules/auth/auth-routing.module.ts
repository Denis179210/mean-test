import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthComponent } from './auth.component';


const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full'},
      {path: 'signin', component: SignInComponent},
      {path: 'signup', component: SignUpComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
