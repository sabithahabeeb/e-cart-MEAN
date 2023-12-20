import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  SERVER_URL = "http://localhost:3000"

  constructor(private http: HttpClient) { }

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
  addToWishlistAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/wishlist/add/${id}`,this.appendTokenHeader())
  }
}
