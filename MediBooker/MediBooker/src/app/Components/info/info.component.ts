import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  @Input() content: string = '';
  @Input() alert: string = '';
  classList: string = 'border border-1 alert my-4 alert-';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['alert']) {
      this.classList = this.classList + changes['alert'].currentValue;
    }
  }

}
