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

  list: CartItem[];

  private cartListSub: Subscription;


  clearInputFields() {
    this.enteredName = '';
    this.enteredPrice = null;
  }

  addItem() {
    if ( this.enteredName.length <= 0 || this.enteredPrice <= 0 ) {
      this.commonService.invalidInput();
      this.clearInputFields();
      return;
    } else {
      this.cartService.addItem(new CartItem(this.enteredName, this.enteredPrice));
      this.clearInputFields();
      this.totalPrice = this.cartService.getPrice();
    }
  }

  constructor(private cartService: CartService, private commonService: CommonService) {}


  clearList() {
    if (this.commonService.clearList('home')) {
      this.totalPrice = 0;
    }
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
  }

  ngOnDestroy() {
    this.cartListSub.unsubscribe();
  }

}
