import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  register(): void {
    const registered = this.auth.register(this.username, this.password);
    if (registered) {
      alert('Registration successful! Please login.');
      this.router.navigate(['/login']);
    } else {
      alert('Username already taken.');
    }
  }
}
