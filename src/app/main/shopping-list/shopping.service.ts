import { Injectable } from '@angular/core';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  list: Item[] = [
    {name: 'Bread', amount: 1},
    {name: 'Coca-Cola', amount: 2},
    {name: 'Tomato', amount: 1},
    {name: 'Carrot', amount: 2},
  ];

  addItem(newName: string, newAmount: number) {
    this.list.push({name: newName, amount: newAmount});
    console.log(this.list);
  }

  constructor() { }
}
