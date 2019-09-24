import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { CustomerDetailService } from '../shared/customer.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddCustomer } from '../models/add-customer.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  isUpdateCustomer:Boolean=false;
  userDetails
  constructor(private service: CustomerDetailService,private userService:UserService,
    private toastr: ToastrService,private customerDetailService:CustomerDetailService,private router:Router) { }

  ngOnInit() {
    this.customerDetailService.getCustomerList();
    this.resetForm();
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  editCutomer(pd: AddCustomer) {
    this.customerDetailService.formData = Object.assign({}, pd);
    this.isUpdateCustomer=true
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.customerDetailService.deleteCustomerDetail(id)
        .subscribe(res => {
          
          this.service.getCustomerList();
          this.toastr.warning('Deleted successfully', 'customer Detail Register');
        },
          err => {
        
            console.log(err);
          })
    }
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.customerDetailService.formData = {
      CMId: 0,
      FirstName: '',
      LastName: '',
      CellPhone: '',
      EmailAddress: '',
      ResidentialAddress:'',
      City:'',
      PostalCode:''
    }
  }

  onSubmit(form: NgForm) {
    this.isUpdateCustomer=false
    if (this.customerDetailService.formData.CMId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.customerDetailService.postCustomerDetail().subscribe(
      res => {
       
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'cutomer Detail Register');
        this.customerDetailService.getCustomerList();
      },
      err => {
       
        console.log(err);
      }
    )
  }
  updateRecord(form: NgForm) {
    this.customerDetailService.putCustomerDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'customer Detail Register');
        this.customerDetailService.getCustomerList();
      },
      err => {
        console.log(err);
      }
    )
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
