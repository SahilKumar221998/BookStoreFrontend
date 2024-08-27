import { WishlistService } from './../../../Services/Wishlist/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from './../../../Services/cart/cart.service';
import { Component } from '@angular/core';
import { SharedService } from 'src/app/Services/shared/shared.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  id: number | null = null;
  book: any;
  quantity: number = 1;
  showStepper: boolean = false;
  constructor(
    private sharedService: SharedService,
    private cartService: CartService,
    private matSnackBar: MatSnackBar,
    private wishlistService: WishlistService
  ) {}

  ngOnInit() {
    this.sharedService.selectedBook$.subscribe((book) => {
      this.book = book;
    });
  }

  toggleStepper(): void {
    this.showStepper = !this.showStepper;
  }

  changeQuantity(change: number): void {
    if (this.quantity + change > 0) {
      this.quantity += change;
    }
  }

  extractUserId(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.id = decoded.userId;
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
  }

  addToCart(): void {
    if (this.book && this.book.id) {
      this.extractUserId();
      const cartData = {
        userId: this.id,
        quantity: this.quantity,
        bookId: this.book.id,
      };
      this.cartService.addToCart(cartData).subscribe({
        next: (response) => {
          console.log('Cart added successfully:', response);
          this.matSnackBar.open('Cart Added Sucessfully', '', {
            duration: 3000,
          });
        },
        error: (error) => {
          console.error('Error adding to cart:', error);
          this.matSnackBar.open('Cart Added Sucessfully', '', {
            duration: 3000,
          });
        },
      });
    }
  }
  addToWishlist(): void {
    if (this.book && this.book.id) {
      const wishlistData = {
        bookId: this.book.id,
      };
      this.wishlistService.addToWishList(wishlistData).subscribe({
        next: (response) => {
          console.log('Added to wishlist successfully:', response);
          this.matSnackBar.open('Added to Wishlist Successfully', '', {
            duration: 3000,
          });
        },
        error: (error) => {
          console.error('Error adding to wishlist:', error);
          this.matSnackBar.open('Error adding to Wishlist', '', {
            duration: 3000,
          });
        },
      });
    }
  }
}
