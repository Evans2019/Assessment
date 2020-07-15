import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  /* This variables will be used to filter */
  category;
  supplier;

  ButtonFilterText = "Filter with Supplier ID";

  /* FormGroup name that will hold all data from the form */
  ProductForm: FormGroup;

  /* Categories */
  Categories;

  /* Suppliers */
  Suppliers;

  /* Store Products */
  Products;

  /* Validation Messages */
  validationMessages = {
    'Productname':{
      'required':'This Field is required'
    },
    'Supplierid':{
      'required':' This Field is required'
    },
    'CatergoryId':{
      'required':' This Field is required'
    },
    'QuantityPerUnit':{
      'required':' This Field is required'
    },
    'UnitPrice':{
      'required':' This Field is required'
    },
    'UnitsInStock':{
      'required':' This Field is required'
    },
    'UnitsOnOrder':{
      'required':' This Field is required'
    },
    'ReorderLevel':{
      'required':' This Field is required'
    },
    'Discountinued':{
      'required':' This Field is required'
    }
  };

  /* Form error for all field failed */
  formErrors = {
    'Productname' : '',
    'Supplierid': '',
    'CatergoryId': '',
    'QuantityPerUnit': '',
    'UnitPrice': '',
    'UnitsInStock': '',
    'UnitsOnOrder': '',
    'ReorderLevel': '',
    'Discountinued': ''
  };

  /* Swicth buttons */
  CategoryisShow = false;
  SupplierisShow = true;

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    

    /* Load suppliers */
    this.GetAllSupplier();

    /* Load Categories */
    this.GetAllCategories();

    /* Load Products */
    this.GetAllProducts();

    /* Getting data from groupName  */
    this.ProductForm = this.formbuilder.group({
      Productname: ['', Validators.required],
      Supplierid: ['', Validators.required],
      CatergoryId: ['', Validators.required],
      QuantityPerUnit: ['', Validators.required],
      UnitPrice: ['', Validators.required],
      UnitsInStock: ['', Validators.required],
      UnitsOnOrder: ['', Validators.required],
      ReorderLevel: ['', Validators.required],
      Discountinued: ['', Validators.required],
    });

    /* Trigger LogValidationErrors on every valueChange */
    this.ProductForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.ProductForm)
    })
    this.ProductForm.reset();
  }

  /* Log Validation Errors */
  logValidationErrors(group: FormGroup = this.ProductForm): void{
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
  CreateProduct(){
    /* Check if form is valid or not */
    if(this.ProductForm.valid){
      this.http.post('http://localhost:8080/northwind/product', this.ProductForm.value ).subscribe(response => {
        const Respond = JSON.parse(JSON.stringify(response));
         /* Check if data inserted or not */
        if(Respond.status){
          this.toastr.success(Respond.message, 'Perfect!');
          this.ProductForm.reset();

          /* Load Products */
          this.GetAllProducts();

        } else {
          this.toastr.error(Respond.message, 'Major Error', {
            timeOut: 5000,
          });
        }
      });

    } else{
      /* Toast for error message */
      this.toastr.error('Please make sure all fields are Filled', 'Major Error', {
        timeOut: 3000,
      });
      /* Mark all as touched to get Validation messages */
      this.ProductForm.markAllAsTouched();
      this.logValidationErrors(this.ProductForm)
      Object.keys(this.ProductForm.controls).forEach(field => { // {1}
        const control = this.ProductForm.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    }
  }

  /* Get all products */
  GetAllProducts(){
    this.http.get('http://localhost:8080/northwind/Getproducts').subscribe(response => {
      const Respond = JSON.parse(JSON.stringify(response));
      this.Products = Respond;
    });
  }

    /* Get all Suppliers IDs and Names */
   GetSuppliers(){
    this.http.get('http://localhost:8080/northwind/Getproducts').subscribe(response => {
      const Respond = JSON.parse(JSON.stringify(response));
    });
  }

  /* Get all Categories */
  GetAllCategories(){
    this.http.get('http://localhost:8080/northwind/Getcatergories').subscribe(response => {
      const Respond = JSON.parse(JSON.stringify(response));
      this.Categories = Respond;
      console.log(this.Categories);
    });
  }

  /* Get all Suppliers */
  GetAllSupplier(){
    this.http.get('http://localhost:8080/northwind/Getsuppliers').subscribe(response => {
      const Respond = JSON.parse(JSON.stringify(response));
      this.Suppliers = Respond;
      console.log( this.Suppliers)
    });
  }

  /* Category filter with Category Id */
  Search(){
    if(this.category != ""){
      this.Products = this.Products.filter(res=>{
        return res.CatergoryId.toLocaleLowerCase().match(this.category.toLocaleLowerCase());
      })
    } else{
      this.ngOnInit();
    }
  }

  /* Filter with Supplier ID */
  SearchSupplier(){
    if(this.supplier != ""){
      this.Products = this.Products.filter(res=>{
        return res.Supplierid.toLocaleLowerCase().match(this.supplier.toLocaleLowerCase());
      })
    } else{
      this.ngOnInit();
    }
  }

  /* Change filter button text and input */
   toggleDisplay() {
    this.CategoryisShow = !this.CategoryisShow;
    this.SupplierisShow = !this.SupplierisShow;

    /* Assign to correct button text */
    if(this.CategoryisShow){
      this.ButtonFilterText = "Filter with Category ID";
    }else{
      this.ButtonFilterText = "Filter with Supplier ID";
    }
  }
}
