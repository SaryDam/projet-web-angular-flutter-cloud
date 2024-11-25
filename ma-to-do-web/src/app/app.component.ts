import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  imports: [RouterModule], // Importation nécessaire pour `<router-outlet>`
})
export class AppComponent {
  title = 'ma-to-do-web';
}
