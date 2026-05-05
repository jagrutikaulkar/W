import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  page: string = 'login';

  users: { name: string; email: string; password: string }[] = [];

  loginEmail = '';
  loginPassword = '';

  regName = '';
  regEmail = '';
  regPassword = '';

  currentUser: any = null;

  // ⭐ REGISTER
  register() {
    if (!this.regName || !this.regEmail || !this.regPassword) return;

    this.users.push({
      name: this.regName,
      email: this.regEmail,
      password: this.regPassword
    });

    alert('Registration Successful!');
    this.page = 'login';

    this.regName = '';
    this.regEmail = '';
    this.regPassword = '';
  }

  // ⭐ LOGIN
  login() {
    const user = this.users.find(
      u => u.email === this.loginEmail && u.password === this.loginPassword
    );

    if (user) {
      this.currentUser = user;
      this.page = 'profile';
    } else {
      alert('Invalid Credentials');
    }
  }

  // ⭐ LOGOUT
  logout() {
    this.currentUser = null;
    this.page = 'login';
  }
}