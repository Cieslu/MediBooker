import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { infoReservation } from 'src/app/Models/infoReservation';
import { ReservationDTO } from 'src/app/ModelsDTO/ReservationDTO';
import { UserService } from 'src/app/Services/user.service';
import { WorkerService } from 'src/app/Services/worker.service';

@Component({
  selector: 'app-calendar-side-panel',
  templateUrl: './calendar-side-panel.component.html',
  styleUrls: ['./calendar-side-panel.component.css']
})
export class CalendarSidePanelComponent{
  @Input() sidePanel: boolean = false;
  @Input() infoReservation!: infoReservation;
  @Output() sidePanelEvent = new EventEmitter<boolean>(); 

  listDoctorReservations: ReservationDTO[] = [];

  constructor(public worker: WorkerService){
    
  }


  hidePanel(){
    this.sidePanelEvent.emit(!this.sidePanel);
  }
}
