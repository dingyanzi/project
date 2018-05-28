import { Component, OnInit ,Input,AfterViewInit} from '@angular/core';
import { NgStyle } from '@angular/common';
import {RouterModule, Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { port,name,sessionKey } from '../public/datas/portName';
import { NzMessageService ,NzNotificationService} from 'ng-zorro-antd';
@Component({
  selector: 'propaganda',
  templateUrl: './propaganda.component.html',
  styleUrls: ['./propaganda.component.css']
})
export class propagandaComponent {

  userId:string = localStorage.getItem(sessionKey.USERID);
  changeKey:boolean = true;
  newadd:string = "";
  _isSpinning:boolean = true;
  selected:string;
  keyword:string;
  _value:string = "";
  id:Array<any> = [];
  result:Array<any> = [];
  allist:any = {};
  type:string = '0';

  /*提示消息*/
  alertfn = (type, text) => {
    this._message.create(type, text);
  };

  constructor(
    private httpserver: HttpClient,
    private _message: NzMessageService,
    private router:Router
  ) {

  }

  //模态框
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

  //getlist
  getData(key){
    this.type = key;
    let url = port.BASE_URL+name.exhibition_list;
    let data = {
      type:this.type,
      userId:this.userId,
      currentPage:1
    }
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any).detail;
      this.result = [];
      this.result = data.exhibitions;
      this.allist = data.exhibitions[0];
      this.cur = 0;
      this._isSpinning = false;
      //console.log(JSON.stringify(data))
    });
  }


  content:string = '';
  searchtype:string = '0';
  atList:Array<any>=[];
  pageindex:number = 1;
  pagetotal:number = 0;
  pagesize:number = 0;

  getDatas(key){
    if(key=='null'){

    }else{
      this.searchtype = key;
    }
    let url = port.BASE_URL+name.course_list;
    let data = {
      type:this.searchtype,
      userId:this.userId,
      currentPage:this.pageindex,
      search_content:this.content
    };
    //console.log(JSON.stringify(data))
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any);
      if(data.code == 200){
        this.atList = data.detail.courses;
        this.pageindex = data.detail.page.currentPage;
        this.pagetotal = data.detail.page.totalResult;
        this.pagesize = data.detail.page.showCount;
      }
      //console.log(JSON.stringify(data))
    });
  }


  cur:number = 0;
  count:number = 0;
  vals:number = 0;
  fn(key,i){
    this.cur = i;
    this.allist = key;
  }
  moveLeft(){
    if(this.cur < this.result.length-1){
      this.cur ++;
    }else{
      this.cur = 0
    }
    this.allist = this.result[this.cur];
    if(this.result.length<8){
      return false;
    }
    if(this.count < this.result.length-7){
      this.count++
      this.vals = -147*this.count;
    }else if(this.cur == 0){
      this.count = 0;
      this.vals = 0;
    }
  }
  moveRight(){
    if(this.cur > 0){
      this.cur --;
    }else{
      this.cur = this.result.length-1
    }
    this.allist = this.result[this.cur];
    if(this.result.length<8){
      return false;
    }
    if(this.count > 0){
      this.count --;
      this.vals =  -147*this.count;
    }else if(this.cur == this.result.length-1){
      this.count = this.result.length-7;
      this.vals = -147*this.count;
    }

  }



   ngOnInit() {
     window.scrollTo(0, 0);
    if(this.userId==null){
      this.userId = "";
      this.changeKey = true;
    }else{
      this.changeKey = false;
    }
    this.getData("0")


  }




}
