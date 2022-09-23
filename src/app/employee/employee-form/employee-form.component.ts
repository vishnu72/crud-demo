import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { Employee } from '../employee.model';
import { EmployeeService } from '../service/employee.service';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  public employeeData: Employee[];
  // public employeeData$: Observable<Employee[]>;

  public isSubmitted: boolean = false;
  public title: string;
  public employeeForm: FormGroup;

  // public empname: string

  public id: any;
  constructor(
    public formbuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {
    this.title = 'Add';

    this.employeeForm = new FormGroup('');
    this.employeeData = [];
    this.employeeFormBuilder();
    this.getEmployee();
    console.log(this.route)
    // this.id = this.route.snapshot.params['id'];
    // this.getEmployeeById()

    this.route.params.subscribe(params => {

      debugger
      this.id = params['id'];
      this.getEmployeeById()
    });

  }


  ngOnInit(): void {
  }

  public onSubmit(): void {
    this.isSubmitted = true;
    if (this.employeeForm.valid) {
      this.isSubmitted = false;
      if (this.id) {
        this.updateEmployee()
      }
      else {

        this.employeeService.addEmployee(this.employeeForm.value).subscribe((response) => {
          this.getEmployee();
        });

        this.employeeForm.reset();
        // console.log(this.employeeData);
      }
    }
  }

  public updateEmployee(): void {
    this.employeeService.updateEmployee(this.employeeForm.value, this.id).subscribe((response) => {
      this.getEmployee();
    });
  }

  public onReset(): void {
    this.employeeForm.reset();
  }

  EditEmployee(data: Employee) {
    this.employeeForm.patchValue(data);
    this.title = "Edit";
  }

  private getEmployeeById(): void {
    this.employeeService.getEmployeeById(this.id).subscribe((employee: Employee) => {
      this.employeeForm.patchValue(employee);
    });
  }

  private employeeFormBuilder(): void {
    this.employeeForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      // Gender: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      dob: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      id: [],
    })
  }
  /**
   * getEmployee
   */
  private getEmployee(): void {
    // this.employeeService.getEmployee().subscribe((employee: Employee[]) => {
    //   console.log(employee);
    // });
    this.employeeService.getEmployee().subscribe((employee: Employee[]) => {
      this.employeeData = employee;
    })

    // this.employeeData$ = this.employeeService.getEmployee();

  }
  // /** Destroy the subscriber */
  // public ngOnDestroy(): void {
  //   this.destroy.next(true);
  //   this.destroy.complete();
  // }
}
