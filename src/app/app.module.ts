import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NewReserveComponent } from './new-reserve/new-reserve.component';
import { MyReservesComponent } from './my-reserves/my-reserves.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { NewServiceComponent } from './new-service/new-service.component';


@NgModule({
  declarations: [
    AppComponent,
    NewReserveComponent,
    MyReservesComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    NewRoomComponent,
    NewServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
