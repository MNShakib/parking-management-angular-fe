import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin = false;
  isLoggedIn = false;
  username = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.syncUserState();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.syncUserState(); // Re-evaluate on route change
      }
    });
  }

  syncUserState(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
    this.username = token ? localStorage.getItem('username') || '' : '';
    this.isAdmin = localStorage.getItem('role') === 'admin';
  }

  logout(): void {
    localStorage.clear();
    this.syncUserState();
    this.router.navigate(['/login']);
  }
}
