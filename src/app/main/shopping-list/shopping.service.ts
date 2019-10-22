import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { Item } from './item.model';
import { AuthService } from '../../auth/auth.service';
import { ItemData } from './itemData.model';
import { constructor } from 'stream';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  // list: any;

//   constructor(private authService: AuthService, private http: HttpClient) {}

//   private _list = new BehaviorSubject<Item[]>([]);



//   get list() {
//     return this._list.asObservable();
//   }

// addItem(
//     name: string,
//     amount: number,
//   ) {
//     let fetchedUserId: string;
//     let newItem: Item;
//     return this.authService.userId.pipe(
//       take(1),
//       switchMap(userId => {
//         fetchedUserId = userId;
//         return this.authService.token;
//       }),
//       take(1),
//       switchMap(token => {
//         if (!fetchedUserId) {
//           throw new Error('No user found!');
//         }
//         newItem = new Item(
//           name,
//           amount,
//           fetchedUserId,
//         );
//         return this.http.post<{ name: string }>(
//           `https://shoppingassist-385d6.firebaseio.com/shipping-list.json?auth=${token}`,
//           {
//             ...newItem,
//             id: null
//           }
//         );
//       }),
//       switchMap(resData => {
//         return this.list;
//       }),
//       take(1),
//       tap(items => {
//         this._list.next(items.concat(newItem));
//       })
//     );
//   }

//   fetchItems() {
//     return this.authService.token.pipe(
//       take(1),
//       switchMap(token => {
//         return this.http.get<{ [key: string]: ItemData }>(
//           `https://shoppingassist-385d6.firebaseio.com/shipping-list.json?auth=${token}`
//         );
//       }),
//       map(resData => {
//         const items = [];
//         for (const key in resData) {
//           if (resData.hasOwnProperty(key)) {
//             items.push(
//               new Item(
//                 resData[key].name,
//                 resData[key].amount,
//                 resData[key].userid,
//               )
//             );
//           }
//         }
//         return items;
//         // return [];
//       }),
//       tap(items => {
//         this._list.next(items);
//       })
//     );
//   }

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
