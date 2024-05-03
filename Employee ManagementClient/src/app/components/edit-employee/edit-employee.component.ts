import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../Services/employee/employee.service';
import { Employee } from '../../models/Employee.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { PositionService } from '../../Services/position/position.service';
import { Position } from '../../models/Position.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  positionEmployees: Position[] = [];
  currentIdentity!: string;
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private dialogRef: MatDialogRef<EditEmployeeComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee }) { }
    
  ngOnInit(): void {
    const employee = this.data.employee;
    this.currentIdentity = employee.identity;
    this.getEmployeeForm(employee);
    this.loadPosition();

  }

  getEmployeeForm(employee: Employee): void {
    const genderLabel = employee.gender === 0 ? 'male' : 'female';
    this.employeeForm = this.formBuilder.group({
      identity: [employee.identity, [Validators.required, Validators.pattern(/^\d{9}$/)]],
      firstName: [employee.firstName, [Validators.required, Validators.pattern(/^[\p{L}\s]{2,}$/u)]],
      lastName: [employee.lastName, [Validators.required, Validators.pattern(/^[\p{L}\s]{2,}$/u)]],
      startOfWorkDate: [employee.startOfWorkDate, Validators.required],
      dateOfBirth: [employee.dateOfBirth, Validators.required],
      gender: [genderLabel, Validators.required],
      positionEmployees: this.formBuilder.array([], Validators.required)
    });

    this.getAllThePositionsEmployeeDetails(employee);
  }

  getAllThePositionsEmployeeDetails(employee: Employee): void {
    const positionsFormArray = this.employeeForm.get('positionEmployees') as FormArray
    employee.positionEmployees.forEach(position => {
      positionsFormArray.push(this.formBuilder.group({
        positionId: [position.position.id, Validators.required],
        isAdmin: [position.isAdmin, Validators.required],
        dateOfEntry: [position.dateOfEntry]
      }))
    })
  }

  get positionsFormArray(): FormArray {
    return this.employeeForm.get('positionEmployees') as FormArray;
  }

  loadPosition(): void {
    this.positionService.getAllPositions().subscribe({
      next: (res) => {
        console.log("positionEmployees in service", this.positionEmployees)
        this.positionEmployees = res;
      },
      error: (error) => {
        console.error('Not succsed loading positionsEmployee', error)
      }

    })
  }
  addPositionControl(): void {
    console.log('addPositionControl', this.positionsFormArray.value)
    this.positionsFormArray.push(this.formBuilder.group({
      positionId: ['', Validators.required],
      isAdmin: [false, Validators.required],
      dateOfEntry: [null]
    }))
    console.log('addPositionControl', this.positionsFormArray.value)
    this.xxx(this.positionsFormArray.length - 1)
  }
  xxx(index: number): void {
    console.log("this is the xxx", index)
    const positionControl = this.positionsFormArray.at(index).get('positionId')
    console.log("in xxx positionControl", positionControl)
    if (positionControl && this.positionEmployees.length > 0) {
      positionControl.setValue(this.positionEmployees[0].name);
    }
  }
  notShowEmployeePosition(positionId: number, index: number): boolean {
    const select = this.employeeForm.value.positionEmployees.map((position: any) => position.positionId);
    return select.includes(positionId) && select.indexOf(positionId) !== index;
  }

  removeControlOfPosition(index: number): void {
    this.positionsFormArray.removeAt(index);
  }
  cancel(): void {
    if (this.employeeForm.dirty) {
      const confirmCancel = confirm('Are you sure you want to cancel? Any unsaved changes will be lost.');
      if (confirmCancel) {
        this.dialogRef.close(false);
      }
    } else {
      this.dialogRef.close(false);
    }
  }
  onSubmit(): void {
    console.log('onSubmit', this.employeeForm.value)
    this.isLoading = true;
    console.log(this.isLoading)
    if (this.employeeForm.valid) {
      this.employeeService.updateEmployee(this.currentIdentity, this.employeeForm.value.identity, this.employeeForm.value)
        .subscribe({
          next: () => {
            this.successSnackBar('Employee update successfully');
            this.isLoading = false; // הסרת הספינר בסיום הקריאה
            this.dialogRef.close(true);
          },
          error: () => {
            this.errorSnackBar('Please fill in all required fields');
            this.isLoading = false; // הסרת הספינר בסיום הקריאה
          }
        })
    } else {
      this.employeeForm.markAllAsTouched();
      this.isLoading = false; // הסרת הספינר בסיום הקריאה
    }
  }
  successSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
  errorSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
