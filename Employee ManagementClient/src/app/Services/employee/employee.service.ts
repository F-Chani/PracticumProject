import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../models/Employee.model';
import { EmployeePost } from '../../models/EmployeePost.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  basicUrl = 'https://localhost:7099/api/Employee';
  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.basicUrl);
  }
  getEmployeeById(identity: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.basicUrl}/${identity}`);
  }
  addNewEmployee(employee: EmployeePost): Observable<EmployeePost[]> {
    return this.http.post<EmployeePost[]>(this.basicUrl, employee);
  }
  updateEmployee(currentIdentity: string, newIdentity: string, employee: EmployeePost): Observable<EmployeePost[]> {
    console.log("currentIdentity: ", currentIdentity, " newIdentity: ", newIdentity, " employee: ", employee);
    console.log('updateEmployee in service');

    const params = new HttpParams().set('newIdentity', newIdentity);
    return this.http.put<EmployeePost[]>(`${this.basicUrl}/${currentIdentity}`, employee, { params });
}

  deleteEmployee(identity:string):Observable<Employee>{
    return this.http.delete<Employee>(`${this.basicUrl}/${identity}`);
  }
}
