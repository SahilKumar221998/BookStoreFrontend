import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Components/Signup/signup/signup.component';
import { LoginComponent } from './Components/Login/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './Components/Dashboard/dashboard/dashboard.component'; 
import { MatMenuModule } from '@angular/material/menu';
import { CartComponent } from './Components/Cart/cart/cart.component';
import { MyCartComponent } from './Components/MyCart/my-cart/my-cart.component';
import { FormsModule } from '@angular/forms';
import { OrderConfirmationComponent } from './Components/OrderConfirmation/order-confirmation/order-confirmation.component';
import { MatTableModule } from '@angular/material/table';
import { OrderComponent } from './Components/Order/order/order.component';
import { HeaderComponent } from './Components/BookHeader/header/header.component';
import { WishlistComponent } from './Components/Wishlist/wishlist/wishlist.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    CartComponent,
    MyCartComponent,
    OrderConfirmationComponent,
    OrderComponent,
    HeaderComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatMenuModule,
    FormsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
