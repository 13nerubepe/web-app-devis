import { Component, Input, booleanAttribute } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'c-site-top-menu',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './c-site-top-menu.component.html',
  styleUrl: './c-site-top-menu.component.scss'
})
export class CSiteTopMenuComponent {

  @Input({alias: "background-transparent", transform: booleanAttribute}) backgroundTransparent=false;
  mobileMenuOpen=false;

  switchMobileMenu() {
    if (!this.mobileMenuOpen)
      this.mobileMenuOpen = !this.mobileMenuOpen;
    else
      setTimeout(
        () => {
          this.mobileMenuOpen = !this.mobileMenuOpen;
        },
        300
      );
  }
}
