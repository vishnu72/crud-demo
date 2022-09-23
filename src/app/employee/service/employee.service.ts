import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { Employee } from '../employee.model';

@Injectable()
export class EmployeeService {
  private basUrl: string;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(
    public http: HttpClient
  ) {
    this.basUrl = 'http://localhost:3000/';
  }


  getEmployee(): Observable<any> {
    const url: string = this.basUrl + 'employee'
    return this.http.get(url);
  }
  getEmployeeById(id: number): Observable<any> {
    const url: string = this.basUrl + 'employee/'+id;
    return this.http.get(url);
  }
  addEmployee(employeeForm: Employee): Observable<any> {
    const url: string = this.basUrl + 'employee'
    return this.http.post(url, employeeForm);
  }
  deleteEmployee(id: number): Observable<any> {
    const url: string = this.basUrl + 'employee/' + id
    return this.http.delete(url);
  }
  updateEmployee(users: Employee, id: number): Observable<any> {
    const url: string = this.basUrl + 'employee/' + id
    return this.http.put(url, users);
  }
}
