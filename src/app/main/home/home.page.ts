import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from './cart-item.model';
import { CartService } from './cart.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Item } from '../shopping-list/item.model';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  enteredName = '';
  enteredPrice: number;

  totalPrice = 0;
  private priceSub: Subscription;

  list: CartItem[];

  private cartListSub: Subscription;


  clearInputFields() {
    this.enteredName = '';
    this.enteredPrice = null;
  }

  deleteItem(item: Item) {
    this.cartService.deleteItem(item);
    this.totalPrice =  this.cartService.getPrice();
  }

  addItem() {
    if ( this.enteredName.length <= 0 || this.enteredPrice <= 0 ) {
      this.commonService.invalidInput();
      this.clearInputFields();
      return;
    } else {
      this.cartService.addItem(new CartItem(this.enteredName, this.enteredPrice));
      this.clearInputFields();
    }
  }

  constructor(private cartService: CartService, private commonService: CommonService) {}


  clearList() {
    this.commonService.clearList('home');
  }

  priceToZero() {
    this.totalPrice = 0;
  }

  ngOnInit() {
    this.list = this.cartService.getCartList();
    this.cartListSub = this.cartService.getListUpdateListener()
      .subscribe(
        (items: Item[]) => {
          this.list = items;
        }
      );
    this.totalPrice = this.cartService.getPrice();
    this.priceSub = this.cartService.getTotalPriceUpdateListener()
        .subscribe(
          (price: number) => {
            this.totalPrice = price;
          }
      );
  }

  ngOnDestroy() {
    this.cartListSub.unsubscribe();
  }

}
