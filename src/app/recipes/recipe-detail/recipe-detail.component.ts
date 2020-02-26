import { Component, OnInit} from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeListService } from 'src/services/recipe-list.service';
import { Router, ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeId : any;
  recipe : any;
  loading:boolean = false;

  constructor(
    private RecipeListService:RecipeListService,
    private actRoute:ActivatedRoute,
    private router : Router
    ) { }

  ngOnInit() {

    this.actRoute.params.subscribe((params:Params) => {
      this.recipeId = params['id'];

      this.loading = true;
      this.RecipeListService.getById(this.recipeId)
      .subscribe(responseData => {
        this.loading = false;
        this.recipe = responseData;

      });

      //UPDATING DOM DATA AFTER UPDATE
      this.RecipeListService.dataSource.subscribe(recipe => {
        this.recipe = recipe;

      });

    });
  }

  addToShoppingList()
  {
    this.RecipeListService.addIngredients(this.recipe.ingredients);
  }

  deleteRecipe()
  {
    this.RecipeListService.deleteRecipe(this.recipeId).subscribe(responseData  => {
      this.RecipeListService.getAll().subscribe(data => {
        this.RecipeListService.subscibeRecipes(data);
      });
     });

    this.router.navigate(['recipes']);
  }
}
