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

addWishlist(produst:any){
  if(sessionStorage.getItem("token")){
    this.toaster.showSuccess("proceed to add item to wishlist")
  }else{
    this.toaster.showWarning("Operation Denied...  Please login!!!")
  }
}

addtocart(produst:any){
  if(sessionStorage.getItem("token")){
    this.toaster.showSuccess("proceed to add item to cart")
  }else{
    this.toaster.showWarning("Operation Denied...  Please login!!!")
  }
}

}
