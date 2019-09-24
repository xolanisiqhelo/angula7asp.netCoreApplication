
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AddCustomer } from '../models/add-customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailService {
  formData: AddCustomer;
  readonly rootURL = 'http://localhost:64076/api';
  list :  AddCustomer[];

  constructor(private http: HttpClient) { }

  postCustomerDetail() {
    return this.http.post(this.rootURL + '/CustomerDetails', this.formData);
  }
  putCustomerDetail() {
    return this.http.put(this.rootURL + '/CustomerDetails/'+ this.formData.CMId, this.formData);
  }
  deleteCustomerDetail(id) {
    return this.http.delete(this.rootURL + '/CustomerDetails/'+ id);
  }

  getCustomerList(){
    this.http.get(this.rootURL + '/CustomerDetails/')
    .toPromise()
    .then(res => this.list = res as AddCustomer[]);
  }
}

