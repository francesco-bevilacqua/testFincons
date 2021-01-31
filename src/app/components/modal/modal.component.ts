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
  @Input() userId: {};
  @Input() userDetail: any ;
  userDetailFormatted: any = {};
  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

}
