import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { SharedService } from '../../shared-service/service.service';
import { HelperService } from 'src/app/shared-service/helper.service';
import { ProductsService } from '../../products/service/service.service';

import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DynamicScriptLoaderService } from 'src/app/shared-service/dynamic-script-loader.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  productData: any = [];

  constructor(private sharedServ: SharedService, private helper: HelperService, private productServ: ProductsService,private dynamicScriptLoader : DynamicScriptLoaderService,
    private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  //เรียงจากท้ายสุด อันดับแรกของสินค้า
  loadProducts() {
    Swal.fire({
      title: 'Please Wait !',
      html: 'Loading data...',// add html attribute if you want or remove
      allowOutsideClick: false,
      didOpen : () => {
          Swal.showLoading()
      },
    });
    this.productServ.listProduct().subscribe((res) => {
      console.log(res);
      if(res.status == false){
        Swal.fire(
          "Found an Error", //title
          "No information found. !!", //main text
          "warning" //icon
        );
        this.startScript();
      }else{
        this.productData = res.data.reverse();  //กลับด้านเอาท้ายสุดมาหน้าสุด
        setTimeout(() => {
          Swal.close()
          this.startScript();
        }, 2000);
      }
    });
  }

  
  async startScript() {
    await this.dynamicScriptLoader.load('custom', 'respond.min', 'jquery.swipebox','jquery.velocity','jquery.validate.min','jquery.meanmenu.min',
    'jquery.ui.core.min','jquery.jplayer.min','jquery-migrate-1.2.1.min','jquery-twitterFetcher','jquery.isotope.min','jquery.ui.datepicker.min',
    'jquery.form','jquery.flexslider-min','jquery.autosize.min','jquery.appear','jquery-2.2.3.min').then(data => {
    }).catch(error => console.log(error));
  }
}
