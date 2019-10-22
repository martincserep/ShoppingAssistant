import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'main', loadChildren: './main/main.module#MainPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
