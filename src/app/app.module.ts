import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NewReserveComponent } from './new-reserve/new-reserve.component';
import { MyReservesComponent } from './my-reserves/my-reserves.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { ReserveFormComponent } from './reserve-form/reserve-form.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { ReserveDataComponent } from './reserve-data/reserve-data.component';
import { AuthInterceptor } from './services/auth/auth-interceptor.service';
import { NewHospitalityComponent } from './new-hospitality/new-hospitality.component';
import { AuthGuard } from './services/auth/guard/auth.guard';
import { RoleGuard } from './services/auth/guard/role.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NewConvenienceComponent } from './new-convenience/new-convenience.component';
import { UpdateUsersComponent } from './update-users/update-users.component';


@NgModule({
  declarations: [
    AppComponent,
    NewReserveComponent,
    MyReservesComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    NewRoomComponent,
    ReserveFormComponent,
    ReserveDataComponent,
    NewHospitalityComponent,
    NewConvenienceComponent,
    UpdateUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
