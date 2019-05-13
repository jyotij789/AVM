import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service'
import { Observable } from 'rxjs/Observable';
import { Product } from '../product-data'
import { UtilService } from '../../shared/utils-service';
import { StarComponent } from '../../shared/star/star.component';
import { ComponentCriteriaComponent } from '../../shared/component-criteria/component-criteria.component'
import { ProductParameterService } from '../product-parameter.service';
@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    @ViewChild(ComponentCriteriaComponent) filterComponent: ComponentCriteriaComponent;
    pageTitle: string = 'Product List';
    errorMessage: string = '';
    imageWidth: number = 30;
    imageMargin: number = 2;
    showCriteria: boolean = true;
    sortByName: boolean;
    sortByPrice: boolean;
    // _listFilter: string = '';
    get showImage(): boolean {
        return this.parameterService.showImage;
    }
    set showImage(value: boolean) {
        this.parameterService.showImage = value;
    }

    // get listFilter(): string {
    //     return this._listFilter;
    // }
    // set listFilter(value: string) {
    //     this._listFilter = value;
    //     console.log('_listFilter', this._listFilter);
    //     this.filteredProducts = this._listFilter ? this.performFilter(this._listFilter) : this.products;
    // }
    products: Product[];
    filteredProducts: Product[];
    constructor(public parameterService: ProductParameterService, public productService: ProductService, public utilService: UtilService) { }

    ngOnInit(): void {
        console.log("ngOninit of ProductListComponent");
        this.getProducts();
    }

    performFilter(filterBy: string) {
        console.log('inside performFilter');
        if (filterBy) {
            filterBy = filterBy.toLocaleLowerCase();
            return this.filteredProducts = this.products.filter((product: Product) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
        else {
            this.filteredProducts = this.products;
        }

    }

    getProducts() {
        this.productService.getProducts().then((response) => {
            this.products = response;
            this.filteredProducts = this.products;
            this.filterComponent.listFilter = this.parameterService.filterValue;
            console.log("products", response);
            this.utilService.shrowToast('Succesfully listed products', 'Success', 'success')

        })
            .catch((error) => {
                this.utilService.shrowToast('Failed to list products', 'Error', 'error')
                console.log("error==>", error)

            })
    }
    onvalueChanges(value) {
        console.log("onvalueChanges()", value);
        this.parameterService.filterValue = value;
        this.performFilter(value);
    }
    toggleImage() {
        this.showImage = !this.showImage;
    }

    sortProductByName = () => {
        this.sortByName = !this.sortByName;
        this.sortByName ? this.filteredProducts.sort(sortProductAsc) : this.filteredProducts.sort(sortProductDsc);

    }
    sortProductByPrice = () => {
        this.sortByPrice = !this.sortByPrice;
        this.sortByPrice ? this.filteredProducts.sort(sortProductPriceAsc) : this.filteredProducts.sort(sortProductPriceDsc);

    }

}
function sortProductAsc(s1, s2) {
    if (s1.productName > s2.productName) return 1
    else if (s1.productName === s2.productName) return 0
    else return -1
}
function sortProductDsc(s1, s2) {
    if (s1.productName < s2.productName) return 1
    else if (s1.productName === s2.productName) return 0
    else return -1
}

function sortProductPriceAsc(s1, s2) {
    console.log("s1 and s2--->", s1, s2);
    return s2.price - s1.price;

}
function sortProductPriceDsc(s1, s2) {
    console.log("s1 and s2 ===>", s1, s2);
    return s1.price - s2.price;

}