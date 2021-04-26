import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() color?: 'primary' | 'accent' = 'accent';
  @Input() size?: 'small' | 'regular' = 'regular'; 

  constructor() { }

  ngOnInit(): void {
  }

}
