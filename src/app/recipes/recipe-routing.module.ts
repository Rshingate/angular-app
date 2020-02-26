import { NgModule} from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

const appRoutes : Routes =[
    {path :'', component: RecipesComponent,
    canActivate: [AuthGuard],
    children:[
        {path :'new', component: RecipeEditComponent},
        {path :':id', component: RecipeDetailComponent},
        {path :':id/edit', component: RecipeEditComponent},
    ]},
]


@NgModule({
    imports : [
        RouterModule.forChild(appRoutes)
    ],
    exports : [
        RouterModule
    ]
})

export class RecipeRoutingModule{}