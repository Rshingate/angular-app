import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from "src/app/recipes/recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingService } from "src/app/shopping-list/shopping.service";
import { Subject, BehaviorSubject } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({
  providedIn: 'root'
})

export class RecipeListService{

  recipeChanged = new Subject<any>();
 // dataSource = new BehaviorSubject<Recipe[]>([]);
  value = new BehaviorSubject<any>(null);
  dataSource = this.value.asObservable();

  value1 = new BehaviorSubject<any>(null);
  dataSource1 = this.value1.asObservable();
  private recipes : Recipe [] = [];
  loading:boolean = false;
  params:any = '';
  //recipes : any = [];

  // private recipes: Recipe[] = [
  //   new Recipe('A veg Burger',
  //   'This is Veg Burger',
  //   'https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary-1500x1125.jpg',
  //   [ new Ingredient('Vegetable',5),
  //     new Ingredient('souce' ,1)
  //   ]
  //   ),
  //   new Recipe('PIZZA',
  //    'This is pizza',
  //   'https://image.shutterstock.com/image-photo/supreme-pizza-lifted-slice-1-260nw-84904912.jpg',
  //   [ new Ingredient('Veg base',1),
  //     new Ingredient('cheese' ,2)
  //   ]
  //   ),
  // ];

  constructor(
    private ShoppingService:ShoppingService,
    private authService:AuthService,
    private http: HttpClient,
    private router: Router
    ){
      this.authService.userEmit.subscribe(user => {
        console.log(user);
        this.params = new HttpParams().set("auth",user._token); //Create new HttpParams
     })
    }

  getAll()
  {
    //return this.recipes.slice();
    //HTTP GET FOR GETTING RECIPES FROM FIREBASE
    return this.http.get<Recipe[]>("https://angular-app-f8910.firebaseio.com/recipes.json",{params:this.params})
    .pipe(map(responseData => {
      const recipeArray:Recipe[] =[];
      for(let key in responseData){
        if(responseData.hasOwnProperty(key)){
          recipeArray.push({...responseData[key],id:key});
        }
      }
      return recipeArray;
    })
    );
  }

  getById(id:any){
    //return this.recipes[id];
    //this.recipeChanged.next(this.recipes.slice());

    return this.http.get<Recipe[]>("https://angular-app-f8910.firebaseio.com/recipes/"+id+".json",{params:this.params});

  }

  addRecipe(recipe:Recipe)
  {
    //this.recipes.push(recipe);
    //this.recipeChanged.next(this.recipes.slice());

    //HTTP SERVICE FOR SAVING INTO DATABASE
    return this.http.post<Recipe[]>("https://angular-app-f8910.firebaseio.com/recipes.json",recipe,{params:this.params});
  }

  updateRecipe(index:any,recipe:Recipe)
  {
    //this.recipes[index] = recipe;
    //this.recipeChanged.next(this.recipes.slice());

    //HTTP SERVICE FOR SAVING(UPDATE) INTO DATABASE
    return this.http.put("https://angular-app-f8910.firebaseio.com/recipes/"+index+".json",recipe,{params:this.params});
  }

  deleteRecipe(recipeId:any)
  {
    //this.recipes.splice(recipeId,1);
    //this.recipeChanged.next(this.recipes.slice());

     //HTTP SERVICE FOR DELETE INTO DATABASE
     return this.http.delete("https://angular-app-f8910.firebaseio.com/recipes/"+recipeId+'.json',{params:this.params});
  }


  addIngredients(ingredients:Ingredient[])
  {
    this.ShoppingService.addIngredients(ingredients);
  }

  subscibeRecipe(recipe:Recipe)
  {
    this.value.next(recipe);
  }

  subscibeRecipes(recipes:Recipe[])
  {
    this.loading = true;
    this.recipeChanged.next(this.loading);
    this.value1.next(recipes);

  }



}