import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
allProducts:any = []
  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getWishlist()
  }
getWishlist(){
  this.api.getWishlistAPI().subscribe((res:any)=>{
    this.allProducts = res
    this.api.getwishlistCount()
  })
}

removeItem(id:any){
  this.api.deleteWishlistItemAPI(id).subscribe({
    next:(res:any)=>{
      this.getWishlist()
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}
}
