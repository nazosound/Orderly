import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanActivate {
    authService = inject(AuthService);
    router = inject(Router);

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
        const expectedRoles = route.data['roles'] as string[];
        return this.authService.hasRoleAccess(expectedRoles).pipe(
            map(hasAccess => {
                if (hasAccess) return true;
                return this.router.createUrlTree(['/unauthorized']);
            })
        );
    }
}
