import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicScriptLoaderService } from 'src/app/shared-service/dynamic-script-loader.service';
import { SharedService } from 'src/app/shared-service/service.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  arrData: any = [];
  constructor(private router: Router, private http: HttpClient, private sharedServ : SharedService,
    private dynamicScriptLoader : DynamicScriptLoaderService) {

  }

  ngOnInit(): void {
    this.loadNews();
  }

  async loadNews() {
    Swal.fire({
      title: 'Please Wait !',
      html: 'Loading data...',// add html attribute if you want or remove
      allowOutsideClick: false,
      didOpen : () => {
          Swal.showLoading()
      },
    });
    this.sharedServ.listNews().subscribe((res) => {
      //console.log(res);
      if(res.status == false){
        Swal.fire(
          "Found an Error", //title
          "No information found. !!", //main text
          "warning" //icon
        );
      }else{
        this.arrData = res.data.reverse();
        setTimeout(() => {
          Swal.close();
          this.startScript();
        }, 2000);
      }
    });
  }

  goNewBlog(id : any): void{
    console.log(id);
    this.router.navigate(['health-blog/', id]);
  }

  
  async startScript() {
    await this.dynamicScriptLoader.load('custom', 'respond.min', 'jquery.swipebox','jquery.velocity','jquery.validate.min','jquery.meanmenu.min',
    'jquery.ui.core.min','jquery.jplayer.min','jquery-migrate-1.2.1.min','jquery-twitterFetcher','jquery.isotope.min','jquery.ui.datepicker.min',
    'jquery.form','jquery.flexslider-min','jquery.autosize.min','jquery.appear','jquery-2.2.3.min').then(data => {
    }).catch(error => console.log(error));
  }

}
