import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService, CookieOptions } from 'ngx-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      const decodedHash = this.decodeHash(fragment);
      this.cookieService.put("fuzzerToken", decodedHash.access_token)
      this.router.navigate(['/search'])
    })
  }

  decodeHash(hash) {
    return hash.replace('#', '')
      .split('&')
      .reduce((result, item) => {
        const args = item.split('=')
  
        result[args[0]] = args[1]
        return result
      }, {})
  }

  onLogin() {
    this.authService.login();
  }
}
