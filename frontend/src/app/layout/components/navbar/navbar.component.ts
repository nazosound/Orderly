import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: `

  `,
  imports: [NgClass],
})
export class NavbarComponent {
  showMenu = signal<boolean>(false);
}
