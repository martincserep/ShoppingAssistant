import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from './item.model';
import { ShoppingService } from './shopping.service';
import { ListService } from './list.service';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit, OnDestroy {
  private itemListSub: Subscription;

  list: Item[];

  constructor(
    private shoppingService: ShoppingService,
    private listSerivce: ListService,
    private commonService: CommonService) { }



  addItemToList() {
    this.listSerivce.addItemToList();
  }

  clearList() {
    this.commonService.clearList('shopping-list');
  }
  ngOnInit() {
    this.list = this.shoppingService.getList();
    this.itemListSub = this.shoppingService.getListUpdateListener()
      .subscribe(
        (items: Item[]) => {
          this.list = items;
        }
      );
  }

  deleteItem(name: string) {
    console.log(name);
  }

  ngOnDestroy() {
    this.itemListSub.unsubscribe();
  }

}
