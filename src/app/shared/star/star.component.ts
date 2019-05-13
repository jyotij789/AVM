import { Component, OnInit, OnChanges, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {


    @Input() rating = 0;
    starWidth = 10;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
    constructor() { }


    ngOnChanges() {
        this.starWidth = this.rating * 96 / 5;
        // console.log("ngOnChanges called", this.starWidth, this.rating);

    }
    onClick(): void {
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
    }
}
