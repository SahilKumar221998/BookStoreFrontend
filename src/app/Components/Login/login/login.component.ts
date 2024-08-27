import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/User/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Services/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
        ],
      ], // Password must contain at least one number, one uppercase and lowercase letter, and at least 8 characters
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = {
        userEmail: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.userService.logIn(loginData).subscribe(
        (response: any) => {
          // Save the token to localStorage
          if (response.success && response.data) {
            localStorage.setItem('token', response.data);
            this.snackbar.open('Login Successful', '', { duration: 3000 });
            this.router.navigateByUrl('/dashboard');
            this.sharedService.updateLoginStatus(true);
          } else {
            this.snackbar.open('Login Unsuccessful: Missing Token', '', {
              duration: 3000,
            });
          }
        },
        (error) => {
          console.log('API Error:', error);
          this.snackbar.open('Login Unsuccessful', '', { duration: 3000 });
        }
      );
    } else {
      console.log('Form Invalid');
    }
  }

  togglePasswordVisibility() {
    this.hide = !this.hide; // Toggle the boolean value
  }
}
