import { Component, OnInit ,Input,AfterViewInit} from '@angular/core';
import { NgStyle } from '@angular/common';
import {RouterModule, Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { port,name,sessionKey } from '../public/datas/portName';
import { NzMessageService ,NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})

export class ArchivesComponent implements OnInit {

  result:any;
  newadd:string = "";
  _isSpinning:boolean = true;
  selected:string;
  keyword:string;
  _value:string = "";
  id:Array<any> = [];
  records:Array<any> = [];
  firstId:Array<any> = [];
  results:Array<any> = [];
  rec:Object = {};
  rec1:Object = {};
  rec2:Object = {};
  rec3:Object = {};
  rec4:Object = {};
  rec5:Object = {};
  rec6:Object = {};
  currentPage:number = 1;
  curList:any;
  allList:any;
  /*提示消息*/
  alertfn = (type, text) => {
    this._message.create(type, text);
  };
  substrs(str){
    return str;
  }
  constructor(
    private httpserver: HttpClient,
    private _message: NzMessageService,
    private router:Router
  ) {

  }
/**/
  changeKey:boolean = true;
  userId:string = localStorage.getItem(sessionKey.USERID);

  key:string = '';
  title:string = '';
  isVisible = false;
  showModal = (key,str) => {
      this.key = key;
      this['title'] = str;
      this.isVisible = true;
  }
  handleCancel = (str) => {
    if(str=="success"){
      this.changeKey = false;
    }
    this.isVisible = false;
  }


  jump(){
    this.router.navigate(['/archives-list',{id:'',item:'7',ifs:'0',keyword:this._value}])
  }
   ngOnInit() {     window.scrollTo(0, 0);
    if(this.userId==null){
      this.userId = "";
      this.changeKey = true;
    }else{
      this.changeKey = false;
    }
    let url = port.BASE_URL+name.archive_list;
    let data = { userId :this.userId};
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any);
      if(data.code == 200){
        this.id = data.detail;
        this.firstId = data.detail[0].id;
        this.getdatas()
      }else {
        this.alertfn("error",data.desc)
      }
    });
    let urls = port.BASE_URL+name.rchapter_list;
    let datas = { userId:this.userId };
    this.httpserver.post(urls,datas).subscribe(res => {
      let data = (res as any).detail;
      //console.log(JSON.stringify(data));
      this.allList = data;
      this.curList = data[0].rchapters;
    });

    this.getList();




  }
  now:number = 0;
  tap(item,i){
    if(!item){
    }else{
      this.firstId = item
    }
    this.mov = 0;
    this.movpx = 30;
    this.now = i;
    this.curList = this.allList[i].rchapters;
    //this.getdatas()
  }



  mov:number = 0;
  movpx:number = 30;
  leftmove(){
    if(this.mov<this.curList.length-4){
      this.mov++;
    }else{
      this.mov = 0;
    }
    if(this.curList.length<5){
      return
    }
    this.movpx = 30-this.mov*242.5;

  }
  rightmove(){
    if(this.mov>0){
      this.mov--;
    }else{
      this.mov = this.curList.length-4;
    }
    if(this.curList.length<5){
      return
    }
    this.movpx = 30-this.mov*242.5;
  }

  getdatas(){
    let url = port.BASE_URL+name.record_list;
    if(this.userId==null){
      this.userId = ""
    };
    let data = {
      userId:this.userId,
      selected:0,
      keyword:this.keyword,
      currentPage:1,
      archive:''};
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any);
      let obj = {picurl:'./assets/images/404.jpg',name:'暂无',archiveName:'暂无',description:'暂无描述'};
      if(data.detail.records[0]){
        this.rec = data.detail.records[0];
      }else{
        this.rec = obj;
      }
      if(data.detail.records[1]){
        this.rec1 = data.detail.records[1];
      }else{
        this.rec1 = obj;
      }
      if(data.detail.records[2]){
        this.rec2 = data.detail.records[2];
      }else{
        this.rec2 = obj;
      }
      if(data.detail.records[3]){
        this.rec3 = data.detail.records[3];
      }else{
        this.rec3 = obj;
      }
      if(data.detail.records[4]){
        this.rec4 = data.detail.records[4];
      }else{
        this.rec4 = obj;
      }
      if(data.detail.records[5]){
        this.rec5 = data.detail.records[5];
      }else{
        this.rec5 = obj;
      }
      if(data.detail.records[6]){
        this.rec6 = data.detail.records[6];
      }else{
        this.rec6 = obj;
      }
    });
    this._isSpinning = false;
  }

  getList(){
    let url = port.BASE_URL+name.record_allList;
    if(this.userId==null){
      this.userId = ""
    };
    let data = { userId:this.userId ,keyword:this.keyword,currentPage:1,newadd:0};
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any);
      if(data.code == 200){
        for(var i = 0;i < data.detail.length;i+=4){
          this.results.push(data.detail.slice(i,i+4));
        }
        this._isSpinning = false;
      }
    });

  }

}
