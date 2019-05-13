import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-component-criteria',
    templateUrl: './component-criteria.component.html',
    styleUrls: ['./component-criteria.component.css']
})
export class ComponentCriteriaComponent implements OnInit, AfterViewInit, OnChanges {


    @Input() showfilterCriteria: boolean;
    @Input() hitCount: number;
    @Output() valueChanges: EventEmitter<string> = new EventEmitter<string>();
    _listFilter: string = '';
    hitMessage: string;

    @ViewChild('filterElement') filterElementRef: ElementRef;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log('_listFilter', this._listFilter);
        // this.filteredProducts = this._listFilter ? this.performFilter(this._listFilter) : this.products;
        this.valueChanges.emit(this._listFilter);
    }
    constructor() { }

    ngOnInit() {
    }
    ngAfterViewInit(): void {
        if (this.filterElementRef.nativeElement) {
            this.filterElementRef.nativeElement.focus();

        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log("changes", changes)
        if (changes['hitCount'] && !changes['hitCount'].currentValue) {
            this.hitMessage = 'No match found';

        }
        else {
            this.hitMessage = 'Hits: ' + this.hitCount;

        }
    }
}
