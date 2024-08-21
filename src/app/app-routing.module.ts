import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewReserveComponent } from './new-reserve/new-reserve.component';
import { MyReservesComponent } from './my-reserves/my-reserves.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { ReserveFormComponent } from './reserve-form/reserve-form.component';
import { NewHospitalityComponent } from './new-hospitality/new-hospitality.component';
import { AuthGuard } from './services/auth/guard/auth.guard';
import { RoleGuard } from './services/auth/guard/role.guard';
import { NewConvenienceComponent } from './new-convenience/new-convenience.component';
import { UpdateUsersComponent } from './update-users/update-users.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: 'newReserve', component: NewReserveComponent, canActivate: [AuthGuard] },
  { path: 'myReserve', component: MyReservesComponent, canActivate: [AuthGuard] },
  { path: 'newRoom', component: NewRoomComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['ADMINISTRATOR', 'EMPLOYEE']} },
  { path: 'newHospitality', component: NewHospitalityComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['ADMINISTRATOR', 'EMPLOYEE']} },
  { path: 'newConvenience', component: NewConvenienceComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['ADMINISTRATOR', 'EMPLOYEE']} },
  { path: 'updtUser', component: UpdateUsersComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['ADMINISTRATOR']} },
  { path: 'reserveForm', component: ReserveFormComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
