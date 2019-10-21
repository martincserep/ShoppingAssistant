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

  editItem(item: Item, newAmount: number) {
    this.list.find(oldItem => {
      if (oldItem === item) {
        oldItem.amount = parseFloat(newAmount);
      }
    });
  }


  deleteItem(deletedItem: Item) {
    this.list.filter(item => item !== deletedItem);
    console.log(this.list);
    this.listUpdated.next(this.list);
  }

  findItemInList(item: Item): boolean {
    let returnValue = false;
    this.list.forEach(currentItem => {
      if (currentItem.name === item.name) {
        returnValue = true;
      }
    });
    return returnValue;
  }

addItemToList(item: Item) {
    this.list.find(itemName => {
      if (itemName.name === item.name) {
        const oldAmount: number = parseFloat(itemName.amount);
        const newAmount: number = parseFloat(item.amount);
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
