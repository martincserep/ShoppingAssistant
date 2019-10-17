import { Component, OnInit } from '@angular/core';
import { Item } from './item.model';
import { AlertController } from '@ionic/angular';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {

  list: Item[] = [
    {name: 'Bread', amount: 1},
    {name: 'Coca-Cola', amount: 2},
    {name: 'Tomato', amount: 1},
    {name: 'Carrot', amount: 2},
  ];

  constructor(private alertCtrl: AlertController, private shoppingService: ShoppingService) { }

  async presentPrompt() {
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
            const newAmount = Number.parseInt(data.amount);
            this.shoppingService.addItem(data.itemname, newAmount);
          }
        }
      ]
    });
    (await alert).present();
  }
  ngOnInit() {
  }

}
