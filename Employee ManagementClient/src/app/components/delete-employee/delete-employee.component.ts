import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef ,MatDialogModule} from '@angular/material/dialog';
import { EmployeeService } from '../../Services/employee/employee.service';
import { Employee } from '../../models/Employee.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.scss'
})
export class DeleteEmployeeComponent {

  constructor(private dialogRef: MatDialogRef<DeleteEmployeeComponent>,
     private employeeService: EmployeeService,
     @Inject (MAT_DIALOG_DATA) public data:{employee:Employee}) { }

  cancel(): void {
    this.dialogRef.close();
  }
  deleteEmployee(): void {
    if (this.data.employee && this.data.employee.identity) {
      this.employeeService.deleteEmployee(this.data.employee.identity).subscribe({
        next: (res) => {
          console.log("Employee deleted successfully");
        },
        error: (err) => {
          console.error("Error deleting employee:", err);
        }
      });
    } else {
      console.error("Invalid employee or missing identity");
    }
    this.dialogRef.close();
  }

}
