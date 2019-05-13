import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product-data';
import { UtilService } from '../../shared/utils-service';
import { ActivatedRoute, Router } from '@angular/router';
import { StarComponent } from '../../shared/star/star.component'
@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    product: Product;
    constructor(public util: UtilService, public productService: ProductService, public route: ActivatedRoute, public router: Router, ) {

    }

    ngOnInit() {
        this.getProductId();
    }

    getProductId(): void {

        this.route.paramMap.subscribe((params) => {
            let id = +params.get('id');
            if (id) {
                return this.getProduct(id);
            }
        })
    }

    getProduct(id: number) {
        this.productService.getProduct(id).then((response) => {
            this.product = response;
        })
            .catch((error) => {
                this.util.shrowToast(error, 'Error', error)
            })
    }

    onBack() {
        this.router.navigate(['/products'])
    }
}
