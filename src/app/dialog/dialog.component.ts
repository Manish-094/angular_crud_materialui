import { Component,OnInit,Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  action_btn : string = "Save";
  
freshnessList = ["Brand New","Second Hand","Refurbished"];
favoriteSeason:string = '';
productForm !:  FormGroup;
constructor( @Inject(MAT_DIALOG_DATA) private editData : any,private fb:FormBuilder,
  private apiservice:ApiService, 
  private dialogref:MatDialogRef<DialogComponent>){

}
ngOnInit():void{
this.productForm =  this.fb.group({
  productName:['',Validators.required],
  category:['',Validators.required],
  freshness:['',Validators.required],
  price:['',Validators.required],
  comment:['',Validators.required],
  date:['',Validators.required]
})
if(this.editData){
  this.action_btn = "Update";
  this.productForm.controls['productName'].setValue(this.editData.productName);
  this.productForm.controls['category'].setValue(this.editData.category);
  this.productForm.controls['freshness'].setValue(this.editData.freshness);
  this.productForm.controls['price'].setValue(this.editData.price);
  this.productForm.controls['comment'].setValue(this.editData.comment);
  this.productForm.controls['date'].setValue(this.editData.date);
}

}
addProduct(){
if(!this.editData){
  if(this.productForm?.valid){
    this.apiservice.postProduct(this.productForm.value).subscribe({
      next:(res)=>{
        alert("product is Addedd Successfully");
        this.productForm.reset();
        this.dialogref.close('save');
      },
      error:()=>{
        alert("Error while adding product");
      }
    });
  } 
}
else{
  this.UpdateData();
}
}
UpdateData(){
this.apiservice.putProduct(this.productForm.value,this.editData.id).subscribe({
  next:(res)=>{
    alert("Product Updated Successfully");
    this.productForm.reset();
    this.dialogref.close('update');
  },
  error:()=>{
    alert("Error while updating the record !!")
  }
})
}
}
