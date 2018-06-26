import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  LoginComponent
} from './core/components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
//   {
//     path: 'dashboard',
//     component: LoginComponent,
//     canActivate: [AuthGuard]
//   }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
