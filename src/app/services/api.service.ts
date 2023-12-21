import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  SERVER_URL = "http://localhost:3000"

  constructor(private http: HttpClient) { 
    this.getwishlistCount()
  }
 wishlistCount = new BehaviorSubject(0)

  getAllproductsAPI() {
    return this.http.get(`${this.SERVER_URL}/products/all`)
  }

  registerAPI(user: any) {
    return this.http.post(`${this.SERVER_URL}/user/register`, user)
  }

  LoginAPI(user: any) {
    return this.http.post(`${this.SERVER_URL}/user/login`, user)
  }

  getProductAPI(id: any) {
    return this.http.get(`${this.SERVER_URL}/product/get/${id}`)
  }


  appendTokenHeader(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }
// add wishlistAPI
  addToWishlistAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/wishlist/add`,product,this.appendTokenHeader())
  }

  // /wishlist/get-allproducts
  getWishlistAPI(){
    return this.http.get(`${this.SERVER_URL}/wishlist/get-allproducts`,this.appendTokenHeader())
  }

  getwishlistCount(){
    this.getWishlistAPI().subscribe((res:any)=>{
      console.log(res);
      
      this.wishlistCount.next(res.length)
    })
  }

  deleteWishlistItemAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}wishlist/remove/${id}`,this.appendTokenHeader())
  }

  // cart/add
  addcartAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/cart/add`,product,this.appendTokenHeader())
  }


  // /cart/get-all-products
  getCartAPI(){
    return this.http.get(`${this.SERVER_URL}/cart/get-all-products`,this.appendTokenHeader())
  }
}
