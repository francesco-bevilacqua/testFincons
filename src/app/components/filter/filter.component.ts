import {EventEmitter, Component, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() updateUsersTable: EventEmitter<any> = new EventEmitter<any>();
  filter = {firstName: '', lastName : '', gender : 'All', active: 'All'};

  changeFilter(value, type): void{
    this.filter[type] = value;
    this.updateUsersTable.emit(this.filter);
  }
  constructor() {
  }

  ngOnInit(): void {
    this.filter = {firstName: null, lastName : null, gender : 'All', active: 'All'};
  }

}
