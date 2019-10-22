import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './main.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: MainPage,
        children: [
            { path: 'settings', children: [
                {
                    path: '',
                    loadChildren: './user-settings/user-settings.module#UserSettingsPageModule'
                }
            ]
            },
            { path: 'home', children: [
                {
                    path: '',
                    loadChildren: './home/home.module#HomePageModule'
                }
            ]
            },
            { path: 'shoppinglist', children: [
                {
                    path: '',
                    loadChildren: './shopping-list/shopping-list.module#ShoppingListPageModule'
                }
            ]
            },
            {
                path: '',
                redirectTo: '/main/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/main/tabs/home',
        pathMatch: 'full'
    }
];

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {

}
