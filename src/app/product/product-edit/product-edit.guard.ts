import { Injectable, Component } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductEditComponent } from './product-edit.component'

@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent>{
    canDeactivate(component: ProductEditComponent): Observable<boolean> | Promise<boolean> | boolean {
        if (component.editProductForm.dirty) {
            const productName = component.editProductForm.get('productName').value || 'New Product';
            return confirm((`Navigate away and lose all the changes of :${productName}`));
        }
        return true;
    }

}
