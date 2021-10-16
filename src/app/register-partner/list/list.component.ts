import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicScriptLoaderService } from 'src/app/shared-service/dynamic-script-loader.service';
import Swal from 'sweetalert2'
import { AuthService } from '../../home/login/service/auth.service'
import { ServiceService } from '../service/service.service';

declare const $: any;
declare const M: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  selectedFiles: FileList | undefined;
  progressInfos :  any;

  menu: any;
  tabmenu = [
    { name: 'Register1', status: '', action: '' },
    { name: 'Register2', status: '', action: '' },
    { name: 'Register3', status: '', action: '' },
    { name: 'Register4', status: '', action: '' },
    { name: 'Register5', status: '', action: '' },
  ];
  
  renderer: any;
  ActionShow: any;


  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder, private dynamicScriptLoader : DynamicScriptLoaderService,
    private servRegister : ServiceService, private authService: AuthService) { 

    }

  ngOnInit(): void {

  }
      
  checkRegis(){
    //console.log(tab);
    let tab : any = localStorage.getItem("typeTab");
    if(tab == "Hospital"){
      this.router.navigateByUrl('/register-partner/hospital', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/register-partner'])
      });
    }
    else  if(tab == "Hotel"){
      this.router.navigateByUrl('/register-partner/hotel', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/register-partner'])
      });
    }
    else  if(tab == "Doctors"){
      this.router.navigateByUrl('/register-partner/doctors', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/register-partner'])
      });
    }else{
      
    }
  }
  

  async startScript() {
    await this.dynamicScriptLoader.load('custom', 'respond.min', 'jquery.swipebox','jquery.velocity','jquery.validate.min','jquery.meanmenu.min',
    'jquery.ui.core.min','jquery.jplayer.min','jquery-migrate-1.2.1.min','jquery-twitterFetcher','jquery.isotope.min','jquery.ui.datepicker.min',
    'jquery.form','jquery.flexslider-min','jquery.autosize.min','jquery.appear','jquery-2.2.3.min').then(data => {
    }).catch(error => console.log(error));
  }
}
