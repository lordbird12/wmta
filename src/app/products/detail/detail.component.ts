import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { SharedService } from '../../shared-service/service.service';
import { HelperService } from 'src/app/shared-service/helper.service';
import { ProductsService } from '../../products/service/service.service';
import Swal from 'sweetalert2';
import { DynamicScriptLoaderService } from 'src/app/shared-service/dynamic-script-loader.service';

declare var $: any;
declare var document: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  arrData: any = [];
  productData: any = [];
  idpro : any;
  resposeData: any;
  pathImg : any = [];

  constructor(private router: Router, public translate: TranslateService, private rou: ActivatedRoute, private dynamicScriptLoader : DynamicScriptLoaderService,
    private sharedServ: SharedService,  public helper : HelperService, private productServ: ProductsService) {

  }

  ngOnInit(): void {
    let paramurl: any = this.rou.snapshot.params;
    this.idpro = paramurl.id;
    console.log( this.idpro );
    this.getProducts();
  }

  getProducts() {
    Swal.fire({
      title: 'Please Wait !',
      html: 'Loading data...',// add html attribute if you want or remove
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    });
    this.productServ.getProduct(this.idpro).subscribe((res) => {
      if(res.status == false){
        Swal.fire(
          "Found an Error", //title
          "No information found. !!", //main text
          "warning" //icon
        );
      }else{
        this.productData = res.data;
        this.pathImg = res.data.path;
        setTimeout(() => {
          Swal.close();
          this.startScript();
        }, 1500);
      }
      //console.log(this.productData);
    });
  }

  async startScript() {
    await this.dynamicScriptLoader.load('custom', 'jquery.flexslider-min', 'jquery.swipebox','jquery.meanmenu.min','jquery-2.2.3.min','').then(data => {
    }).catch(error => console.log(error));
  }

}
