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
    this.list.forEach(oldItem => {
      if (oldItem === item) {
        const amount: string = newAmount.toString();
        oldItem.amount = parseFloat(amount);
      }
    });
    // this.list.find(oldItem => {
    //   if (oldItem === item) {
    //     const amount: string = newAmount.toString();
    //     oldItem.amount = parseFloat(amount);
    //     return;
    //   }
    // });
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
  this.list.forEach(itemName => {
    if (itemName.name === item.name) {
        const oldAmountString: string = itemName.amount.toString();
        const newAmountString: string = item.amount.toString();
        const oldAmount: number = parseFloat(oldAmountString);
        const newAmount: number = parseFloat(newAmountString);
        itemName.amount = oldAmount + newAmount;
      } else {
        // this.list.push(item);
        // this.listUpdated.next(this.list);
      }
  });
    // this.list.find(itemName => {
    //   if (itemName.name === item.name) {
    //     const oldAmountString: string = itemName.amount.toString();
    //     const newAmountString: string = item.amount.toString();
    //     const oldAmount: number = parseFloat(oldAmountString);
    //     const newAmount: number = parseFloat(newAmountString);
    //     itemName.amount = oldAmount + newAmount;
    //   } else {
        // this.list.push(item);
        // this.listUpdated.next(this.list);
      // }
    // });
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
