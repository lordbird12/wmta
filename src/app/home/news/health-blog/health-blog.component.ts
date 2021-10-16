import { HttpClient } from '@angular/common/http';
import { Component, OnInit,  Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from '../../login/service/auth.service';
import { SharedService } from '../../../shared-service/service.service';
import { HelperService } from 'src/app/shared-service/helper.service';
import { DynamicScriptLoaderService } from 'src/app/shared-service/dynamic-script-loader.service';


declare var $: any;
declare var document: any;

@Component({
  selector: 'app-health-blog',
  templateUrl: './health-blog.component.html',
  styleUrls: ['./health-blog.component.css']
})
export class HealthBlogComponent implements OnInit {

  arrData: any = [];
  idnews : any;
  resposeData: any;
  checkData : any;

  constructor(private router: Router, private sharedServ : SharedService, private http: HttpClient, private dynamicScriptLoader : DynamicScriptLoaderService,
    private fb: FormBuilder, private rou: ActivatedRoute, public helper : HelperService) { 
      
    }

  ngOnInit(): void {
    let paramurl: any = this.rou.snapshot.params;
    this.idnews = paramurl.id;
    //console.log( this.idnews );
    this.loadNews();
    setTimeout(() => {
      this.startScript();
    }, 500);
  }

  loadNews() {
    this.resposeData = "";
    Swal.fire({
      title: 'Please Wait !',
      html: 'Loading data...',// add html attribute if you want or remove
      allowOutsideClick: false,
      didOpen : () => {
          Swal.showLoading()
      },
    });
    this.sharedServ.listNews().subscribe(res => {
      this.resposeData = res.data;
      this.fiterArr(this.resposeData);
    },err => {
      //console.log(err.error)
      Swal.fire(
        "Warning!", //title
        ''+ err.error.message, //main text
        "error" //icon
      );
    });

  }

  fiterArr(listdata : Array<any>) {  
    this.checkData = listdata.find(x  => x.id === parseInt(this.idnews));
    if(this.checkData == undefined ||  this.checkData == ""){
      Swal.fire(
        "Warning!", //title
        'Found an Error', //main text
        "error" //icon
      );
    }else{
      this.arrData =  this.checkData;
      //console.log(this.arrData);
      Swal.close();
    }
  }

  async startScript() {
    await this.dynamicScriptLoader.load('custom', 'jquery.flexslider-min', 'jquery.swipebox','jquery.meanmenu.min','jquery-2.2.3.min','').then(data => {
    }).catch(error => console.log(error));
  }

}
