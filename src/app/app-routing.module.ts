import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/login/login.component';
import { SignupComponent } from './Components/Signup/signup/signup.component';
import { DashboardComponent } from './Components/Dashboard/dashboard/dashboard.component';
import { CartComponent } from './Components/Cart/cart/cart.component';
import { MyCartComponent } from './Components/MyCart/my-cart/my-cart.component';
import { OrderConfirmationComponent } from './Components/OrderConfirmation/order-confirmation/order-confirmation.component';
import { OrderComponent } from './Components/Order/order/order.component';
import { WishlistComponent } from './Components/Wishlist/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cart', component: CartComponent },
  { path: 'myCart', component: MyCartComponent },
  { path: 'orderConfirmation', component: OrderConfirmationComponent },
  { path: 'order', component: OrderComponent },
  { path: 'wishlist', component: WishlistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
