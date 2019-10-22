import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from './item.model';
import { ShoppingService } from './shopping.service';
import { ListService } from './list.service';
import { Subscription } from 'rxjs';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit, OnDestroy {
  private itemListSub: Subscription;

  list: Item[];

  isLoading = false;
  router: any;

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

  editItem(item: Item) {
    this.commonService.editItem(item);
  }

  deleteItem(item: Item) {
    this.shoppingService.deleteItem(item);
  }

  ngOnDestroy() {
    this.itemListSub.unsubscribe();
  }


  // ngOnInit() {
  //   this.itemListSub = this.shoppingService.list.subscribe(list => {
  //     this.list = list;
  //   });
  // }

  // ionViewWillEnter() {
  //   this.isLoading = true;
  //   this.shoppingService.fetchItems().subscribe(() => {
  //     this.isLoading = false;
  //   });
  // }

  // onEdit(offerId: string, slidingItem: IonItemSliding) {
  //   slidingItem.close();
  //   this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
  //   console.log('Editing item', offerId);
  // }

  // ngOnDestroy() {
  //   if (this.itemListSub) {
  //     this.itemListSub.unsubscribe();
  //   }
  // }
}
