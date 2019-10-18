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
    this.list.push(item);
    this.listUpdated.next(this.list);
    console.log(this.list);
  }

  deleteItem() {

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
