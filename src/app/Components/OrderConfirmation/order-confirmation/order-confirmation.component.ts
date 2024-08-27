import { OrderService } from './../../../Services/Order/order.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
})
export class OrderConfirmationComponent implements OnInit {
  orderId: number | undefined;
  address: string | undefined;

  constructor(private router: Router, private orderService: OrderService) {}
  continue() {
    this.router.navigateByUrl('/dashboard');
  }

  ngOnInit() {
    this.orderService.getOrder().subscribe((response) => {
      if (response && response.data && response.data.length > 0) {
        const order = response.data[0];
        this.orderId = order.orderId;
        this.address = order.Address + ',' + order.City + ',' + order.State;
      }
    });
  }
}
