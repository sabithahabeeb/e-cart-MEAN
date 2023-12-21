import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product: any = {}
  constructor(private route: ActivatedRoute, private api: ApiService, private toaster:ToasterService) { }
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      console.log(res);
      const { id } = res
      // get details of particular product
      this.getproductDetails(id)
    })
  }

  getproductDetails(id: any) {
    this.api.getProductAPI(id).subscribe({
      next: (res: any) => {
        this.product = res
        console.log(this.product);

      },
      error: (err: any) => {
        console.log(err.error);

      }
    })

  }


  addWishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.api.addToWishlistAPI(product).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(`${res.title} added to your wishlist!!`)
          this.api.getwishlistCount()
        },
        error:(err:any)=>{
          this.toaster.showWarning(err.error)
        }
      })
      
    }else{
      this.toaster.showWarning("Operation Denied...  Please login!!!")
    }
  }
}
