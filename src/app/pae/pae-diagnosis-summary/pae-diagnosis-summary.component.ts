import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaeDiagnosisSummary } from '../../_shared/model/paeDiagnosis/paeDiagnosisSummary';
import { paeDiagnosisSummaryService } from '../../core/services/pae/pae-diagnosis-summary.service'
@Component({
  selector: 'app-pae-diagnosis-summary',
  templateUrl: './pae-diagnosis-summary.component.html',
  styleUrls: ['./pae-diagnosis-summary.component.scss']
})
export class PaeDiagnosisSummaryComponent implements OnInit {
  showDocumentationSection: boolean = false;
  showUploadBtn: boolean = false;
  ImageBaseData: any;
  showTick: boolean = false;
  constructor(private router: Router, private paediagnosisSummaryService: paeDiagnosisSummaryService) { }

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
    console.log("this.ImageBaseData==", this.ImageBaseData)
    if (this.ImageBaseData == null) {
      alert("Please select file");
    } else {
      console.log("this.ImageBaseData ", this.ImageBaseData)
      var fileUplodVM: PaeDiagnosisSummary = {
        document: this.ImageBaseData,
        documentVO: '',
        aplPdfTypeCd: '',
        aplRequestId: '',
        destinationCd: ''
      }

      this.paediagnosisSummaryService.savePaeDiagnosisSummary(fileUplodVM).then((response) => {

      })
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
