import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const loggedGuard: CanActivateFn = (route, state) => {
    const token = localStorage.getItem('token');
    const router = inject(Router);
  
    if (!token) {
      return true;
    }
  
    router.navigate(['/dashboard']);
    return false;
};