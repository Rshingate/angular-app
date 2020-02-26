import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeListService } from 'src/services/recipe-list.service';
import { Recipe } from '../recipe.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeId:number;
  editMode = false;
  recipeForm : FormGroup;
  loading:boolean = false;
  dataChange = new BehaviorSubject<any>([]);
  //recipeDetails : any;

  constructor(
    private actRoutes:ActivatedRoute,
    private router : Router,
    private RecipeListService:RecipeListService
    ) { }

  ngOnInit() {
    this.actRoutes.params.subscribe(
      (params:Params) => {
        this.recipeId = params['id'];
        if(this.recipeId != null)
        {
          this.editMode = true;
        }
        else{
          this.editMode = false;
        }
        this.initForm();
      }
    )
  }



  private initForm()
  {
    //let recipeName = '';
    //let recipeImagePath = '';
    //let recipeDescription = '';
    let recipeIngredients = new FormArray([]);


    //FOR FORMGROUP
    this.recipeForm = new FormGroup({
      'name' : new FormControl('',[Validators.required]),
      'imagePath' : new FormControl('',[Validators.required]),
      'description' : new FormControl('',[Validators.required]),
      'ingredients' : recipeIngredients
    });

    if(this.editMode)
    {
      var recipeDetails;
      this.loading= true;
      this.RecipeListService.getById(this.recipeId).subscribe(responseData => {
        this.loading= false;
        recipeDetails = responseData;
        //recipeName = recipeDetails.name;
        //recipeImagePath = recipeDetails.imagePath;
        //recipeDescription = recipeDetails.description;

        if (recipeDetails['ingredients']) {
          for (let ingredient of recipeDetails.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
          }
        }
        this.recipeForm.patchValue({
          name : recipeDetails.name,
          imagePath : recipeDetails.imagePath,
          description : recipeDetails.description,
          ingredients : recipeDetails.recipeIngredients
        });

      });
    }
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit()
  {
    if(this.editMode)
    {
      this.loading=true;
      this.RecipeListService.updateRecipe(this.recipeId,this.recipeForm.value).subscribe(responseData  => {
        this.loading = false;
        this.RecipeListService.getAll().subscribe(data => {
          this.RecipeListService.subscibeRecipes(data);
          this.RecipeListService.subscibeRecipe(this.recipeForm.value);
        });
      });
    }
    else{
      this.loading=true;
      this.RecipeListService.addRecipe(this.recipeForm.value).subscribe(responseData  => {
        this.loading = false;
        this.RecipeListService.getAll().subscribe(data => {
          this.RecipeListService.subscibeRecipes(data);
        });
      });
    }

    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.actRoutes})
  }

}
