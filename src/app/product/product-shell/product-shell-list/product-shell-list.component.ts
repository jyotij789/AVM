import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../product-data';
import { UtilService } from '../../../shared/utils-service';
import { ProductParameterService } from '../../product-parameter.service';

@Component({
    selector: 'app-product-shell-list',
    templateUrl: './product-shell-list.component.html',
    //   styleUrls: ['./product-shell-list.component.css']
})
export class ProductShellListComponent implements OnInit {
    filteredProducts: Product[];
    products: Product[];
    constructor(public productService: ProductService, public utilService: UtilService) { }

    ngOnInit() {
        this.getProducts();
    }
    getProducts() {
        this.productService.getProducts().then((response) => {
            this.products = response;
            // this.filteredProducts = this.products;
            console.log("products", response);
            this.utilService.shrowToast('Succesfully listed products', 'Success', 'success')

        })
            .catch((error) => {
                this.utilService.shrowToast('Failed to list products', 'Error', 'error')
                console.log("error==>", error)

            })
    }

    onSelect(product: Product) {
        console.log("butn clicked");
        this.productService.currentProduct = product;
    }

}
