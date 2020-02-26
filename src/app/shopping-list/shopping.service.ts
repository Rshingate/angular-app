import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})

export class ShoppingService{

    ingredientAdded = new Subject<Ingredient>();
    shoppingEdit = new Subject<Number>();
    
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];
   getIncredients()
   {
       return this.ingredients;
   }

   getItem(index:number)
   {
      return this.ingredients[index];
   }
   
   insertIncredients(ingredient : Ingredient)
   {
       this.ingredients.push(ingredient);
   }

   updateIngredient(id:number,Editedingredient:Ingredient)
   {
       this.ingredients[id] = Editedingredient;
   }

   deleteIng(id:number){
        this.ingredients.splice(id,1);
   }

   addIngredients(ingredients : Ingredient[])
   {
        this.ingredients.push(...ingredients);
   }

}