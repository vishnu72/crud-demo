import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employee.model';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  public employee: Employee;
  public id: string;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
  ) {
    this.employee = new Employee(0);
    this.id = ''
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getEmployee();
    });
  }

  ngOnInit(): void {

  }

  public getEmployee() {
    this.employeeService.getEmployeeById(Number(this.id)).subscribe((employee: Employee) => {
      this.employee = employee;
    })
  }
}
