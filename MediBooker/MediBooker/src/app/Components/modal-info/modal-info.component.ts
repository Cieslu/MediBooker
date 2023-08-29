import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent {
  @Input() nameAction: string = "";
  @Input() bodyModal: string = "";
  @Input() isDeleteUser: boolean = false;
  @Input() isDeleteDay: boolean = false;
  @Input() userId: string = "";
  @Input() dayId: number = 0;
  @Output() onUserDeleting = new EventEmitter<string>();
  @Output() onDayDeleting = new EventEmitter<number>();

  deleteUser(id: string){
    this.onUserDeleting.emit(id);
  }

  deleteDay(id: number) {
    this.onDayDeleting.emit(id);
  }
}
