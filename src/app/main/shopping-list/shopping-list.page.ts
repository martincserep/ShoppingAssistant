import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from './item.model';
import { ShoppingService } from './shopping.service';
import { ListService } from './list.service';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';

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
    private listSerivce: ListService) { }

  clearList() {
    this.listSerivce.clerList();
  }

  addItemToList() {
    this.listSerivce.addItemToList();
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

  ngOnDestroy() {
    this.itemListSub.unsubscribe();
  }

}
