import { Injectable } from '@angular/core';
import { CartItem } from './cart-item.model';
import { Subject } from 'rxjs';
import { Item } from '../shopping-list/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartList: CartItem[] = [];
  private cartListUpdated = new Subject<CartItem[]>();

  private totalPrice = 0;
  private totalPriceUpdated = new Subject<number>();

  getTotalPriceUpdateListener() {
    return this.totalPriceUpdated.asObservable();
  }

  getCartList() {
    return [...this.cartList];
  }

  getPrice() {
    this.totalPrice = 0;
    for (const item of this.cartList) {
      this.totalPrice += item.amount;
    }
    return this.totalPrice;
  }

  addItem(item: Item) {
    this.cartList.push(item);
    this.cartListUpdated.next(this.cartList);
    this.getPrice();
    this.totalPriceUpdated.next(this.totalPrice);
  }

  getListUpdateListener() {
    return this.cartListUpdated.asObservable();
  }

  clearList() {
    this.cartList = [];
    this.cartListUpdated.next(this.cartList);
    this.getPrice();
    this.totalPriceUpdated.next(this.totalPrice);
  }

  deleteItem(deletedItem: Item) {
        const index = this.cartList.indexOf(deletedItem);
        this.cartList.splice(index, 1);
        this.cartListUpdated.next(this.cartList);
        this.getPrice();
        this.totalPriceUpdated.next(this.totalPrice);
  }

  constructor() { }
}
