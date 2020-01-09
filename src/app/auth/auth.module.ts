import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth.routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthPageComponent } from './auth-page/auth-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';


@NgModule({
  declarations: [RegisterPageComponent, AuthPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule { }
