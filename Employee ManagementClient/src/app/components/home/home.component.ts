import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { AllEmployeesComponent } from '../all-employees/all-employees.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent,AllEmployeesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
