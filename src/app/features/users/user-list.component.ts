import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>User List</h2>
      @if (errorMessage) {
        <div class="alert alert-danger">{{ errorMessage }}</div>
      }
      @if (users.length > 0) {
        <table class="table table-striped">
          <thead><tr><th>ID</th><th>Name</th><th>Email</th></tr></thead>
          <tbody>
            @for (user of users; track user.id) {
              <tr><td>{{ user.id }}</td><td>{{ user.name }}</td><td>{{ user.email }}</td></tr>
            }
          </tbody>
        </table>
      } @else {
        <div class="alert alert-info">No users found.</div>
      }
    </div>
  `
})
export class UserListComponent implements OnInit, OnDestroy {
  users: any[] = [];
  errorMessage: string | null = null;
  private sub?: Subscription;

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private loadUsers() {
    this.sub?.unsubscribe();
    this.users = [];
    this.errorMessage = null;

    this.sub = this.userService.getUsers().pipe(
      catchError(err => {
        this.errorMessage = err?.message || 'Failed to load users';
        return of([]);
      })
    ).subscribe(users => {
      this.users = users;
      this.cdr.detectChanges();
    });
  }
}