import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../Services/position/position.service';
import { MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-position',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule],
  templateUrl: './add-position.component.html',
  styleUrl: './add-position.component.scss'
})
export class AddPositionComponent implements OnInit {

  positionForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddPositionComponent>,
    private positionServices: PositionService,
    private formBuilder: FormBuilder
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
    if (this.positionForm.valid) {
      this.positionServices.addPosition(this.positionForm.value).subscribe(result => {
        console.log("position added succsfully", result)
        this.dialogRef.close(this.positionForm.value);
      })
    } else {
      this.positionForm.markAllAsTouched();
    }
  }
}
