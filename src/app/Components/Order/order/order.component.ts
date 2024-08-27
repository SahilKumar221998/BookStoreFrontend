import { Router } from '@angular/router';
import { OrderService } from './../../../Services/Order/order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  orders: any[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.getOrderData();
  }

  getOrderData() {
    this.orderService.getOrder().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.orders = response.data.map((order: any) => {
            const date = new Date(order.orderDate);
            const options = { month: 'long', day: 'numeric' } as const;
            const formattedDate = date.toLocaleDateString('en-US', options);

            return {
              bookImage: order.BookImage,
              bookTitle: order.BookName,
              bookAuthor: order.AuthorName,
              bookPrice: order.Price,
              orderDate: formattedDate,
              address: `${order.Address}, ${order.City}, ${order.State}`,
            };
          });
        }
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  continue() {
    this.router.navigateByUrl('/dashboard');
  }
}
