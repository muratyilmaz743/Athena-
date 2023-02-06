import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {UserModule} from "./components/user/user.module";
import {UserLoginComponent} from "./components/user/user-login/user-login.component";
import {UserRegisterComponent} from "./components/user/user-register/user-register.component";

const routes: Routes = [
  {path: 'user', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        useHash: false,
        preloadingStrategy: PreloadAllModules
      }
    )

  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [UserLoginComponent, UserRegisterComponent]
