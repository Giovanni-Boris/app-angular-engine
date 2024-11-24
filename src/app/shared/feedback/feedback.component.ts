import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedbackService } from '../../core/services/feedback.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  feedback: { type: 'success' | 'error'; message: string } | null = null;
  private subscription!: Subscription;

  constructor(
    private readonly feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.subscription = this.feedbackService.feedback$.subscribe((feedback) => {
      this.feedback = feedback;

      if (feedback) {
        setTimeout(() => this.clearFeedback(), feedback.duration);
      }
    });
  }

  clearFeedback(): void {
    this.feedbackService.clearFeedback();
    this.feedback = null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
