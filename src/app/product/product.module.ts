
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductComponent } from './product.component';
import { ProductService } from './product.service';
import { ProductAddComponent } from './product-add/product-add.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductEditGuard } from './product-edit/product-edit.guard';
import { ProductParameterService } from './product-parameter.service';
import { ProductShellListComponent } from './product-shell/product-shell-list/product-shell-list.component';
import { ProductShellDisplayComponent } from './product-shell/product-shell-display/product-shell-display.component';
import { ProductShellComponent } from './product-shell/product-shell/product-shell.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ProductRoutingModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ProductComponent,
        ProductDetailComponent,
        ProductListComponent,
        ProductEditComponent,
        ProductAddComponent,
        ProductShellListComponent,
        ProductShellDisplayComponent,
        ProductShellComponent
    ],
    providers: [
        ProductService,
        ProductEditGuard,
        ProductParameterService
    ]
})
export class ProductModule {
    constructor() {
        // alert("product module");
    }
}
