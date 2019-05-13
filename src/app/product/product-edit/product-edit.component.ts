import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder, AbstractControl, FormArray, FormControl, ValidatorFn, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product-data';
import { UtilService } from '../../shared/utils-service';
import { NumberValidator } from '../../shared/number-validator'
import { Observable, Subscription } from 'rxjs';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from '../../shared/generic-validator';

export function range(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        console.log(c);
        if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        }
        return null;
    }
}
@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, AfterViewInit {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    displayMessage: { [key: string]: string; };
    editProductForm: FormGroup;
    pageTitle = 'Product Edit';
    product: Product;
    private genericValidator: GenericValidator;
    get tags(): FormArray {
        return <FormArray>this.editProductForm.get('tags');
    }
    validationMessages: { [key: string]: { [key: string]: string } }
    constructor(public utilService: UtilService, public fb: FormBuilder, public route: ActivatedRoute, public router: Router, public productService: ProductService) {
        this.validationMessages = {
            productName: {
                required: 'Product name is required.',
                minlength: 'Product name must be at least three characters.',
                maxlength: 'Product name cannot exceed 50 characters.'
            },
            productCode: {
                required: 'Product code is required.'
            },
            description: {
                required: 'product description is required.'
            },
            // starRating: {
            //     range: 'Rate the product between 1 (lowest) and 5 (highest).'
            // }
        };
        this.genericValidator = new GenericValidator(this.validationMessages);
        // console.log("this.validationMessages", this.genericValidator);
    }

    ngOnInit() {
        this.createEditForm();

    }

    createEditForm() {
        this.editProductForm = this.fb.group({
            productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            productCode: ['', [Validators.required]],
            starRating: ['', [Validators.required, range(3, 5)]],
            description: ['', [Validators.required]],
            tags: this.fb.array([])
        })
        this.getProductId();

    }

    onfocus() {
        console.log(this.editProductForm.get('starRating'));
    }
    ngAfterViewInit(): void {
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
        // Merge the blur event observable with the valueChanges observable
        // so we only need to subscribe once.
        merge(this.editProductForm.valueChanges, ...controlBlurs).pipe(
            debounceTime(800)
        ).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.editProductForm);
            // console.log("displayMessage", this.displayMessage);
            // console.log("editProductForm", this.editProductForm);

        });
    }
    getProductId() {
        this.route.paramMap.subscribe(params => {
            const id = +params.get('id');
            // console.log("params id", id);
            this.getProduct(id);
        })
    }

    getProduct(id) {
        // console.log("params id", id);
        this.productService.getProduct(id).then((response => {
            console.log("response", response);
            this.utilService.shrowToast('Success in get Product', 'Success', 'success');
            this.displayProduct(response);
        }),
            (error) => {
                this.utilService.shrowToast('Error in get Product', 'Error', 'error');
            });

    }
    displayProduct(product: Product) {
        if (this.editProductForm) {
            this.editProductForm.reset();
        }
        this.product = product;
        if (product.id === 0) {
            this.pageTitle = 'Add Product';
        }
        else {
            this.pageTitle = `Edit Product :${this.product.productName}`;
        }
        //bindning values
        this.editProductForm.patchValue({
            productName: this.product.productName,
            productCode: this.product.productCode,
            starRating: this.product.starRating,
            description: this.product.description
        })
        this.editProductForm.setControl('tags', this.fb.array(this.product.tags || []));
        // console.log("product", this.product);
        // console.log("editProductForm", this.editProductForm);

    }
    addTag(): void {
        this.tags.push(new FormControl());
    }
    deleteTag(index: number) {
        this.tags.removeAt(index);
        this.tags.markAsDirty();
    }
    onSubmit() {
        this.updateProduct();
    }
    updateProduct() {
        if (this.editProductForm.valid) {
            if (this.editProductForm.dirty) {
                // console.log("this.editProductForm.value", this.editProductForm.value);
                // console.log("this.product==>", this.product);
                const p = { ...this.product, ...this.editProductForm.value };
                if (this.product.id === 0) {
                    this.productService.createProduct(p).then(response => {
                        // console.log("ONcreate first", response);
                        this.onSaveProduct();

                    })
                        .catch((error) => {
                            this.utilService.shrowToast(error, 'Error', 'error')

                        });
                }
                else {
                    this.productService.saveProduct(p).then(response => {
                        this.onSaveProduct();
                        this.utilService.shrowToast('Product updtaed successfully', 'Info', 'info')
                    })
                        .catch((error) => {
                            this.utilService.shrowToast(error, 'Error', 'error')

                        });
                }
            }
            else {
                this.utilService.shrowToast('No changes to save', 'Info', 'info')
            }
        }
        else {
            this.utilService.shrowToast('Please correcy the validation errors!.', 'Error', 'error')

        }
    }
    deleteProdunct() {
        if (this.product.id === 0) {
            this.onSaveProduct();
        }
        else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id).then(response => {
                    if (response) {
                        this.onSaveProduct();
                    }
                })
                    .catch(error => {
                        this.utilService.shrowToast(error, 'Error', 'error')

                    })
            }

        }

    }
    onSaveProduct() {
        this.editProductForm.reset();
        this.router.navigate(['/products']);
    }

}
