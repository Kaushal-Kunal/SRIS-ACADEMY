import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-std-i-card-generate',
  templateUrl: './std-i-card-generate.component.html',
  styleUrls: ['./std-i-card-generate.component.css']
})
export class StdICardGenerateComponent implements OnInit {
  @ViewChild('content', { static: false }) content!: ElementRef;
  generateIcard: any;
  imgUrl: string = '';

  constructor(
    private _crud: ManageService,
    private matref: MatDialogRef<StdICardGenerateComponent>,
    @Inject(MAT_DIALOG_DATA) public iCardData: any
  ) {
    this._crud.imgBaseUrl.subscribe((res: string) => {
      this.imgUrl = res;
    });

    this.generateIcard = iCardData;
  }

  ngOnInit(): void {
    console.log('Image Base URL:', this.imgUrl);
    console.log('Student Image URL:', this.imgUrl + this.generateIcard.std_img);
    console.log('Institution Logo URL:', this.imgUrl + this.generateIcard.inst_logo);
  }

  onIcardDownload() {
    const content = this.content.nativeElement;

    html2canvas(content, { scale: 3 })
      .then((canvas) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save('I-Card.pdf');
        alert('PDF downloaded successfully');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF');
      });
  }
}
