import { Injectable } from '@angular/core';
import { ShoppingService } from './shopping-list/shopping.service';
import { CartService } from './home/cart.service';
import { AlertController } from '@ionic/angular';
import { HomePage } from './home/home.page';
import { Item } from './shopping-list/item.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private shoppingService: ShoppingService,
    private cartService: CartService,
    private alertCtrl: AlertController
    ) {

   }

   async editItem(item: Item) {
    const alert = this.alertCtrl.create({
      header: 'Enter your new amount of ' + item.name.toLowerCase() + '!',
      inputs: [
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
          text: 'Modify',
          handler: data => {
            const newAmount: number = data.amount;
            if (newAmount <= 0) {
              this.invalidInput();
              return;
            } else {
              this.shoppingService.editItem(item, newAmount);
            }
          }
        }
      ]
    });
    (await alert).present();
  }

   async invalidInput() {
    const alert = this.alertCtrl.create({
      header: 'Hey! Please enter valid fasztudja',
      buttons: [
        {
          text: 'Okay 👍',
          handler: data => {
            return;
          }
        }
      ]
    });
    (await alert).present();
  }

  async clearList(where: string) {
    let listType: string;
    if (where === 'home') {
      listType = 'cart';
    } else {
      listType = 'shopping list';
    }
    const alert = this.alertCtrl.create({
      header: 'Do you really want to clear your ' + listType + '?',
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
            if (where === 'home') {
              this.cartService.clearList();
            } else if (where === 'shopping-list') {
              this.shoppingService.clearList();
            }
          }
        }
      ]
    });
    (await alert).present();
  }
}
