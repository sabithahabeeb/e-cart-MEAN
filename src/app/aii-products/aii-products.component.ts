import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-aii-products',
  templateUrl: './aii-products.component.html',
  styleUrls: ['./aii-products.component.css']
})
export class AiiProductsComponent implements OnInit{
  allproducts:any=[]
  constructor(private api:ApiService){}

ngOnInit(): void {
  this.api.getAllproductsAPI().subscribe((res:any)=>{
    this.allproducts = res
  })
}

}
