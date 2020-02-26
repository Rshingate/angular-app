import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  @ViewChild(NgForm) shoppingForm:NgForm;
  ingrendientItem :any;
  editMode = false;
  subscription: Subscription;
  editedItemIndex:number;

  constructor(private ShoppingService:ShoppingService) { }

  ngOnInit() {
      this.subscription = this.ShoppingService.shoppingEdit.subscribe((index:number) => {
        this.editedItemIndex = index;
        this.ingrendientItem =  this.ShoppingService.getItem(index);
        this.editMode = true;
        this.shoppingForm.setValue({
           name: this.ingrendientItem.name,
           amount: this.ingrendientItem.amount,
        })
      });
    }
  
  // onAddItem() {
  //   const ingName = this.nameInputRef.nativeElement.value;
  //   const ingAmount = this.amountInputRef.nativeElement.value;
  //   const newIngredient = new Ingredient(ingName, ingAmount);
  //   this.ShoppingService.ingredientAdded.next(newIngredient);
  // }

  onSubmit(form:NgForm)
  {
    const newIngredient = new Ingredient(form.value.name,form.value.amount);
    if(this.editMode)
    {
      this.ShoppingService.updateIngredient(this.editedItemIndex,newIngredient);
    }
    else{
      this.ShoppingService.ingredientAdded.next(newIngredient);
    }
    this.editMode = false;
    this.shoppingForm.reset();
  }

  clearForm(){
    this.shoppingForm.reset();
    this.editMode = false;
  }

  deleteForm()
  {
    this.ShoppingService.deleteIng(this.editedItemIndex);
    this.clearForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
