import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { AlertController } from '@ionic/angular';
import { ShoppingService } from './shopping.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(
    private alertCtrl: AlertController,
    private shoppingService: ShoppingService
    ) { }

  async addItemToList() {
    const alert = this.alertCtrl.create({
      header: 'What is missing from your fridge?',
      inputs: [
        {
          name: 'itemname',
          placeholder: 'Item name'
        },
        {
          name: 'amount',
          placeholder: 'Amount'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            const newName = data.itemname;
            const newAmount = Number.parseInt(data.amount);
            const newItem = new Item(newName, newAmount);
            this.shoppingService.addItem(newItem);
          }
        }
      ]
    });
    (await alert).present();
  }

  async clerList() {
    const alert = this.alertCtrl.create({
      header: 'Do you really want to clear the shopping list?',
      buttons: [
        {
          text: 'Nope👎',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes👍',
          handler: data => {
            this.shoppingService.clearList();
          }
        }
      ]
    });
    (await alert).present();
  }



}
