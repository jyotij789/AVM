import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditGuard } from './product-edit/product-edit.guard';
import { ProductShellComponent } from './product-shell/product-shell/product-shell.component';

//products/:id ==>ProductDetailComponent
//products/:id/edit ==>ProductEditComponent
const routes: Routes = [
    {
        path: '',
        component: ProductListComponent,
        // component: ProductShellComponent
    },
    {
        path: ':id/edit',
        canDeactivate: [ProductEditGuard],
        component: ProductEditComponent

    },
    {
        path: 'detail/:id',
        component: ProductDetailComponent

    },
    {
        path: 'add',
        component: ProductAddComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
