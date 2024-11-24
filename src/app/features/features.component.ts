import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeedbackComponent } from '../shared/feedback/feedback.component';
import { MenuComponent } from '../shared/menu/menu.component';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, FeedbackComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {

}
