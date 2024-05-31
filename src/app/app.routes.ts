import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './auth.guard';
import { CrudEntidadComponent } from './components/crud-entidad/crud-entidad.component';
import { CrudTipoDocumentoComponent } from './components/crud-tipo-documento/crud-tipo-documento.component';
import { CrudTipoContribuyenteComponent } from './components/crud-tipo-contribuyente/crud-tipo-contribuyente.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { loggedGuard } from './logged.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [loggedGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [loggedGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: '*', redirectTo: '/login', pathMatch: 'full'},
    { path: 'crud-entidad', component: CrudEntidadComponent, canActivate: [authGuard] },
    { path: 'crud-tipo-documento', component: CrudTipoDocumentoComponent, canActivate: [authGuard] },
    { path: 'crud-tipo-contribuyente', component: CrudTipoContribuyenteComponent, canActivate: [authGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
];

