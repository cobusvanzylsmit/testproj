import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h2>Add New User</h2>

          @if (successMessage) {
            <div class="alert alert-success" role="alert">{{ successMessage }}</div>
          }

          @if (errorMessage) {
            <div class="alert alert-danger" role="alert">{{ errorMessage }}</div>
          }

          <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                formControlName="name"
                placeholder="Enter user name"
                [class.is-invalid]="isFieldInvalid('name')"
              />
              @if (isFieldInvalid('name')) {
                <div class="invalid-feedback d-block">
                  @if (userForm.get('name')?.hasError('required')) {
                    Name is required.
                  }
                  @if (userForm.get('name')?.hasError('minlength')) {
                    Name must be at least 3 characters.
                  }
                </div>
              }
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                formControlName="email"
                placeholder="Enter email address"
                [class.is-invalid]="isFieldInvalid('email')"
              />
              @if (isFieldInvalid('email')) {
                <div class="invalid-feedback d-block">
                  @if (userForm.get('email')?.hasError('required')) {
                    Email is required.
                  }
                  @if (userForm.get('email')?.hasError('email')) {
                    Please enter a valid email address.
                  }
                </div>
              }
            </div>

            <div class="d-flex gap-2">
              <button
                type="submit"
                class="btn btn-primary"
                [disabled]="userForm.invalid || isSubmitting"
              >
                @if (isSubmitting) {
                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Adding...
                } @else {
                  Add User
                }
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                (click)="onCancel()"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.userService.addUser(this.userForm.value).subscribe({
      next: () => {
        this.successMessage = 'User added successfully!';
        this.isSubmitting = false;
        // Redirect to user list after 1.5 seconds
        setTimeout(() => {
          this.router.navigate(['']); //just go to home
        }, 1500);
      },
      error: (err) => {
        console.error('Error adding user:', err);
        this.errorMessage = err?.error?.error || err?.message || 'Failed to add user';
        this.isSubmitting = false;
      }
    });
  }

  onCancel() {
    this.router.navigate(['']);
  }
}
