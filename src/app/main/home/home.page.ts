import { Component, OnInit } from '@angular/core';
import { CartItem } from './cart-item.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  enteredName = '';
  enteredPrice: number;

  totalPrice = 0;

  list: CartItem[] = [
    new CartItem('Bread', 250),
    new CartItem('Coca-Cola', 250)
  ];


  getPrice() {
    this.totalPrice = 0;
    for (const item of this.list) {
      this.totalPrice += item.amount;
    }
  }

  clearInputFields() {
    this.enteredName = '';
    this.enteredPrice = null;
  }

  addItem() {
    this.list.push(new CartItem(this.enteredName, this.enteredPrice));
    this.clearInputFields();
    this.getPrice();
  }

  constructor() {}

  ngOnInit() {
    this.getPrice();
  }

}
