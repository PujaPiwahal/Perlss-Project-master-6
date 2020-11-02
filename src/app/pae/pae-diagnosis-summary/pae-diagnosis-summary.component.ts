import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pae-diagnosis-summary',
  templateUrl: './pae-diagnosis-summary.component.html',
  styleUrls: ['./pae-diagnosis-summary.component.scss']
})
export class PaeDiagnosisSummaryComponent implements OnInit {
  showDocumentationSection: boolean = false;
  showUploadBtn: boolean = false;
  ImageBaseData: string | ArrayBuffer = null;
  showTick: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoDetailPage() {
    this.router.navigate(['dashboard/pae/medicalDiagnosis']);
  }

  handleFileInput(files: FileList) {
    this.showUploadBtn = true;
    let me = this;
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      me.ImageBaseData = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  uploadFile() {
    if (this.ImageBaseData == null) {
      alert("Please select file");
    } else {
      console.log("this.ImageBaseData ", this.ImageBaseData)
      // var fileUplodVM: FileUplodVM = {
      //   ImageBaseData: this.ImageBaseData.toString()
      // }
      // this.CreateItem(fileUplodVM).subscribe((res: any) => {
      //   if (res) {
      //     alert("Successfully uploded file");
      //   } else {
      //     alert("File upload failed");
      //   }

      // },
      //   error => {
      //     alert(error.message);
      //   });
    }
  }

  // public CreateItem(data) {
  //   return this.http.post(`http://localhost:52410/api/Order/UploadFile`, data)
  //     .pipe(
  //       map((res: any) => {
  //         console.log(res);
  //         return res;
  //       }));
  // }
}
