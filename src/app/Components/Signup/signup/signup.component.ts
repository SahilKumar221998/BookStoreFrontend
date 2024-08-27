import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hide = true;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]], // Only letters and spaces
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
        ],
      ], // Password must contain at least one number, one uppercase and lowercase letter, and at least 8 characters
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Exactly 10 digits
    });
  }

  onSignup() {
    this.submitted = true;

    if (this.signupForm.valid) {
      console.log('Form Data:', this.signupForm.value);

      const userData = {
        name: this.signupForm.value.fullName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        mobileNumber: this.signupForm.value.mobileNumber,
      };

      this.userService.signUp(userData).subscribe(
        (response: any) => {
          console.log('API Response:', response);
          this.snackbar.open('Registration Successful', '', { duration: 3000 });
          this.signupForm.reset();
          this.submitted = false;
        },
        (error) => {
          console.log('API Error:', error);
          this.snackbar.open('Registration Unsuccessful', '', {
            duration: 3000,
          });
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
