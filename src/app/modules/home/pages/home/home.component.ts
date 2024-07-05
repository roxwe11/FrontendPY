import { Component, OnInit,inject } from '@angular/core';
import { SidebarServiceService } from 'src/app/shared/services/sidebar-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  status:boolean = true;
  nombre:string = ''
  _sidebarService = inject(SidebarServiceService)


  ngOnInit(): void {
    this._sidebarService.sidebarEffectButton$.subscribe(status =>{
      this.status = status
    })
  }

}
