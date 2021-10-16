import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../home/login/service/auth.service';
import Swal from 'sweetalert2'
import { DynamicScriptLoaderService } from 'src/app/shared-service/dynamic-script-loader.service';

declare const $: any;
declare const M: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  menu: any;
  tabmenu = [
    { name: 'User Management', status: '', action: '' },
    { name: 'Package History', status: '', action: '' },
    { name: 'Post Product', status: '', action: '' },
    { name: 'Re-Password', status: '', action: '' },
    { name: 'Logout', status: '', action: '' },
  ];
  
  renderer: any;
  ActionShow: any;

  selectedRating = 0;
  stars = [
    {
      id: 1,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 2,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 3,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 4,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 5,
      icon: 'star',
      class: 'star-gray star-hover star'
    }
  ];


  dataPacket = [
    {
      id: 1,
      pacId : "100-25000",
      pacName : "Medical Treatment -> Sport Medicine & Physical Therapy",
      status: "Success"
    },
    {
      id: 2,
      pacId : "100-25741",
      pacName : "Wellness Retreat -> Wellness Hotel",
      status: "Pending"
    }
  ];

  imageSrc: any;
  userData : any;
  profileData : FormGroup;

  constructor(private router: Router, private authService: AuthService, private fb : FormBuilder,
    private dynamicScriptLoader : DynamicScriptLoaderService,) {
    this.userData = JSON.parse(localStorage.getItem('user') || '0');
    //this.imageSrc = "https://api.logo-design360.com/wmta-api/public" + this.userData.data.image;
    this.imageSrc = this.userData.data.image;
    
    this.profileData = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      //password: ["", Validators.required],
      fname: ["", [Validators.required]],
      lname: ["", [Validators.required]],
      birthday: "",
      age: "",
      sex: "",
      type: "",
      phone: ["", [Validators.required, Validators.minLength(9)]],
      line: "",
      position: "",
      department: "",
      organization: "",
      image: "",
      files: [''],
    });
  }

  get fname(): any { return this.profileData.get('fname'); }
  get lname(): any { return this.profileData.get('lname'); }
  get phone(): any { return this.profileData.get('password'); }
  get email(): any { return this.profileData.get('email'); }

  ngOnInit(): void {
    this.changeMenu('User Management');
    this.profileData.patchValue({
      email: this.userData.data.email,
      // password: this.userData.data.password,
      fname: this.userData.data.fname,
      lname: this.userData.data.lname,
      birthday : this.userData.data.birthday,
      age: this.userData.data.age,
      sex: this.userData.data.sex,
      type: this.userData.data.type,
      phone: this.userData.data.phone,
      line: this.userData.data.line,
      position: this.userData.data.position,
      department: this.userData.data.department,
      organization: this.userData.data.organization,
      image: this.userData.data.image,
      files: [''],
    });
    this.startScript();
  }

  onSave(form : FormGroup){
    console.log(form.value);
  }
  
  signOut() {
    Swal.fire({ //alert confirm แบบ sweetalert
      title: 'Confirm Log out ?',
      // text: 'ออกจากระบบ ใช่หรือไม่ ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cencel',
    }).then((val) => {

      if (val.value) {
        this.authService.logout();
        // this.router.navigate(['/login'])
        //   .then(() => {
        //     window.location.reload();
        //   });
      }

    });
  }

  onDetail(row :any){
    console.log(row)
  }

  readFileImg(event: any): void {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(file);
    }
  }

  uploadBtn() : void {
    //console.log("click");
    $(".file-upload").click();
  }

  selectStar(value : any): void {
    // prevent multiple selection
    if (this.selectedRating === 0) {
      this.stars.filter((star) => {
        if (star.id <= value) {
          star.class = 'star-gold star';
        } else {
          star.class = 'star-gray star';
        }
        return star;
      });
    }else{
      this.stars.filter((star) => {
        if (star.id <= value) {
          star.class = 'star-gold star-hover star';
        } else {
          star.class = 'star-gray star-hover star';
        }
        return star;
      });
    }
    this.selectedRating = value;
  }

  changeMenu(tabname: any) {
    //console.log(tabname);
    this.tabmenu.forEach((item, i) => {
      if (tabname == "" || tabname == null) {
        this.tabmenu[i].status = '';
        this.tabmenu[i].action = 'hide';
      }
      else if (tabname == item.name) {
        this.tabmenu[i].status = 'active';
        this.tabmenu[i].action = 'show';
      }
      else if (tabname != item.name) {
        this.tabmenu[i].status = '';
        this.tabmenu[i].action = 'hide';
      }
    });

    this.ActionShow = this.showMenu(tabname);
    //console.log(this.ActionShow);
  }

  showMenu(str: string) {
    let result: any = this.tabmenu.filter(item => item.name == str)
    if (result.length > 0) {
      return result[0].name;
    } else {
      console.warn(`Can't find ${str} menu item`);
      return str;
    }
  }

  activeMenu(str: string) {
    let result: any = this.tabmenu.filter(item => item.name == str)
    if (result.length > 0) {
      return result[0].status;
    } else {
      console.warn(`Can't find ${str} menu item`);
      return '';
    }
  }

  async startScript() {
    await this.dynamicScriptLoader.load('custom', 'respond.min', 'jquery.swipebox','jquery.velocity','jquery.validate.min','jquery.meanmenu.min',
    'jquery.ui.core.min','jquery.jplayer.min','jquery-migrate-1.2.1.min','jquery-twitterFetcher','jquery.isotope.min','jquery.ui.datepicker.min',
    'jquery.form','jquery.flexslider-min','jquery.autosize.min','jquery.appear','jquery-2.2.3.min').then(data => {
    }).catch(error => console.log(error));
  }

}
