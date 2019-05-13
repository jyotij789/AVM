import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../product-data';

@Component({
    selector: 'app-product-shell-display',
    templateUrl: './product-shell-display.component.html',
    //   styleUrls: ['./product-shell-display.component.css']
})
export class ProductShellDisplayComponent implements OnInit {

    get product(): Product {
        return this.productService.currentProduct;
    }
    constructor(public productService: ProductService) { }

    ngOnInit() {
        // let product = this.productService.currentProduct;
        // console.log("product==>", product);
        // this.getProduct(4);
    }
    // getProduct(id: number) {
    //     this.productService.getProduct(id).then((response) => {
    //         this.product = response;
    //     })
    //         .catch((error) => {
    //             // this.util.shrowToast(error, 'Error', error)
    //         })
    // }

}
