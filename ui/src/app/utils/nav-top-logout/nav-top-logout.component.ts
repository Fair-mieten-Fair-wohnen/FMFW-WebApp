import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import { KeycloakProfile } from 'keycloak-js';
import {ConfigService} from "../../services/config/config.service";

@Component({
  selector: 'app-nav-top-logout',
  templateUrl: './nav-top-logout.component.html',
  styleUrls: ['./nav-top-logout.component.css']
})
export class NavTopLogoutComponent implements OnInit {

  public user: KeycloakProfile;

  accessAllowed: {aggregation: boolean} = {aggregation: false};

  constructor(
    private keycloakService: KeycloakService,
    private config: ConfigService
  ) {}

  async ngOnInit() {
    if (await this.keycloakService.isLoggedIn()) {
      this.user = await this.keycloakService.loadUserProfile();
    }
    const aggregationRole = this.config.getStringFromPath("REQUIRED_ROLES.aggregation");
    this.accessAllowed.aggregation = this.keycloakService.isUserInRole(aggregationRole);
  }

  async doLogout() {
    await this.keycloakService.logout();
  }
}
