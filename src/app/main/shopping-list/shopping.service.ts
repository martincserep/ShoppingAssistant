import { Injectable, IterableDiffers } from '@angular/core';
import { Item } from './item.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {


  private list: Item[] = [
    new Item('Apples', 5),
    new Item('Tomatoes', 10),
  ];


  private listUpdated = new Subject<Item[]>();

  getList() {
    return [...this.list];
  }

  addItem(item: Item) {
    if (this.findItemInList) {
      this.addItemInList(item);
    } else {
      this.list.push(item);
      this.listUpdated.next(this.list);
    }
  }

  deleteItem() {

  }

  findItemInList(item: Item) {
    this.list.find(itemName => {
      if (itemName.name === item.name) {
        return true;
      } else {
        return false;
      }
    });
  }

  addItemToList(item: Item) {
    this.list.find(itemName => {
      if (itemName.name === item.name) {
        const oldAmount: number = parseFloat(itemName.amount);
        const newAmount: number = parseFloat(item.amount);
        itemName.amount = oldAmount + newAmount;
      }
    });
  }

  clearList() {
    this.list = [];
    this.listUpdated.next(this.list);
  }

  getListUpdateListener() {
    return this.listUpdated.asObservable();
  }

  constructor() { }

}
