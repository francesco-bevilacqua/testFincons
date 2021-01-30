import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlUsers = 'https://dds-test-mock-data.s3-eu-west-1.amazonaws.com/users/list.json';
  urlUserDetail = 'https://dds-test-mock-data.s3-eu-west-1.amazonaws.com/users/{id}.json';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  public recuperaUsers(){
    return this.http.get(this.urlUsers).toPromise();
  }
  // tslint:disable-next-line:typedef
  public recuperaUserDetail(id){
    return this.http.get(this.urlUserDetail.replace('{id}', id)).toPromise();
  }
}
