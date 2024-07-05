import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-alumn',
  templateUrl: './welcome-alumn.component.html',
  styleUrls: ['./welcome-alumn.component.css']
})
export class WelcomeAlumnComponent {
  cerrarAlerta(event: any) {
    event.target.parentElement.style.display = 'none';
  }
}
