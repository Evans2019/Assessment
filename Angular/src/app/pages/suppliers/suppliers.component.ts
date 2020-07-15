import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  /* FormGroup name that will hold all data from the form */
  SupplierForm: FormGroup;

  /* Store all Suppliers */
  Suppliers;

  /* Validation Messages */
  validationMessages = {
    'CompanyName':{
      'required':'This Field is required'
    },
    'ContactName':{
      'required':' This Field is required'
    },
    'ContactTitle':{
      'required':' This Field is required'
    },
    'Address':{
      'required':' This Field is required'
    },
    'Country':{
      'required':' This Field is required'
    },
    'Fax':{
      'required':' This Field is required'
    },
    'Phone':{
      'required':' This Field is required'
    },
    'City':{
      'required':' This Field is required'
    },
    'Region':{
      'required':' This Field is required'
    },
    'PostalCode':{
      'required':' This Field is required'
    }
  };

  /* Form error for all field failed */
  formErrors = {
    'CompanyName' : '',
    'ContactName': '',
    'ContactTitle': '',
    'Address': '',
    'Country': '',
    'Fax': '',
    'Phone': '',
    'City' : '',
    'Region': '',
    'PostalCode': ''
  };


  constructor(private formbuilder: FormBuilder,  private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {

    /* Load data */
    this.GetAllSupplier();

    /* Getting data from groupName  */
    this.SupplierForm = this.formbuilder.group({
      CompanyName: ['', Validators.required],
      ContactName: ['', Validators.required],
      ContactTitle: ['', Validators.required],
      Address: ['', Validators.required],
      Country: ['', Validators.required],
      Fax: ['', Validators.required],
      Phone: ['', Validators.required],
      City: ['', Validators.required],
      Region: ['', Validators.required],
      PostalCode: ['', Validators.required]
    });

     /* Trigger LogValidationErrors on every valueChange */
     this.SupplierForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.SupplierForm)
    })
  }

  /* Log Validation Errors */
  logValidationErrors(group: FormGroup = this.SupplierForm): void{
    Object.keys(group.controls).forEach((key: string) =>{
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup){
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)){
          const messages = this.validationMessages[key];
         
          for ( const errorKey in abstractControl.errors){
            if(errorKey){
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    })
  };

  /* Getting data from FormGroup to save to database MYSQL */
  CreateSupplier(){
    /* Check if form is valid or not */
    if(this.SupplierForm.valid){
      this.http.post('http://localhost:8080/northwind/supplier', this.SupplierForm.value).subscribe(response => {
        const Respond = JSON.parse(JSON.stringify(response));

        /* Check if data inserted or not */
        if(Respond.status){
          this.toastr.success(Respond.message, 'Perfect!');
          this.SupplierForm.reset();

          /* Load data after adding */
          this.GetAllSupplier();

        } else {
          this.toastr.error(Respond.message, 'Major Error', {
            timeOut: 5000,
          });
        }
      });

    } else{

      /* Toast error message */
      this.toastr.error('Please make sure all fields are Filled', 'Major Error', {
        timeOut: 3000,
      });

      /* Mark all as touched to get Validation messages */
      this.SupplierForm.markAllAsTouched();
      this.logValidationErrors(this.SupplierForm)
      Object.keys(this.SupplierForm.controls).forEach(field => { // {1}
        const control = this.SupplierForm.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    }
  }

  /* Get all Suppliers */
  GetAllSupplier(){
    this.http.get('http://localhost:8080/northwind/Getsuppliers').subscribe(response => {
      const Respond = JSON.parse(JSON.stringify(response));
      this.Suppliers = Respond;
      console.log( this.Suppliers)
    });
  }
}
