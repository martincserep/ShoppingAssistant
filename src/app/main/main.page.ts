import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './home/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy {

  constructor(private cartService: CartService) { }

  totalPrice = 0;
  private totalPriceSub: Subscription;

  ngOnInit() {
    this.totalPrice = this.cartService.getPrice();
    this.totalPriceSub = this.cartService.getTotalPriceUpdateListener()
    .subscribe((price) => {
      this.totalPrice = price;
    });

  }

  ngOnDestroy() {
    this.totalPriceSub.unsubscribe();
  }
}
