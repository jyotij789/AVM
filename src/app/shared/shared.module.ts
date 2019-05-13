import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star/star.component';
import { FormsModule } from '@angular/forms';
import { NumberValidator } from './number-validator';
import { ComponentCriteriaComponent } from './component-criteria/component-criteria.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        StarComponent,
        ComponentCriteriaComponent,
        ComponentCriteriaComponent
    ],
    exports: [
        StarComponent,
        ComponentCriteriaComponent,
        CommonModule,
        FormsModule
    ],
    providers: [
        NumberValidator
    ]

})
export class SharedModule {
    constructor() {
        // alert("shared module called");
    }
}
