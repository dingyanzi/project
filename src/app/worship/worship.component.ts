import { Component,OnInit } from '@angular/core';
import { port,name,sessionKey } from '../public/datas/portName';
@Component({
  selector: 'worship',
  templateUrl: './worship.component.html',
  styleUrls: ['./worship.component.css','../public/css/animate.min.css']
})

export class WorshipComponent implements OnInit {
  constructor() {

  }
   ngOnInit() {     window.scrollTo(0, 0);

  }



}
