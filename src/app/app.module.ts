import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

const firebaseConfig = {
  apiKey: 'AIzaSyDeES4JZjs_NOwuhzVFh_h0ZmmQc4p1PC0',
  authDomain: 'shoppingassist-385d6.firebaseapp.com',
  databaseURL: 'https://shoppingassist-385d6.firebaseio.com',
  projectId: 'shoppingassist-385d6',
  storageBucket: 'shoppingassist-385d6.appspot.com',
  messagingSenderId: '1081003584476',
  appId: '1:1081003584476:web:84e6df74fa894e2ed8fd19',
  measurementId: 'G-M0V36N9E57'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [
    StatusBar,
    AngularFireDatabase,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
