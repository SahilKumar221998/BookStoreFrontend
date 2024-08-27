import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/Services/Books/books.service';
import { CartService } from 'src/app/Services/cart/cart.service';
import { SharedService } from 'src/app/Services/shared/shared.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isClicked: boolean = false;
  userName: string | null = null;
  books: any[] = [];
  cartCount: number = 0;
  searchQuery: string = '';
  filteredBooks: any[] = [];
  constructor(
    private router: Router,
    private booksService: BooksService,
    private sharedService: SharedService,
    private cartService: CartService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchBooks();
    this.extractUserName();
    this.sharedService.loginStatus$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.fetchBooks();
      }
    });
    this.fetchCartCount();
  }

  toggleClick(): void {
    this.isClicked = !this.isClicked;
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }

  fetchBooks(): void {
    if (localStorage.getItem('token') != null) {
      this.booksService.getAllBooks().subscribe(
        (response: any) => {
          if (response && Array.isArray(response.data)) {
            this.books = response.data.map((book: any) => ({
              id: book.bookId,
              image: book.bookImage, // Map bookImage to image
              title: book.bookName, // Map bookName to title
              author: book.authorName, // Map authorName to author
              rating: book.rating || 'N/A', // Provide a default value if rating is missing
              ratingCount: book.ratingCount || 0, // Provide a default value if ratingCount is missing
              price: book.price || 'N/A', // Provide a default value if price is missing
              originalPrice: book.originalPrice || 'N/A', // Provide a default value if originalPrice is missing
            }));
            this.filteredBooks = [...this.books];
          } else {
            console.error(
              'Expected an array in response.data but got:',
              response
            );
          }
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
    }
  }
  extractUserName(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.userName = decoded?.unique_name || 'User';
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
  }

  viewBookDetails(book: any): void {
    console.log(book);
    this.sharedService.updateSelectedBook(book);
    this.router.navigate(['/cart']);
  }

  fetchCartCount(): void {
    this.cartService.getCartById().subscribe(
      (response: any) => {
        if (response.success && Array.isArray(response.data)) {
          // Filter out items where isUnCarted or isOrdered is true
          const validItems = response.data.filter(
            (item: any) => !item.isOrdered && !item.isUnCarted
          );
          this.cartCount = validItems.length;
        } else {
          console.error('Unexpected response format:', response);
          this.cartCount = 0;
        }
      },
      (error) => {
        console.error('Error fetching cart count:', error);
      }
    );
  }
  openCart(): void {
    this.router.navigate(['/myCart']);
  }
  openOrder() {
    this.router.navigateByUrl('/order');
  }
  openWishList() {
    this.router.navigateByUrl('/wishlist');
  }
  filterBooks(): void {
    this.sharedService.updateSearchQuery(this.searchQuery);
  }
}
