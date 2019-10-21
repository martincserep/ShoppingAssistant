import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private http: HttpClient) { }


  onLogin() {
    this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyDeES4JZjs_NOwuhzVFh_h0ZmmQc4p1PC0')
  }

  ngOnInit() {
  }

}
