import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { CatergoryComponent } from './pages/catergory/catergory.component';
import { from } from 'rxjs';


const routes: Routes = [
  { path : 'Home', component: HomeComponent },
  { path : 'Products', component: ProductsComponent },
  { path : 'Suppliers', component: SuppliersComponent },
  { path : 'Catergory', component: CatergoryComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}