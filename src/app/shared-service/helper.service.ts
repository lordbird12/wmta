import { Injectable } from '@angular/core';

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  /// วันปัจุบัน
  /* Get date string format
   */
  nowDateString() {
    let today = new Date();
    let year = today.getFullYear();
    let dd = today.getDate();
    let ddStr = today.getDate().toString();
    let mm = today.getMonth() + 1; //มกราคม = 0!
    let mmStr = mm.toString();
    let result;
    if (dd < 10) {
      ddStr = '0' + dd;
    }
    if (mm < 10) {
      mmStr = '0' + mm;
    }
    result = year + "-" + mmStr + "-" + ddStr;
    //  alert(result);
    return result;
  }

  //แปลงวันที่ กลับด้านและเปลี่ยน format วันที่รับเข้ามาจาก String 06/09/2021 เป็น 2021-09-06
  reverseDDMMYYYYtoYYYYMMDD(strDate: any) {
    if (strDate == '' || strDate == null) {
      return strDate;
    } else {
      return strDate.split('/').reverse().join('-')
    }
  }


  //ใส่วันที่เข้ามา
  showDate(strDate: any) {
    if (strDate == '' || strDate == null) {
      return '';
    } else {
      let myDate = new Date(strDate);
      let year = myDate.getFullYear();
      let dd = myDate.getDate();
      let ddStr = myDate.getDate().toString();
      let mm = myDate.getMonth() + 1; //มกราคม = 0!
      let mmStr = mm.toString();
      let result;
      if (dd < 10) {
        ddStr = '0' + dd;
      }
      if (mm < 10) {
        mmStr = '0' + mm;
      }
      result = year + "-" + mmStr + "-" + ddStr;
      return result;
    }
  }

  numberFormat(nStr: any) {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  numberUnFormat(nStr: any) {
    var noCommas = nStr.replace(/,/g, '')
    return noCommas;
  }

  money_format(nStr: any) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  money_unformat(nStr: any) {
    var noCommas = nStr.replace(/,/g, '')
    return noCommas;
  }

  monthText(months: any, types : any) {
    let monthArr = [];
    if(types == "th"){
      monthArr = [
        "-",
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"
      ];
      return monthArr[months].toString();
    } else {
      monthArr = [
        "-",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      return monthArr[months].toString();
    }
  }

}
