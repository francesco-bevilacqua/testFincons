import {Component, Directive, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewChildren} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import * as moment from 'moment';
import {Utils} from '../../../utils/Utils';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Input('users') users = [];

  constructor(public modalService: NgbModal, private userService: UserService) {  }
  colsTable =  [
    { key: 'avatar', title: 'AVATAR'},
    { key: 'firstName', title: 'First Name', sortable: 'none'},
    { key: 'lastName', title: 'Last Name', sortable: 'none'},
    { key: 'gender', title: 'Gender'},
    { key: 'isActive', title: 'Is Active'},
    { key: 'birthday', title: 'Birthday', sortable: 'none'},
    { key: '', title: 'Actions'}
    ];

  paginationConfig = {
    currentPage: 1,
    itemsPerPage: 20,
    totalItems: this.users.length
  };

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.sortingTable();
  }

  renderCell(user, key): any {
    return user[key];
  }
  changePage(newPage): void {
    this.paginationConfig.currentPage = newPage;
  }
  openDetailModal(link, user): void{

    let userDetailFormatted;

    this.userService.recuperaUserDetail(user.id).then(data => {
      userDetailFormatted = data;
      userDetailFormatted.lastAccess.browser = Utils.getParsedUAString(userDetailFormatted.lastAccess.userAgent);
      const modalRef = this.modalService.open(ModalComponent, {centered: true});
      modalRef.componentInstance.src = link;
      modalRef.componentInstance.userId = user.id;
      modalRef.componentInstance.userDetail = userDetailFormatted;
    }).catch(e => {
      console.log('errore lettura dettaglio', e);
    });

  }

  // tslint:disable-next-line:typedef
  onSort(sortable, key) {
       this.colsTable.filter(col => col.sortable).forEach(col => {
        if (col.key === key){
          if (sortable === 'none' || sortable === 'desc') {
            col.sortable = 'asc';
          }
          else if (sortable === 'asc') {
            col.sortable = 'desc';
 }
        }else{
          if (col.sortable) {
            col.sortable = 'none';
          }
        }
      });
       this.sortingTable();
  }

  getIconSort(sortable) {
    let res = '';
    if (sortable){
      if (sortable === 'desc') {
        res = '../../../assets/icon/iconTable/arrow-down.svg';
      }
      else if (sortable === 'asc'){
        res = '../../../assets/icon/iconTable/arrow-up.svg';
      }else if (sortable === 'none') {
        res = '../../../assets/icon/iconTable/arrow-down-up.svg';
 }
    }
    return res;
  }

   sortingTable() {
    const fieldSort = this.colsTable.filter(x => x.sortable && x.sortable != 'none');
    if (fieldSort.length > 0)
     {
       const sortColumn = fieldSort[0].key;
       const sortDirection = fieldSort[0].sortable;
       function compare( a, b, sortColumn, sortDirection ) {
         let tempA, tempB;
         if (sortColumn === 'birthday')
         {
           tempA  = moment.unix(a[sortColumn]).format('YYYY/MM/DD');
           tempB = moment.unix(b[sortColumn]).format('YYYY/MM/DD');
         }else{
           tempA = a[sortColumn];
           tempB = b[sortColumn];
         }
         if (sortDirection === 'asc') {
         return tempA.toLowerCase() > tempB.toLowerCase()  ? 1 : -1;
       } else if (sortDirection === 'desc') {
         return tempA.toLowerCase()  < tempB.toLowerCase()  ? 1 : -1;
       }
         return  0;
       }

       this.users.sort((a, b) => compare(a, b, sortColumn, sortDirection ));
     }
  }

}
