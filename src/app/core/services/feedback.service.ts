import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface FeedbackMessage {
  type: 'success' | 'error';
  message: string;
  duration: number;
}
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private readonly feedbackSubject = new BehaviorSubject<FeedbackMessage | null>(null);
  feedback$ = this.feedbackSubject.asObservable();

  constructor() {}

  showSuccess(message: string, duration: number = 5000) {
    this.feedbackSubject.next({ type: 'success', message, duration });
  }

  showError(message: string, duration: number = 5000) {
    this.feedbackSubject.next({ type: 'error', message, duration });
  }

  clearFeedback() {
    this.feedbackSubject.next(null);
  }
}
