import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { port,name,sessionKey } from '../public/datas/portName';
@Component({
  selector: 'archives-list',
  templateUrl: './archives-list.component.html',
  styleUrls: ['./archives-list.component.css']
})

export class ArchiveslistComponent implements OnInit {
  _isSpinning:boolean = true;
  userId:string = localStorage.getItem(sessionKey.USERID);
  title:string = "";
  listID:string = '';
  chid:string = '';
  key:string='';
  SelectedIndex:number = 7;
  lists:Array<any> = [];
  listdetail:Array<any> = [];
  archive:number;
  keyword:string = "";
  pageindex:number=1;
  showCount:number=0;
  totalPage:number=0;
  selectedOption:string = "";
  searchOptions = [
    { value: '1', label: '精选' },
    { value: '0', label: '全部' }
  ];

  constructor(
    private httpserver: HttpClient,
    private route: ActivatedRoute
  ) {
  }

  panels = [];




   ngOnInit() {     window.scrollTo(0, 0);
    let thiskey;
    this.route.params.subscribe(data => {
      this.listID = data['id'];//guan
      this.chid = data['chid'];
      thiskey = data['item'];//dijige
      this.selectedOption = data['ifs'];//leixing
      this.keyword = data['keyword'];
      this.getInit(thiskey);
      this.SelectedIndex = thiskey;

    });


  }

  delay(time, cb) {
    setTimeout(()=> {
      cb && cb();
    }, time);
  }


  nzTabPosition = 'left';
  tap(tab,i){
    this.delay(4,()=>{
      this.pageindex=1;
      this.showCount=0;
      this.totalPage=0;
      this.SelectedIndex = i;
      this._isSpinning = true;
      this.listID = tab.id;
      this.chid = tab.rchapters[0].id;
      this.keyword = '';

      if(tab.id==''){
        this['title'] = "";
        this.getLists('');
      }else{
        this['title'] = tab.name;
        this.getLists(this.chid);
      }
    })
  }



  getLists(id){
    if(id==''){
      this.SelectedIndex = 7;
      this.listID = '';
    }
    this.chid = id;
    let url = port.BASE_URL+name.record_list;
    let data = {
      userId :this.userId,
      archive:this.listID,
      whole:this.keyword,
      rcid:this.chid,
      currentPage:this.pageindex,
      type:this.selectedOption
    };
    console.log(JSON.stringify(data))
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any);
      if(data.code == 200){
        this.listdetail = data.detail.records;
        this.pageindex = data.detail.page.currentPage;
        this.totalPage = data.detail.page.totalResult;
        this.showCount = data.detail.page.showCount;
        this._isSpinning = false;
      }
      console.log(JSON.stringify(data))
    });
  }
  getInit(thiskey){
    let url = port.BASE_URL+name.rchapter_list;
    let data = { userId :this.userId,id:this.listID};
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any);
      //console.log(JSON.stringify(data))
      if(data.code == 200){
        this.lists = data.detail;
        this.lists.push({ name:"全部档案",id:"",rchapters:['','']});
        setTimeout(()=>{
          let title = this.lists[thiskey];
          if(title.name=='全部档案'){
            this['title'] = '';
          }else{
            this['title'] = title.name;
          }
        },200)
      }
      this.getLists(this.chid);

    });
  }







}
