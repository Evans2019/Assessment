import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-catergory',
  templateUrl: './catergory.component.html',
  styleUrls: ['./catergory.component.css']
})
export class CatergoryComponent implements OnInit {

  /* FormGroup name that will hold all data from the form */
  CatergoryForm: FormGroup;

  /* Store all Categories */
  Categories;

  /* Validation Messages */
  validationMessages = {
    'CatergoryName':{
      'required':'Catergory Name is required',
      'minlength':'Catergory Name must be greater then 2 characters'
    },
    'Description':{
      'required':' Description is required'
    }
  };

  /* Form error for all field failed */
  formErrors = {
    'CatergoryName' : '',
    'Description': ''
  };

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {

    /* Load Category data */
    this.GetAllCategories();

     /* Getting data from groupName  */
    this.CatergoryForm = this.formbuilder.group({
      CatergoryName: ['', [Validators.required, Validators.minLength(2)]],
      Description: ['', Validators.required],
      Picture: ['', Validators.required]
    });

    /* Trigger LogValidationErrors on every valueChange */
    this.CatergoryForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.CatergoryForm)
      
    })

    }

    /* Log Validation Errors */
    logValidationErrors(group: FormGroup = this.CatergoryForm): void{
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
    CreateCatergory(): void {
     
      /* Check if form is valid or not */
      if(this.CatergoryForm.valid){
        this.http.post('http://localhost:8080/northwind/catergory', this.CatergoryForm.value).subscribe(response => {
          const Respond = JSON.parse(JSON.stringify(response));
          
          /* Check if data inserted or not */
          if(Respond.status){

            /* Toast to display Success message */
            this.toastr.success(Respond.message, 'Perfect!');
            /* Reset Form */
            this.CatergoryForm.reset();

            /* Load Category data */
            this.GetAllCategories();

          } else {
            /* Toast to display error message */
            this.toastr.error(Respond.message, 'Major Error', {
              timeOut: 5000,
            });
          }
        });

      } else{

        /* Toast to display error message */
        this.toastr.error('Please make sure all fields are Filled', 'Major Error', {
          timeOut: 3000,
        });
        /* Mark all as touched to get Validation messages */
        this.CatergoryForm.markAllAsTouched();
        this.logValidationErrors(this.CatergoryForm)
        Object.keys(this.CatergoryForm.controls).forEach(field => { // {1}
          const control = this.CatergoryForm.get(field);            // {2}
          control.markAsTouched({ onlySelf: true });       // {3}
        });
      }
    }

    /* Get all products */
    GetAllCategories(){
    this.http.get('http://localhost:8080/northwind/Getcatergories').subscribe(response => {
      const Respond = JSON.parse(JSON.stringify(response));
      this.Categories = Respond;
      console.log(this.Categories);
    });
  }
}
