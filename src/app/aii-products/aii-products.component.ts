import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-aii-products',
  templateUrl: './aii-products.component.html',
  styleUrls: ['./aii-products.component.css']
})
export class AiiProductsComponent implements OnInit{
  allproducts:any=[]
  constructor(private api:ApiService, private toaster:ToasterService){}

ngOnInit(): void {
  this.api.getAllproductsAPI().subscribe((res:any)=>{
    this.allproducts = res
  })
}

addWishlist(product:any){
  if(sessionStorage.getItem("token")){
    this.api.addToWishlistAPI(product).subscribe({
      next:(res:any)=>{
        this.toaster.showSuccess(`${res.title} added to your wishlist!!`)
      },
      error:(err:any)=>{
        this.toaster.showWarning(err.error)
      }
    })
    
  }else{
    this.toaster.showWarning("Operation Denied...  Please login!!!")
  }
}

addtocart(product:any){
  if(sessionStorage.getItem("token")){
    Object.assign(product,{quantity:1})
    this.api.addcartAPI(product).subscribe({
      next:(res:any)=>{
        this.toaster.showSuccess(res)
      },
      error:(err:any)=>{
        console.log(err);
        this.toaster.showError(err.error)
        
      }
    })
    
  }else{
    this.toaster.showWarning("Operation Denied...  Please login!!!")
  }
}

}
