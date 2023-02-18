import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

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

export const routingComponents = []
