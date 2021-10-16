import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormRegister {

    private isValidEmail = /\S+@\S+\.\S+/;
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    errorMessage = null;

    constructor(private fb: FormBuilder) { }

    registerHospital = this.fb.group({
        emailHospital: ['', [Validators.required, Validators.email]],
        passwordHospital: ['', Validators.required, Validators.minLength(6)],
        fnameHospital: ['', Validators.required],
        lnameHospital: ['', Validators.required],
        birthdayHospital: ['', Validators.required],
        ageHospital: ['', Validators.required],
        sexHospital: ['', Validators.required],
        phoneHospital: ['', Validators.required],
        positionHospital: ['', Validators.required],
        departmentHospital: ['', Validators.required],
        organizationHospital: ['', Validators.required],
        lineHospital: ['', Validators.required],
        typeHospital: ['2', Validators.required],  //0=สมาชิกทั่วไป 1=โรงแรม 2=โรงบาล
        imageHospital: ['', Validators.required],
        filesHospital: []
    });

    get emailHospital(): any { return this.registerHospital.get('emailHospital'); }
    get passwordHospital(): any { return this.registerHospital.get('passwordHospital'); }
    get fnameHospital(): any { return this.registerHospital.get('fnameHospital'); }
    get lnameHospital(): any { return this.registerHospital.get('lnameHospital'); }
    get ageHospital(): any { return this.registerHospital.get('ageHospital'); }
    get sexHospital(): any { return this.registerHospital.get('sexHospital'); }
    get phoneHospital(): any { return this.registerHospital.get('phoneHospital'); }
    get lineHospital(): any { return this.registerHospital.get('lineHospital'); }
    get typeHospital(): any { return this.registerHospital.get('typeHospital'); }
    get imageHospital(): any { return this.registerHospital.get('imageHospital'); }
    get fileHospital(): any { return this.registerHospital.get('fileHospital'); }


    registerHotel = this.fb.group({
        emailHotel: ['', [Validators.required, Validators.email]],
        passwordHotel: ['', Validators.required, Validators.minLength(6)],
        fnameHotel: ['', Validators.required],
        lnameHotel: ['', Validators.required],
        birthdayHotel: ['', Validators.required],
        ageHotel: ['', Validators.required],
        sexHotel: ['', Validators.required],
        phoneHotel: ['', Validators.required],
        positionHotel: ['', Validators.required],
        departmentHotel: ['', Validators.required],
        organizationHotel: ['', Validators.required],
        lineHotel: ['', Validators.required],
        typeHotel: ['1', Validators.required],  //0=สมาชิกทั่วไป 1=โรงแรม 2=โรงบาล
        imageHotel: ['', Validators.required],
        filesHotel: []
    });

    get emailHotel(): any { return this.registerHotel.get('emailHotel'); }
    get passwordHotel(): any { return this.registerHotel.get('passwordHotel'); }
    get fnameHotel(): any { return this.registerHotel.get('fnameHotel'); }
    get lnameHotel(): any { return this.registerHotel.get('lnameHotel'); }
    get ageHotel(): any { return this.registerHotel.get('ageHotel'); }
    get sexHotel(): any { return this.registerHotel.get('sexHotel'); }
    get phoneHotel(): any { return this.registerHotel.get('phoneHotel'); }
    get lineHotel(): any { return this.registerHotel.get('lineHotel'); }
    get typeHotel(): any { return this.registerHotel.get('typeHotel'); }
    get imageHotel(): any { return this.registerHotel.get('imageHotel'); }
    get fileHotel(): any { return this.registerHotel.get('fileHotel'); }


}
