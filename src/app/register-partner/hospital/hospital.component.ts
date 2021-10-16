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
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {

  imageSrcHospital : any;
  //registerHospital : FormGroup;
  imageSelected:any;
  filesSelected:any;
  resData : any;
  fileArrName:any;

  selectedFiles: FileList | undefined;
  progressInfos :  any;

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder, private dynamicScriptLoader : DynamicScriptLoaderService,
    private servRegister : ServiceService, private authService: AuthService, public register : BaseFormRegister) { 

      this.register.registerHospital = this.fb.group({
        emailHospital: ["", [Validators.required, Validators.email]],
        passwordHospital: ["", Validators.required, Validators.minLength(6)],
        fnameHospital: "",
        lnameHospital: "",
        birthdayHospital: "",
        ageHospital : "",
        sexHospital: "",
        phoneHospital: "",
        positionHospital: "",
        departmentHospital: "",
        organizationHospital: "",
        lineHospital:  "",
        typeHospital: "2",  //0=สมาชิกทั่วไป 1=โรงแรม 2=โรงบาล
        imageHospital: "",
        filesHospital: []
      });
     ;
  }

  ngOnInit(): void {
    localStorage.setItem("typeTab", "Hospital");
    console.log('loadHospital');
    this.onLoad()
  }

  registerAccount(form: FormGroup) {
    if (form.value.emailHospital == undefined || form.value.emailHospital == "") {
      Swal.fire(
        "Found an Error", //title
        "Incomplete information !!", //main text
        "warning" //icon
      );
    } 
    else if (this.imageSelected== undefined || this.imageSelected == "") {
      Swal.fire(
        "Found an Error", //title
        "No profile picture, please include a profile picture. !!", //main text
        "warning" //icon
      );
    }
    else if (this.filesSelected== undefined || this.filesSelected == "") {
      Swal.fire(
        "Found an Error", //title
        "Attach files such as : Passport, Medical diagnosis, etc. (.pdf, word, images) !!", //main text
        "warning" //icon
      );
    }
     else {
      //console.log(this.registerHospital.value);
      let sendData = new FormData();
      sendData.append('email', form.value.emailHospital);
      sendData.append('password', form.value.passwordHospital);
      sendData.append('fname', form.value.fnameHospital);
      sendData.append('lname', form.value.lname);
      sendData.append('birthday', form.value.birthday);
      sendData.append('age', form.value.ageHospital);
      sendData.append('sex', form.value.sexHospital);
      sendData.append('phone', form.value.phoneHospital);
      sendData.append('line', form.value.lineHospital);
      sendData.append('type', form.value.typeHospital);
      if(this.imageSelected == undefined || this.imageSelected == ""){
        sendData.append('image', "")
      }else{
        sendData.append('image', this.imageSelected[0])
      }
      //sendData.append('files[]', this.filesSelected[0], this.filesSelected[1])
      for (let i = 0; i < this.filesSelected.length; i++) {
        sendData.append('files[]', this.filesSelected[i]);
      }
      sendData.append('position', form.value.position);
      sendData.append('department', form.value.department);
      sendData.append('organization', form.value.organization);

      this.servRegister.new(sendData).subscribe((res) => {
        this.resData = res;
        console.log(this.resData);
        if (this.resData.status == "false") {
          Swal.fire(
            "Found an Error", //title
            "Error or duplicate emailHospital, ", //main text
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
  
  fileArrList(event : any) {
    const files: FileList = event.target.files;
    this.filesSelected = files;
    //console.log(event.target.files);
    let arrTxt = [];
    for(let i=0; i < files.length; i++){
      arrTxt.push({fileName : files[i].name, rows : i+1 });
    }
    //console.log(arrTxt);
    this.progressInfos = arrTxt;
  }

  clearFile(){
    this.progressInfos = [];
    $('.file-select').val('');
  }

  uploadBtn() : void {
    //console.log("click");
    $(".file-upload").click();
  }

  readFileImg(event:any): void {
    const files: FileList = event.target.files;
    this.imageSelected = files;
    //Array.from(files).forEach((file: File)=>{
    //  this.fileNames.push(file.name);    
    //});
    //this.fileChanged.emit(files);
    console.log(' file chage ', this.imageSelected)
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imageSrcHospital = reader.result;
        reader.readAsDataURL(file);
    }
  }
  
  onLoad() : void {
    this.progressInfos = [];
    $('.file-select').val('');
    this.register.registerHospital.patchValue({
      emailHospital: "",
      passwordHospital: "",
      fnameHospital: "",
      lnameHospital: "",
      birthdayHospital: "",
      ageHospital : "",
      sexHospital : "",
      phoneHospital : "",
      positionHospital : "",
      departmentHospital : "",
      organizationHospital : "",
      lineHospital :  "",
      typeHospital : "2",  //0=สมาชิกทั่วไป 1=โรงแรม 2=โรงบาล
      imageHospital : "",
      filesHospital : []
    });
    this.imageSrcHospital = this.register.registerHospital.value.imageHospital;
  }

  async startScript() {
    await this.dynamicScriptLoader.load('custom', 'respond.min', 'jquery.swipebox','jquery.velocity','jquery.validate.min','jquery.meanmenu.min',
    'jquery.ui.core.min','jquery.jplayer.min','jquery-migrate-1.2.1.min','jquery-twitterFetcher','jquery.isotope.min','jquery.ui.datepicker.min',
    'jquery.form','jquery.flexslider-min','jquery.autosize.min','jquery.appear','jquery-2.2.3.min').then(data => {
    }).catch(error => console.log(error));
  }

}
