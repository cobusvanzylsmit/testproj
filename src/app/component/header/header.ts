import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
})
export class Header {
  isMenuCollapsed = true;

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    // lock body scroll when menu open
    document.body.style.overflow = this.isMenuCollapsed ? '' : 'hidden';
  }

  closeMenu() {
    this.isMenuCollapsed = true;
    document.body.style.overflow = '';
  }
}