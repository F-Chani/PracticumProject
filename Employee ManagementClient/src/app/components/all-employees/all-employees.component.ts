import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../models/Employee.model';
import { EmployeeService } from '../../Services/employee/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import * as XLSX from 'xlsx';
import { forkJoin } from 'rxjs';
import { PositionService } from '../../Services/position/position.service';
import { Position } from '../../models/Position.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AllPositionsComponent } from '../all-positions/all-positions.component';


@Component({
  selector: 'app-all-employees',
  standalone:true,
  imports:[ 
    CommonModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatToolbarModule,
  ],
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss']
})
export class AllEmployeesComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'startOfWorkDate', 'actions'];
  dataSource!: MatTableDataSource<Employee>; // תחילה מוגדרת ריקה
  filter!: string;
  employeesData!: any[];
  positionsMap: Map<number, string> = new Map<number, string>();
  constructor(private employeeService: EmployeeService, private positionService: PositionService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.loadEmployees();
    this.fetchDataForExcel();
  }

  loadEmployees(): Employee[] {
    this.employeeService.getAllEmployee().subscribe({
      next: (res: Employee[]) => {
        this.employees = res;
        this.employeesData = res;
        console.log("employeeData: ", this.employeesData)
        this.dataSource = new MatTableDataSource(this.employees); // מעדכן את הנתונים בתוך dataSource
        console.log("employees", this.employees)
      },
      error: (err) => {
        console.error("Error loading employees:", err);
      }
    });
    return this.employees;
  }


  editDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '500px',
      disableClose: true, 
      data: { employee }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees()
      }
    });
  }
  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '500px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees();
      }
    });
  }
  openPositionDialog(): void {
    const dialogRef = this.dialog.open(AllPositionsComponent, {
      width: '500px',
      disableClose: true, // לא לאפשר סגירה על ידי לחיצה מחוץ לדיאלוג
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The all positions dialog was closed');
    });
  }
  printEmployee():void{
    window.print();
  }
  deleteDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      width: '500px',
      disableClose: true, 
      data: { employee }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees();
      }
    })
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  fetchDataForExcel(): void {
    forkJoin({
      employees: this.employeeService.getAllEmployee(),
      positions: this.positionService.getAllPositions()
    }).subscribe(({ employees, positions }) => {
      // Filtering deleted employees
      this.employeesData = employees;

      // Populate positions map with position IDs and names
      positions.forEach((position: Position) => {
        this.positionsMap.set(position.id, position.name);
      });
    });
  }

  downloadExcel(): void {
    const excelData: any[] = [];

    this.employeesData.forEach(employee => {
      const { identity, firstName, lastName, gender, dateOfBirth, startOfWorkDate, positionEmployees } = employee;

      positionEmployees.forEach((position: any) => {
        const { positionId, isAdmin, dateOfEntry } = position;

        const formattedDateOfBirth = this.formatDate(dateOfBirth);
        const formattedStartOfWorkDate = this.formatDate(startOfWorkDate);
        const formattedDateOfEntry = this.formatDate(dateOfEntry);

        const row = {
          'ID Number': identity,
          'First Name': firstName,
          'Last Name': lastName,
          'Gender': gender,
          'Date of Birth': formattedDateOfBirth,
          'Start of Work Date': formattedStartOfWorkDate,
          'Position Name': this.positionsMap.get(positionId) || 'Unknown',
          'Is Admin': isAdmin ? 'Yes' : 'No',
          'Date of Entry': formattedDateOfEntry
        };

        excelData.push(row);
      });
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');

    const today = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `Employees_${today}.xlsx`);
  }

  private formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  }

}


