import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './component/header/header';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  protected readonly title = signal('testproj');
}
