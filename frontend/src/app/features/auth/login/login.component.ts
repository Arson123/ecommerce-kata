import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LoginDto } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: LoginDto = { email: '', password: '' };
  loading = false; error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    this.loading = true; this.error = '';
    this.auth.login(this.form).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => { this.error = 'Credenciales incorrectas'; this.loading = false; }
    });
  }
}
