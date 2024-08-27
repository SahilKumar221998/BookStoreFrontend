import { MatSnackBar } from '@angular/material/snack-bar';
import { WishlistService } from './../../../Services/Wishlist/wishlist.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishlistItems: any[] = [];
  wishlistCount: number = 0;
  constructor(
    private wishlistService: WishlistService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist() {
    this.wishlistService.getWishList().subscribe((response: any) => {
      this.wishlistItems = response.data;
      this.wishlistCount = response.data.length;
    });
  }

  removeFromWishlist(wishlistId: number) {
    this.wishlistService.removeWishlistItem(wishlistId).subscribe(() => {
      this.snackBar.open('Item removed from wishlist successfully!', 'Close', {
        duration: 3000, // Duration the snackbar is shown (in milliseconds)
        verticalPosition: 'top', // Position of the snackbar on the screen
        horizontalPosition: 'center', // Position of the snackbar on the screen
      });
      this.getWishlist();
    });
  }
}
