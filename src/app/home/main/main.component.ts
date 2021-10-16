import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AppComponent } from 'src/app/app.component';
import { AuthService } from '../login/service/auth.service';

import { SharedService } from '../../shared-service/service.service';
import { HelperService } from 'src/app/shared-service/helper.service';
import { ProductsService } from '../../products/service/service.service';
import { DynamicScriptLoaderService } from 'src/app/shared-service/dynamic-script-loader.service';

declare const $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  arrData: any = [];
  productData: any = [];

  constructor(private AppServ: AppComponent, private router: Router, public translate: TranslateService,private dynamicScriptLoader : DynamicScriptLoaderService,
    private sharedServ : SharedService, private helper : HelperService, private productServ : ProductsService) {

  }

  ngOnInit(): void {
    //this.AppServ.translate.use('th');
    //this.AppServ.translate.addLangs(['en', 'th']);
    this.loadNews();
    this.loadProducts();
    this.startScript();
    // setTimeout(() => {
    //   this.startScript();
    // }, 300);
  }

  //เรียงจากท้ายสุด 3 อันดับแรกของข่าว
   loadNews() {
    this.sharedServ.listNews().subscribe((res) => {
      //console.log(res);
      let sortdata : any = res.data.reverse();  //กลับด้านเอาท้ายสุดมาหน้าสุด
      for(let i = 0; i < 3; i++){
        let sendData = {
          detail: sortdata[i].detail,
          id: sortdata[i].id,
          image: sortdata[i].image,
          shot_detail: sortdata[i].shot_detail,
          title: sortdata[i].title,
          created_at: this.helper.showDate(sortdata[i].created_at)
        }
        this.arrData.push(sendData);
      }
      //console.log(this.arrData);
    });
  }

  //เรียงจากท้ายสุด 6 อันดับแรกของสินค้า
   loadProducts(){
    this.productServ.listProduct().subscribe((res) => {
      //console.log(res);
      let sortdata : any = res.data.reverse();  //กลับด้านเอาท้ายสุดมาหน้าสุด
      for(let i = 0; i < 6; i++){
        let sendData = {
          id: sortdata[i].id,
          user_id: sortdata[i].user_id,
          title: sortdata[i].title,
          shot_detail: sortdata[i].shot_detail,
          detail: sortdata[i].detail,
          main_picture: sortdata[i].main_picture,
          pric: sortdata[i].pric,
          discount: sortdata[i].discount,
        }
        this.productData.push(sendData);
      }
      //console.log(this.productData);
    });
  }

  public loadScript() {
    console.log('preparing to load...')
    const node = document.createElement('script');
    node.src = 'assets/js/custom.js';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }


  async startScript() {
    await this.dynamicScriptLoader.load('custom', 'respond.min', 'jquery.swipebox','jquery.velocity','jquery.validate.min','jquery.meanmenu.min',
    'jquery.ui.core.min','jquery.jplayer.min','jquery-migrate-1.2.1.min','jquery-twitterFetcher','jquery.isotope.min','jquery.ui.datepicker.min',
    'jquery.form','jquery.flexslider-min','jquery.autosize.min','jquery.appear','jquery-2.2.3.min').then(data => {
    }).catch(error => console.log(error));
  }

}
