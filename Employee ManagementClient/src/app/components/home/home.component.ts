import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { AllEmployeeComponent } from '../all-employee/all-employee.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent,AllEmployeeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
