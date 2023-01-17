import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';

@Injectable()
export class AuthGuard extends KeycloakAuthGuard {
  constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.authenticated) {
        // Navigate to the login page
        this.keycloakAngular.login();
        return;
      }

      // check: if required but not given -> access denied
      // handle access-denied page:
      // check: if forbidden but given -> redirect to startpage
      const requiredRoles = route.data.roles_required;
      const forbiddenRoles = route.data.roles_forbidden;

      if (!requiredRoles || requiredRoles.length === 0) {
        if (!forbiddenRoles || forbiddenRoles.length === 0) {
          return resolve(true);
        } else {
          return resolve(this.checkAndHandleForbidden(forbiddenRoles, this.roles));
        }
      } else {
        // check: if required but not given -> access denied
        let granted: boolean = this.roleMatched(requiredRoles, this.roles);

        if (!granted)
        // redirect to access-denied
          this.router.navigate(['/access-denied-for-role']);
//            this.router.navigate(['/access-denied-work-in-progress']);
        else {
          // check: if forbidden but given
          // -> redirect to startpage
          granted = this.checkAndHandleForbidden(forbiddenRoles, this.roles);
        }

        resolve(granted);
      }
    });
  }

  /**
   * check if forbidden forbiddenRoles are given -> redirect to default page
   * returns a boolean if passThrough is ok or not: true if NOT forbidden
   * @param forbiddenRoles
   * @param userRoles
   */
  private checkAndHandleForbidden(forbiddenRoles: string[], userRoles: string[]): boolean {
    let forbidden: boolean = this.roleMatched(forbiddenRoles, userRoles);
    if (forbidden)
    // Navigate to the default page (startpage)
      this.router.navigate(['/']);

    return (!forbidden);

  }

  /**
   * returns true of the given roles contain the roles2find
   * returns false if roles or roles2find are empty or undefined
   * @param roles
   * @param roles2find
   */
  private roleMatched(roles: string[], roles2find: string[]): boolean {
    let found: boolean = false;

    if (!roles || roles.length == 0 || !roles2find || roles2find.length === 0) return found;

    for (const requiredRole of roles2find) {
      if (roles.indexOf(requiredRole) > -1) {
        found = true;
        break;
      }
    }

    return found;
  }
}
