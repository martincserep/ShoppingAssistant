import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Subject } from 'rxjs';
// import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { Item } from './item.model';
// import { AuthService } from '../../auth/auth.service';
// import { ItemData } from './itemData.model';
// import { constructor } from 'stream';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private list: Item[] = [];
  private listUpdated = new Subject<Item[]>();

  getList() {
    return [...this.list];
  }


  addItem(newItem: Item) {
    const item = new Item(
      newItem.name,
      newItem.amount
    );
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
  }


  deleteItem(deletedItem: Item) {
    // this.list.forEach(itemName => {
      // if (deletedItem.name === itemName.name) {
        const index = this.list.indexOf(deletedItem);
        this.list.splice(index, 1);
        this.listUpdated.next(this.list);
      // }
    // });
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
        if (item.name === itemName.name) {
          const oldAmountString: string = itemName.amount.toString();
          const newAmountString: string = item.amount.toString();
          const oldAmount: number = parseFloat(oldAmountString);
          const newAmount: number = parseFloat(newAmountString);
          itemName.amount = (oldAmount + newAmount);
        }

      }
  );
}


  clearList() {
    this.list = [];
    this.listUpdated.next(this.list);
  }

  getListUpdateListener() {
    return this.listUpdated.asObservable();
  }

constructor(private http: HttpClient) { }

}
