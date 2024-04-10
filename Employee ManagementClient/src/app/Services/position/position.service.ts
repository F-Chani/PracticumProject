import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Position } from '../../models/Position.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  basicUrl = 'https://localhost:7099/api/Position';
  constructor(private http: HttpClient) { }


  getAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.basicUrl)
  }
  getPositionById(id: number): Observable<Position> {
    return this.http.get<Position>(`${this.basicUrl}/${id}`)
  }
  addPosition(position: Position): Observable<Position[]> {
    return this.http.post<Position[]>(this.basicUrl, position)
  }
}
