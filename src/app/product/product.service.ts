import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Product, products } from './product-data'
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { resolve } from 'path';
import { findIndex } from 'rxjs/operator/findIndex';

@Injectable()
export class ProductService {
    currentProduct: Product;
    productsUrl: 'api/products';
    // productsList:Product[];
    constructor() {
    }

    public getProducts() {
        return new Promise<Product[]>((resolve, reject) => {
            console.log(products.length);
            if (products) {
                resolve(products);
            }
            reject(this.error);
        })
    }

    error(arg0: any): any {
        throw new Error("Fialed to pass products.");
    }

    public getProduct(pid: number) {
        return new Promise<any>((resolve, reject) => {
            products.filter(product => {
                if (pid == 0) {
                    console.log("zero condition called", pid);
                    resolve(this.initializeProduct(0));
                }
                else if (product.id == pid) {
                    resolve(product);
                    console.log("filter called ==>", product);
                }
                // reject(this.error);
            })
        })
    }
    private initializeProduct(pid): Product {
        return {
            id: 0,
            productName: null,
            productCode: null,
            tags: [' '],
            releaseDate: null,
            price: null,
            description: null,
            starRating: null,
            imageUrl: null
        }
    }

    public createProduct(product: Product) {
        console.log("update product", product);
        return new Promise<any>((resolve, reject) => {
            if (products) {
                // products.length === 0 ? product.id = 0 : product.id = products.length + 1;
                product.id = products.length + 1;
                products.push(product);
                resolve(products);
            }
            else {
                reject(this.error);
            }
        })
    }

    public saveProduct(product: Product) {
        console.log("save product", product);
        return new Promise<Product>((resolve, reject) => {
            products.forEach(item => {
                // console.log(item.id == product.id);
                if (item.id == product.id) {
                    // console.log("inside if");
                    item.id = product.id;
                    item.productCode = product.productCode;
                    item.productName = product.productName;
                    item.description = product.description;
                    item.tags = product.tags;
                    item.starRating = (product.starRating);
                    // console.log(item);
                    resolve(item);
                }
            })
            reject(this.error);
        })
    }

    public deleteProduct(index: number) {
        let i = products.findIndex(x => x.id === index);
        return new Promise<boolean>((resolve, reject) => {
            products.forEach(item => {
                if (item.id == index) {
                    console.log("index ==>", i);
                    products.splice(i, 1);
                    resolve(true);
                }
            })
            reject(false);
        })
    }
}