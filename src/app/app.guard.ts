import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class OktaAuthGuard implements CanActivate {
    constructor(
      // private okta: OktaAuthService,
       private router: Router) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const authenticated = await this.okta.hasValidToken();
        // if (authenticated) { return true; }

        // this.okta.login();
        return true;
    }
}
