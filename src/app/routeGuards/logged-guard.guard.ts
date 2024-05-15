import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {DataServiceService} from "../services/data-service.service";

export const loggedGuardGuard: CanActivateFn = (route, state) => {
  const externalService = inject(DataServiceService);

  if(externalService.isLogged()) {
    return true;
  }
  console.log("Guard redirect to login!")
  externalService.redirectTo('/login')
  return true;
};
