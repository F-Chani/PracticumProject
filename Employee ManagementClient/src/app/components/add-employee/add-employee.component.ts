import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Position } from '../../models/Position.model';
import { EmployeeService } from '../../Services/employee/employee.service';
import { PositionService } from '../../Services/position/position.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef ,MatDialogModule} from '@angular/material/dialog';
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
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-add-employee',
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
    MatExpansionModule  
  ],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  positionEmployees: Position[] = [];

  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private employeeServices: EmployeeService, 
    private positionService: PositionService,
    private dialog:MatDialog,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,) { }

  ngOnInit(): void {
    this.buildEmployeeForm();
    this.fetchPositions();
  }


  buildEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      identity: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      startOfWorkDate: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      positionEmployees: this.formBuilder.array([], Validators.required)
    });
  }

  fetchPositions(): void {
    console.log("fetchPosition")
    this.positionService.getAllPositions().subscribe({
      next: (positions: Position[]) => {
        this.positionEmployees = positions;
        console.log("positionsList:",this.positionEmployees)
        this.addNewControlToPosition();
      },
      error: (err) => {
        console.error("Error loading employees:", err);
      }
    });
  }

  get FormArray(): FormArray {
    return this.employeeForm.get('positionEmployees') as FormArray;
  }


  addNewControlToPosition(): void {
    console.log("addNewControlToPosition",this.positionEmployees.length)
     if(this.positionEmployees.length>0){
      this.FormArray.push(this.formBuilder.group({
        positionId: [Validators.required],
        isAdmin: [false],
        dateOfEntry: [Validators.required]
      }))
   }
    
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      const formEmployee = this.employeeForm.value;
      this.employeeServices.addNewEmployee(formEmployee).subscribe({
        next: (res) => {
          console.log("sucssfully employee added ")
          this.dialogRef.close(true)
          //להוסיף הודעה מתאימה שהצליח להתווסף עובד חדש
        },
        error: (err) => {
          //להוסיף הודעה מתאימה שלא הצליח להתווסף עובד חדש
          console.log("not sucssfully addEmployee")
        }
      })
    }
    else {
      this.employeeForm.markAllAsTouched();
      console.error('Form is not valid');
    }
  }

  notShowEmployeePosition(positionId: number, index: number): boolean {
    const select = this.employeeForm.value.positionEmployees.map((position: any) => position.positionId);
    return select.includes(positionId) && select.indexOf(positionId) !== index;
  }
  
  removeControlOfPosition(index: number): void {
    this.FormArray.removeAt(index);
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
