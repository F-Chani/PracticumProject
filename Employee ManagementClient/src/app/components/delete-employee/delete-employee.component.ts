import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { EmployeeService } from '../../Services/employee/employee.service';
import { Employee } from '../../models/Employee.model';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.scss'
})
export class DeleteEmployeeComponent {

  constructor(private dialogRef: MatDialogRef<DeleteEmployeeComponent>,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee }) { }

  cancel(): void {
    this.dialogRef.close();
  }
  deleteEmployee(): void {
    if (this.data.employee && this.data.employee.identity) {
      this.employeeService.deleteEmployee(this.data.employee.identity).subscribe({
        next: (res) => {
          console.log("Employee deleted successfully");
          this.successSnackBar('Employee deleted successfully');
        },
        error: (err) => {
          console.error("Error deleting employee:", err);
          this.errorSnackBar('Not success to delete employee');
        }
      });
    } else {
      console.error("Invalid employee or missing identity");
    }
    this.dialogRef.close();
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
