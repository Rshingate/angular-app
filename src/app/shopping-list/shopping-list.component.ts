import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private ShoppingService:ShoppingService
    ) { }

  ngOnInit() {

    this.ShoppingService.ingredientAdded.subscribe(
      (ingredient : Ingredient) => {
         this.ShoppingService.insertIncredients(ingredient);
      });

    this.ingredients = this.ShoppingService.getIncredients();
  }

  editItem(index:number)
  {
    this.ShoppingService.shoppingEdit.next(index);    
  }

  


}
