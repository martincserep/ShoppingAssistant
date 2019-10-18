import { Injectable } from '@angular/core';
import { ShoppingService } from './shopping-list/shopping.service';
import { CartService } from './home/cart.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private shoppingService: ShoppingService,
    private cartService: CartService,
    private alertCtrl: AlertController,
    ) {

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
