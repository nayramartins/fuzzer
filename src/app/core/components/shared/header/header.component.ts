import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  headerMenuItems = [
    {
      label: 'home',
      link: '/home',
    },
    // {
    //   label: 'what\'s fuzzer',
    //   link: '/about',
    // },
  ]
}
