import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { AlertController } from '@ionic/angular';
import { ShoppingService } from './shopping.service';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(
    private alertCtrl: AlertController,
    private shoppingService: ShoppingService,
    private commonSerivce: CommonService
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
          type: 'number',
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
            const newName: string = data.itemname;
            const newAmount: number = data.amount;
            if (newName.length <= 0 || newAmount <= 0) {
              this.commonSerivce.invalidInput();
              return;
            } else {
              const newItem = new Item(this.shoppingService.getUser(), newName, newAmount);
              this.shoppingService.addItem(newItem);
            }
          }
        }
      ]
    });
    (await alert).present();
  }

}
