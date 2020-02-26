import { Component, OnInit} from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeListService } from "src/services/recipe-list.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:any= [];
  //recipes : any = [];
  loading:boolean = false;

  constructor(
    private RecipeListService : RecipeListService
  ) { }

  ngOnInit() {

    this.loading = true;
    this.RecipeListService.getAll().subscribe(responseData => {
      this.loading = false;
      this.recipes = responseData;
    });

    // this.RecipeListService.recipeChanged.subscribe(loading => {
    //   this.loading = loading;
    // });

    this.RecipeListService.dataSource1.subscribe((recipe:Recipe[]) => {
      this.recipes = recipe;
    });
  }


}
