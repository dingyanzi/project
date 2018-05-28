import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { port,name,sessionKey } from '../datas/portName';

@Component({
  selector: 'library-foot',
  template: `
<div class="wrapBot">
			<div class="mainBox">
				<img class="icon" src="./assets/images/29.png">
				<div class="link">
					<dl>
        <dt>友情链接：</dt>
        <div style="float: left;margin-right: 18px;">
            <dd>
              <a href="http://www.saac.gov.cn" target="_blank">
              <span class="dian"></span>
              <span style="float: left">中央档案馆</span>
              </a>
            </dd>
            <dd>
              <a href="http://www.shac.net.cn" target="_blank">
              <span class="dian"></span>
              <span style="float: left">中国第二历史档案馆</span>
              </a>
            </dd>
           <dd>
              <a href="http://www.lndangan.gov.cn/lnsdaj" target="_blank">
              <span class="dian"></span>
              <span style="float: left">辽宁省档案馆</span>
              </a>
            </dd>
             <dd>
              <a href="http://www.jilinda.gov.cn " target="_blank">
              <span class="dian"></span>
              <span style="float: left">吉林省档案馆</span>
              </a>
            </dd>

        </div>
        <div style="float: left">
            <dd>
              <a href="http://www.archives.sh.cn" target="_blank">
              <span class="dian"></span>
              <span style="float: left">上海市档案馆</span>
              </a>
            </dd>
           <dd>
              <a href="http://www.archivesnj.gov.cn " target="_blank">
              <span class="dian"></span>
              <span style="float: left">南京市档案馆</span>
              </a>
            </dd>
           <dd>
              <a href="http://www.nj1937.org/index.html" target="_blank">
              <span class="dian"></span>
              <span style="float: left">侵华日军南京大屠杀<br/>遇难同胞纪念馆</span>
              </a>
            </dd>

        </div>
      </dl>
          <dl>
        <dt>主办方：</dt>
        <div style="float: left;margin-right: 24px;">
            <dd>
              <a href="http://www.njcbcmjt.com " target="_blank">
              <span class="dian"></span>
              <span style="float: left">南京出版传媒集团</span>
              </a>
            </dd>
             <dd>
              <a href="http://www.njcbs.cn" target="_blank">
              <span class="dian"></span>
              <span style="float: left">南京出版社</span>
              </a>
            </dd>

        </div>
        <dt style="margin: 65px 0px 0px 0px;">技术支持：</dt>
        <div style="float: left;margin-right: 24px;">
            <dd>
              <a href="http://www.sgnbs.cn/"  target="_blank">
              <span class="dian"></span>
              <span style="float: left">南京松果网络科技有限公司</span>
              </a>
            </dd>
        </div>
      </dl>
				</div>
				<div class="rightBtn">
					<a routerLink="/archives"  >
						<img src="./assets/images/30.png">
						<p>数字档案馆</p>
					</a>
					<a routerLink="/propaganda"  >
						<img src="./assets/images/13.png">
						<p>数字宣教馆</p>
					</a>
				</div>
			</div>
		</div>
  `,
  styles: [`
  .wrapBot {
  width: 100%;
  height: 317px;
  background: url(./assets/images/bottom.jpg) no-repeat left bottom;
}

.wrapBot .mainBox {
  position: relative;
}

.wrapBot .mainBox .icon {
  position: absolute;
  top: -73px;
  left: 441px;
}

.wrapBot .mainBox .link {
  position: absolute;
  top: 125px;
  left: 15px;
}
.wrapBot .mainBox .link dl{
  float:left;
  margin-right:46px;
}
.wrapBot .mainBox .link dl+dl{
  padding-top:0px;
}
.wrapBot .mainBox .link dt {
  font-size: 16px;
  color: #640b04;
  margin-bottom: 5px;
}

.wrapBot .mainBox .link dd {
  line-height: 28px;
  overflow:hidden;
}

.wrapBot .mainBox .link dd a {
  font-size: 16px;
  color: #3a3a3a;
}

.wrapBot .mainBox .link dd a:hover {
  color: #640b04;
}
.wrapBot .mainBox .link dd a:hover .dian{
  background-color: #640b04;
}
.wrapBot .mainBox .rightBtn {
  width: 330px;
  position: absolute;
  right: 0px;
  top: 125px;
}

.wrapBot .mainBox .rightBtn a {
  display: block;
  float: left;
  width: 115px;
  text-align: center;
  margin: 0 auto;
  margin-right: 40px;
}

.wrapBot .mainBox .rightBtn a p {
  font-size: 16px;
  color: #3a3a3a;
}
  `],

})
export class Library_footComponent {



}
