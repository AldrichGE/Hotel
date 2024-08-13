import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewReserveComponent } from './new-reserve/new-reserve.component';
import { MyReservesComponent } from './my-reserves/my-reserves.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { NewServiceComponent } from './new-service/new-service.component';
import { ReserveFormComponent } from './reserve-form/reserve-form.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'newReserve', component: NewReserveComponent},
  {path: 'myReserve', component: MyReservesComponent},
  {path: 'newRoom', component: NewRoomComponent},
  {path: 'newService', component: NewServiceComponent},
  {path: 'reserveForm', component: ReserveFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
