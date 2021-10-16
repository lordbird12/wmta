import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicScriptLoaderService } from 'src/app/shared-service/dynamic-script-loader.service';
import Swal from 'sweetalert2'
import { ProductsService } from '../service/service.service';

declare const $: any;
const users = JSON.parse(localStorage.getItem('user') || '{}');

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  mainPicture: any;
  addProductForm : FormGroup;
  imageSelected:any;
  filesSelected:any;
  resData : any;
  fileArrName:any;

  selectedFiles: FileList | undefined;
  progressInfos :  any;
  userData : any;

  imageDeleteFrom: FormGroup;
  imageurls : any = [];
  base64String: String | undefined;
  name: String | undefined;
  imagePath: String | undefined;

  constructor( private router: Router, private http: HttpClient, private fb: FormBuilder, private dynamicScriptLoader : DynamicScriptLoaderService,
    private productServ : ProductsService) {

    this.addProductForm = this.fb.group({
      user_id: ["", Validators.required],
      title: ["", Validators.required],
      main_picture: "",
      shot_detail: "",
      detail: "",
      price: ["", Validators.required],
      discount: "0",
      images: []
    });

    this.imageDeleteFrom = this.fb.group({
      id: [""],
      ImagePath: [""]
    });

    this.userData = users;
   }

   get user_id(): any { return this.addProductForm.get('user_id'); }
   get title(): any { return this.addProductForm.get('title'); }
   get shot_detail(): any { return this.addProductForm.get('shot_detail'); }
   get detail(): any { return this.addProductForm.get('detail'); }
   get price(): any { return this.addProductForm.get('price'); }
   get discount(): any { return this.addProductForm.get('discount'); }

  ngOnInit(): void {
    this.startScript();
    //console.log(this.userData.data);
  }

  addProduct(form: FormGroup) {
    if (this.addProductForm.value.title == undefined ||this.addProductForm.value.title == "") {
      Swal.fire(
        "Found an Error", //title
        "Incomplete information !!", //main text
        "warning" //icon
      );
    } 
    else if (this.imageSelected == undefined || this.imageSelected == "") {
      Swal.fire(
        "Found an Error", //title
        "No profile picture, please include a profile picture. !!", //main text
        "warning" //icon
      );
    }
    else if (this.filesSelected == undefined || this.filesSelected == "") {
      Swal.fire(
        "Found an Error", //title
        "Attach files such as : Passport, Medical diagnosis, etc. (.pdf, word, images) !!", //main text
        "warning" //icon
      );
    }
     else {
      //console.log(this.registerForm.value);
      let sendData = new FormData();
      sendData.append('user_id', form.value.user_id);
      sendData.append('title', form.value.title);
      sendData.append('fname', form.value.fname);
      sendData.append('lname', form.value.lname);
      sendData.append('birthday', form.value.birthday);
      sendData.append('age', form.value.age);
      sendData.append('sex', form.value.sex);
      sendData.append('phone', form.value.phone);
      sendData.append('line', form.value.line);
      sendData.append('type', form.value.type);
      if(this.imageSelected == undefined || this.imageSelected== ""){
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
 
      //console.log(sendData.getAll('files[]'));
      //fileList =  this.imageSelected;
      //Array.from(fileList).forEach((file: File, index) => {
      //sendData.append(`image`, file);
      //sendData.append(`fileName`, file.name);
      //sendData.append('filePath', 'news');
      //});
      this.productServ.addProduct(sendData).subscribe((res) => {
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
    this.imageurls = [];
    $('.file-select').val('');
  }

  uploadBtn() : void {
    //console.log("click");
    $(".file-upload").click();
  }

  // removeImageEdit(i : any, imagepath : any) {
  //   this.imageDeleteFrom.value.id = i;
  //   this.imageDeleteFrom.value.ImagePath = imagepath;
  // }

  // removeImage(i : any) {
  //   this.imageurls.splice(i, 1);
  // }

  onSelectFile(event:any) {
    this.imageurls = [];
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageurls.push({ base64String : event.target.result, });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
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
        reader.onload = e => this.mainPicture = reader.result;
        reader.readAsDataURL(file);
    }
  }

  onFileChange(file:any) {
    //this.imageSelected = file;
    let files : File = file[0];
  }

  async startScript() {
    await this.dynamicScriptLoader.load('custom', 'respond.min', 'jquery.swipebox','jquery.velocity','jquery.validate.min','jquery.meanmenu.min',
    'jquery.ui.core.min','jquery.jplayer.min','jquery-migrate-1.2.1.min','jquery-twitterFetcher','jquery.isotope.min','jquery.ui.datepicker.min',
    'jquery.form','jquery.flexslider-min','jquery.autosize.min','jquery.appear','jquery-2.2.3.min').then(data => {
    }).catch(error => console.log(error));
  }

}
