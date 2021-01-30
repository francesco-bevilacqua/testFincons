import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/user.service';
import {Utils} from '../../../utils/Utils';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() src;
  @Input() userId: {};
  userDetail: any = {lastAccess:{}};
  userDetailFormatted: any = {};
  showModalFlag = false;
  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.userService.recuperaUserDetail(this.userId).then(data => {
      this.userDetail = data;
      this.userDetailFormatted = data;
      this.userDetailFormatted.lastAccess.browser = Utils.getParsedUAString(this.userDetailFormatted.lastAccess.userAgent);
      this.showModalFlag = true;
    });
  }



  // tslint:disable-next-line:typedef
  showModal() {
    this.showModalFlag = (Object.keys(this.userDetail).length === 0 && this.userDetail.constructor === Object);
  }
}
