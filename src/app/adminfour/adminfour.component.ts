import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { NzMessageService,NzModalService } from 'ng-zorro-antd';
import { port,name,sessionKey } from '../public/datas/portName';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'adminfour',
  templateUrl: './adminfour.component.html',
  styleUrls: ['./adminfour.component.css']
})

export class AdminfourComponent implements OnInit {
  _isSpinning:boolean = false;
  isVisible = false;
  modaltitle:string;
  modalimg:string;
  picid:string;

  nzTabPosition:string = "top";
  userId = localStorage.getItem(sessionKey.USERID);
  tabs = [];
  selectedIndex = 0;
  tabid:string;
  _console(args) {
    this.tabid = args.id;
    this.pageindex = 1;
    this.getTabDatas()

  }

  showModal = (ttle,imgurl,id) => {
    this.isVisible = true;
    this.modaltitle = ttle;
    this.picid = id;
    this.modalimg = imgurl;
  }

  handleCancel = (e) => {
    this.isVisible = false;
  }

  handleOk = (e) => {
    window.open( port.BASE_URL + "/file/download?ids="+this.picid+"&userId=" + this.userId)
  }

  /* table */
  _allChecked = false;//全选
  _checkedNumber = 0;//选中数
  _displayData: Array<any> = [];//当前页数据
  _operating = false;//是否操作
  _dataSet = [];//数据
  _indeterminate = false;//非全选
  _checkedid = [];//选中数据id

  pageindex:number = 1;
  pagesize:number = 0;
  total:number = 0;


  _displayDataChange($event) {
    this._displayData = $event;
  }

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
    this._checkedid = this._dataSet.filter(value => value.checked);
    this._checkedNumber = this._dataSet.filter(value => value.checked).length;
  }

  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => data.checked = true);
    } else {
      this._displayData.forEach(data => data.checked = false);
    }
    this._refreshStatus();
  }

  _operateData() {
    if(this._checkedNumber==0&&this._operating == true){
      this.alertfn("warning","请选择需要删除的购买记录...");
      return
    }else if(this._checkedNumber!=0&&this._operating == true){
      this.deleteDatas("s")
    }
    this._operating = true;


  }


  comfirmfn(title,content,fn){
    this._modal.confirm({
      title  : title,
      content: '<b>'+content+'</b>',
      onOk() {
        fn()
      },
      onCancel() {
      }
    });
  }
  alertfn = (type, text) => {
    this._message.create(type, text);
  };
  constructor(
    private router:Router,
    private httpServer:HttpClient,
    private route:ActivatedRoute,
    public _message:NzMessageService,
    private _modal:NzModalService
  ){

  }

  getDatas(){
    let url = port.BASE_URL+name.record_pay_list;
    let data = { userId:this.userId };
    this.httpServer.post(url,data).subscribe(res=> {
      let data = (res as any).detail;
      if(data.length!=0){
        this.tabs = data;
        this.tabid = data[0].id;
      }else{
        this.tabs = [];
        this.tabid = '';
      }
      this.getTabDatas();
    })
  }
  getTabDatas(){
    if(!this.tabid){
      return;
    }
    let url = port.BASE_URL+name.file_pay_list;
    let data = {
      userId:this.userId,
      rid:this.tabid,
      currentPage:this.pageindex
    };
    this.httpServer.post(url,data).subscribe(res=> {
      let data = (res as any).detail;
      //console.log(data)
      this._dataSet = data.attachments;
      this.pageindex = data.page.currentPage;
      this.total = data.page.totalResult;
      this.pagesize = data.page.showCount;


    })

  }
  deleteDatas(key){
    let urlname = port.BASE_URL+name.file_pay_deletes,data,_it=this;
    if(key=="s"){
      let ids = _it._checkedid.map((item)=>{
        return item.pid;
      })
      data = {
        userId:_it.userId,
        pids:ids.join(",")
      }
    }else{
      data = {
        userId:_it.userId,
        pids:key
      }
    }
    _it.comfirmfn("确定删除选中的项？","删除后无法恢复，是否删除选中的购买记录？",()=>{
      _it.httpServer.post(urlname,data).subscribe(res=> {
        let data = (res as any);
        if(data.code==200){
          _it.alertfn("success","删除成功");
          _it.getDatas();
        }

      })
    })


  }


  ngOnInit(){
    this.getDatas();


  }



}

