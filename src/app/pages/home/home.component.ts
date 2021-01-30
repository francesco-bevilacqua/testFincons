import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: any;
  usersView: any;
  filtro: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
   this.userService.recuperaUsers().then(data => {
     this.users = data;
     this.usersView = data;
   });
  }
  updateUsersTable(filtro): void {
      this.filtro = filtro;
      let newUsers = JSON.parse(JSON.stringify(this.users));

      if (filtro.firstName !== '' && filtro.firstName !== null) {
        newUsers = this.users.filter(user => user.firstName.toLowerCase().includes(filtro.firstName.toLowerCase()));
      }
      if ( filtro.lastName !== '' && filtro.lastName !== null) {
        newUsers = newUsers.filter(user => user.lastName.toLowerCase().includes(filtro.lastName.toLowerCase()));
        }
      if ( filtro.active !== 'All') {
        const isActive = filtro.active === 'Active' ? true : false ;
        newUsers = newUsers.filter(user => user.isActive === isActive);
      }
      if ( filtro.gender !== 'All') {
        newUsers = newUsers.filter(user => user.gender === filtro.gender);
      }
      this.usersView = newUsers;

  }

}
