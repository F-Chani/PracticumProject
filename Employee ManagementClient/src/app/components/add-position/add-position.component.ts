import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../Services/position/position.service';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-position',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-position.component.html',
  styleUrl: './add-position.component.scss'
})
export class AddPositionComponent implements OnInit {

  positionForm!: FormGroup;
  isLoading = false;
  constructor(private dialogRef: MatDialogRef<AddPositionComponent>,
    private positionServices: PositionService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.positionForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  addPosition(): void {
    this.isLoading = true;
    if (this.positionForm.valid) {
      this.positionServices.addPosition(this.positionForm.value).subscribe({
        next: (result) => {
          console.log("position added succsfully", result);
          this.isLoading = false; // הסרת הספינר בסיום הקריאה
          this.dialogRef.close(this.positionForm.value);
          this.successSnackBar('Position added successfully');
        },
        error: () => {
          this.errorSnackBar('Add Position not successed');
          this.isLoading = false;
        }
      })} 
      else {
      this.isLoading = false; // הסרת הספינר בסיום הקריאה
      this.positionForm.markAllAsTouched();
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
