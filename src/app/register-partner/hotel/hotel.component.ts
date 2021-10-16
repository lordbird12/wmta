import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicScriptLoaderService } from 'src/app/shared-service/dynamic-script-loader.service';
import { BaseFormRegister } from 'src/app/shared-service/utils/base-form-register';
import Swal from 'sweetalert2'
import { AuthService } from '../../home/login/service/auth.service'
import { ServiceService } from '../service/service.service';

declare const $: any;
declare const M: any;

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  imageSrcHotel: any;
  imageSelectedHotel:any;
  filesSelectedHotel:any;
  resData : any;
  fileArrName:any;

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
    private servRegister : ServiceService, private authService: AuthService, public register : BaseFormRegister) { 

      this.register.registerHotel = this.fb.group({
        emailHotel : ["", [Validators.required, Validators.email]],
        passwordHotel : ["", Validators.required, Validators.minLength(6)],
        fnameHotel : "",
        lnameHotel : "",
        birthdayHotel : "",
        ageHotel : "",
        sexHotel : "",
        phoneHotel : "",
        positionHotel : "",
        departmentHotel : "",
        organizationHotel : "",
        lineHotel :  "",
        typeHotel : "1",  //0=สมาชิกทั่วไป 1=โรงแรม 2=โรงบาล
        imageHotel : "",
        filesHotel : []
      });

    }

  ngOnInit(): void {
    this.onLoadHotel();
    console.log('onLoadHotel');
  }

  registerAccount(form: FormGroup) {
    if (form.value.email == undefined || form.value.email == "") {
      Swal.fire(
        "Found an Error", //title
        "Incomplete information !!", //main text
        "warning" //icon
      );
    } 
    else if (this.imageSelectedHotel== undefined || this.imageSelectedHotel == "") {
      Swal.fire(
        "Found an Error", //title
        "No profile picture, please include a profile picture. !!", //main text
        "warning" //icon
      );
    }
    else if (this.filesSelectedHotel== undefined || this.filesSelectedHotel == "") {
      Swal.fire(
        "Found an Error", //title
        "Attach files such as : Passport, Medical diagnosis, etc. (.pdf, word, images) !!", //main text
        "warning" //icon
      );
    }
     else {
      //console.log(this.registerHospital.value);
      let sendData = new FormData();
      sendData.append('email', this.register.registerHotel.value.emailHotel);
      sendData.append('password', this.register.registerHotel.value.passwordHotel);
      sendData.append('fname', this.register.registerHotel.value.fnameHotel);
      sendData.append('lname', this.register.registerHotel.value.lnameHotel);
      sendData.append('birthday', this.register.registerHotel.value.birthdayHotel);
      sendData.append('age', this.register.registerHotel.value.ageHotel);
      sendData.append('sex', this.register.registerHotel.value.sexHotel);
      sendData.append('phone', this.register.registerHotel.value.phoneHotel);
      sendData.append('line', this.register.registerHotel.value.lineHotel);
      sendData.append('type', this.register.registerHotel.value.typeHotel);
      if(this.imageSelectedHotel == undefined || this.imageSelectedHotel== ""){
        sendData.append('image', "")
      }else{
        sendData.append('image', this.imageSelectedHotel[0])
      }
      //sendData.append('files[]', this.filesSelectedHotel[0], this.filesSelectedHotel[1])
      for (let i = 0; i < this.filesSelectedHotel.length; i++) {
        sendData.append('files[]', this.filesSelectedHotel[i]);
      }
      sendData.append('position', this.register.registerHotel.value.positionHotel);
      sendData.append('department', this.register.registerHotel.value.departmentHotel);
      sendData.append('organization', this.register.registerHotel.value.organizationHotel);

      this.servRegister.new(sendData).subscribe((res) => {
        this.resData = res;
        console.log(this.resData);
        if (this.resData.status == "false") {
          Swal.fire(
            "Found an Error", //title
            "Error or duplicate email, ", //main text
            "warning" //icon
          );
        } else {
          Swal.fire({ //alert confirm แบบ sweetalert
            title: 'Success, Thank you',
            // text: 'ออกจากระบบ ใช่หรือไม่ ?',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
            //cancelButtonText: 'Cencel',
          }).then((val) => {
            if (val.value) {
              this.router.navigate(['/login']).then(() => {
                window.location.reload();
              });
            }
          });
        }
      });
    }
  }
  
  fileArrListHotel(event : any) {
    const files: FileList = event.target.files;
    this.filesSelectedHotel = files;
    //console.log(event.target.files);
    let arrTxt = [];
    for(let i=0; i < files.length; i++){
      arrTxt.push({fileName : files[i].name, rows : i+1 });
    }
    //console.log(arrTxt);
    this.progressInfos = arrTxt;
  }

  clearFileHotel(){
    this.progressInfos = [];
    $('.file-select2').val('');
  }

  uploadBtnHotel() : void {
    //console.log("click");
    $(".file-upload2").click();
  }

  readFileImgHotel(event:any): void {
    const files: FileList = event.target.files;
    this.imageSelectedHotel = files;
    //Array.from(files).forEach((file: File)=>{
    //  this.fileNames.push(file.name);    
    //});
    //this.fileChanged.emit(files);
    console.log(' file chage ', this.imageSelectedHotel)
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imageSrcHotel = reader.result;
        reader.readAsDataURL(file);
    }
  }
  
  onLoadHotel() : void {
    this.progressInfos = [];
    $('.file-select2').val('');
    this.register.registerHotel.patchValue({
      emailHotel: "",
      passwordHotel: "",
      fnameHotel: "",
      lnameHotel: "",
      birthdayHotel: "",
      ageHotel : "",
      sexHotel : "",
      phoneHotel : "",
      positionHotel : "",
      departmentHotel : "",
      organizationHotel : "",
      lineHotel :  "",
      typeHotel : "1",  //0=สมาชิกทั่วไป 1=โรงแรม 2=โรงบาล
      imageHotel : "",
      filesHotel : []
    });
    this.imageSrcHotel = this.register.registerHotel.value.imageHotel;
  }

  async startScript() {
    await this.dynamicScriptLoader.load('custom', 'respond.min', 'jquery.swipebox','jquery.velocity','jquery.validate.min','jquery.meanmenu.min',
    'jquery.ui.core.min','jquery.jplayer.min','jquery-migrate-1.2.1.min','jquery-twitterFetcher','jquery.isotope.min','jquery.ui.datepicker.min',
    'jquery.form','jquery.flexslider-min','jquery.autosize.min','jquery.appear','jquery-2.2.3.min').then(data => {
    }).catch(error => console.log(error));
  }

}
