import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'something-went-wrong',
  templateUrl: './something-went-wrong.component.html',
  styleUrls: ['./something-went-wrong.component.scss']
})
export class SomethingWentWrongComponent {
  @Output() tryAgainEvent = new EventEmitter<any>();

  tryAgain(): void {
    this.tryAgainEvent.emit();
  }
}
