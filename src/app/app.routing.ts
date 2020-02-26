import { Routes,RouterModule, PreloadAllModules } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { TestComponent } from './test/test.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes : Routes =[
    {path :'', redirectTo :'/recipes',pathMatch:'full'},
    //{path : 'recipes',loadChildren: () => import('./recipes/recipes.module').then(mod => mod.RecipesModule)},
    {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
    {path :'auth', component: AuthComponent},
    {path :'shopping-list', component: ShoppingListComponent,canActivate: [AuthGuard]},
    {path :'test-page', component: TestComponent},
    {path:"**",redirectTo :''}
]


export const routing = RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules});