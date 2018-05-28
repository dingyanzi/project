import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { NzMessageService,NzModalService } from 'ng-zorro-antd';
import { port,name,sessionKey } from '../public/datas/portName';
@Component({
  selector: 'archives-detail',
  templateUrl: './archives-detail.component.html',
  styleUrls: ['./archives-detail.component.css']
})
export class ArchivesdetailComponent implements OnInit {

  userId:string = localStorage.getItem(sessionKey.USERID);
  id:string = "";
  detailid:Array<any> = [];
  dataList:Array<any> = [];
  isVisible = false;
  arch:string = '';
  curImg:string = '';
  desc:string = '';
  searchVal:string='';
  currentpage:number = 1;
  total:number;
  allLength:number;
  picid:string;

  showModal = (src,id) => {
    this.curImg = src;
    this.picid = id;
    this.isVisible = true;
  }

  handleCancel = () => {
    this.isVisible = false;
  }
  handleOk = (e) => {
    window.open( port.BASE_URL + "/file/download?ids="+this.picid+"&userId=" + this.userId)
  }
  alertfn = (type, text) => {
    this._message.create(type, text);
  };
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

  constructor(
    private httpserver: HttpClient,
    private route: ActivatedRoute,
    public _message:NzMessageService,
    private _modal:NzModalService
  ) {
  }

  iftis(){
    if(this.dataList.length==0){
      this.alertfn("warning","暂无可下载条目...")
    }else{

    }
  }

  download(key){
    if(key){
      window.open( port.BASE_URL + "/file/download?ids="+key+"&userId=" + this.userId)
    }else{
      let idsArr = this.dataList.map((item)=>{
        return  item.id;
      });
      if(this.dataList.length==0){
        this.alertfn("warning","暂无可下载条目...")
        return;
      }
      let ids = JSON.stringify(idsArr);
      ids = ids.substring(1,ids.length-1);
      window.open( port.BASE_URL + "/file/download?ids="+ids+"&userId=" + this.userId)
    }
  }



  cur:number = 0;
  count:number = 0;
  vals:number = 0;
  keyer:string = 'right';
  fn(key,i){
    this.cur = i;
    this.curImg = key.showurl;
    this.picid = key.id;
    this.desc = key.description.replace(/&/, "<span class='transparenter'>一</span>");
  }
  moveLeft(key){

    this.keyer = 'right';
    if(this.cur==this.dataList.length-1 && this.currentpage<this.total){
      this.currentpage++;
      this.doSearch('');
      this.cur = -1;
    }else if(this.cur==this.dataList.length-1 && this.currentpage==this.total){
      this.currentpage = 1;
      this.doSearch('');
      this.cur = -1;
    }
    if(this.cur < this.dataList.length-1){
      this.cur ++;
    }else{
      this.cur = 0
    }
    this.curImg = this.dataList[this.cur].showurl;
    this.picid = this.dataList[this.cur].id;
    if(key=='1'){
        this.ifBuy();
    }

    if(this.dataList[this.cur].description){
      this.desc = this.dataList[this.cur].description.replace(/&/, "<span class='transparenter'>一</span>");
    }else{
      this.desc = '';
    }

    if(this.dataList.length<13){
      return false;
    }
    if(this.count < this.dataList.length-12){
      this.count++
      this.vals = -66*this.count;
    }else if(this.cur == 0){
      this.count = 0;
      this.vals = 0;
    }


  }
  moveRight(key){

    this.keyer = 'left';
    if(this.cur==0&&this.currentpage>1){
      this.currentpage--;
      this.doSearch('');

    }else if(this.cur==0&&this.currentpage==1){
      this.currentpage = this.total;
      this.doSearch('');
    }

    if(this.cur > 0){
      this.cur --;
    }else{
      this.cur = this.dataList.length-1
    }
    this.curImg = this.dataList[this.cur].showurl;
    this.picid = this.dataList[this.cur].id;
    if(key=='1'){
      this.ifBuy();
    }
    if(this.dataList[this.cur].description){
      this.desc = this.dataList[this.cur].description.replace(/&/, "<span class='transparenter'>一</span>");
    }else{
      this.desc = '';
    }


    if(this.dataList.length<13){
      return false;
    }
    if(this.count > 0){
      this.count --;
      this.vals =  -66*this.count;
    }else if(this.cur == this.dataList.length-1){
      this.count = this.dataList.length-12;
      this.vals = -66*this.count;
    }

  }
  doSearch(key){
    if(key==''){

    }else{
      this.currentpage = key;
      this.keyer='right';
    }
    this.cur = 0;
    this.count = 0;
    this.vals = 0;
    let url = port.BASE_URL+name.record_get;
    if(this.userId==null){
      this.userId = ""
    }
    let data = {
      userId :this.userId,
      id:this.id,
      description:this.searchVal,
      currentPage:this.currentpage
    };
    this.httpserver.post(url,data).subscribe(res =>{
      let data = (res as any);
      if(data.code == 200){
        this.detailid = data.detail;
        if(data.detail.searchs.length==0){
          if(key==''){

          }else{
            this.alertfn("warning","无法找到您要找的内容...");
          }
          this.dataList = data.detail.files;
          this.allLength = this.dataList.length;
          var num;
          if(this.keyer=='left'){
            num = this.allLength-1;
            this.cur = this.allLength-1;
          }else{
            num = 0;
          }
          this.curImg = data.detail.files[num].showurl;
          this.picid = data.detail.files[num].id;

          if(data.detail.files[num].description){
            this.desc = data.detail.files[num].description.replace(/&/, "<span class='transparenter'>一</span>");
          }else{
            this.desc = '';
          }

          this.total = data.detail.filePage.totalPage;
        }else{
          this.dataList = data.detail.searchs;
          this.allLength = this.dataList.length;
          var num;
          if(this.keyer=='left'){
            num = this.allLength-1;
            this.cur = this.allLength-1;
          }else{
            num = 0;
          }

          this.curImg = data.detail.searchs[num].showurl;
          this.picid = data.detail.searchs[num].id;
          if(data.detail.searchs[num].description){
            this.desc = data.detail.searchs[num].description.replace(/&/, "<span class='transparenter'>一</span>");
          }else{
            this.desc = '';
          }
          this.total = data.detail.searchPage.totalPage;
        }
      }
    });
  }



   ngOnInit() {
     window.scrollTo(0, 0);
      this.route.params.subscribe(data => {
        this.id = data['id'];
        this.arch = data['arch'];
        this.searchVal = data['desc']
      });
      this.doSearch('');

  }

  ifbuy:boolean = true;
  ifBuy(){
    //*接口*//
    let url = port.BASE_URL+name.file_view;
    if(this.userId==null){
      this.userId = ""
    }
    let data = {
      userId :this.userId,
      id:this.picid
    };
    this.httpserver.post(url,data).subscribe(res =>{
      let data = (res as any),_it = this;
      console.log(JSON.stringify(data))
      if(data.code==201){
        _it.handleCancel()
        _it.comfirmfn("是否购买此图片?",data.desc,()=>{
          _it.toBuy(this.picid);
        })

      }else if(data.code==200){
        _it.showModal(data.detail,this.picid);
      }

    });
  }

  toBuy(buyid){
    //*接口*//
    let url = port.BASE_URL+name.file_pay;
    if(this.userId==null){
      this.userId = ""
    }
    let data = {
      userId :this.userId,
      id:buyid,
      type:2
    };
    this.httpserver.post(url,data).subscribe(res =>{
      let data = (res as any),_it = this;
      console.log(JSON.stringify(data))
      if(data.code==200){
          window.open(data.detail);

      }else{

      }

    });
  }

}
