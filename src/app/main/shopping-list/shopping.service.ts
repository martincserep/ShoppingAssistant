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
    if (this.findItemInList(item)) {
      this.addItemToList(item);
    } else {
      this.list.push(item);
      this.listUpdated.next(this.list);
    }
  }

  deleteItem() {

  }

  findItemInList(item: Item): boolean {
    let returnValue = false;
    this.list.forEach(currentItem => {
      if (currentItem.name === item.name) {
        console.log('Fasza');
        returnValue = true;
      }
    });
    console.log('Nem');
    return returnValue;
  }

addItemToList(item: Item) {
    this.list.find(itemName => {
      if (itemName.name === item.name) {
        console.log(itemName.amount);
        const oldAmount: number = parseFloat(itemName.amount);
        const newAmount: number = parseFloat(item.amount);
        console.log(oldAmount);
        itemName.amount = oldAmount + newAmount;
      } else {
        // this.list.push(item);
        // this.listUpdated.next(this.list);
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
