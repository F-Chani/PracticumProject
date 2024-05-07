import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PositionService } from '../../Services/position/position.service';
import { Position } from '../../models/Position.model';
import { AddPositionComponent } from '../add-position/add-position.component';


@Component({
  selector: 'app-all-positions',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './all-positions.component.html',
  styleUrl: './all-positions.component.scss'
})
export class AllPositionsComponent implements OnInit {

  positions: Position[] = [];

  constructor(private positionService: PositionService, private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.loadPosition()
  }
  loadPosition() {
    this.positionService.getAllPositions().subscribe((positions) => {
      this.positions = positions;
    });
  }
  addPosition(): void {
    const dialogRef = this.dialog.open(AddPositionComponent, {
      width:"300px",
      disableClose: true, // לא לאפשר סגירה על ידי לחיצה מחוץ לדיאלוג
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The add position dialog was closed');
      this.loadPosition();
    });
  }

  cancel(): void {
    this.dialog.closeAll();
  }

}
