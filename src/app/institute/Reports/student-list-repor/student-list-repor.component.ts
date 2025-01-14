import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from 'src/app/manage.service';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-student-list-repor',
  templateUrl: './student-list-repor.component.html',
  styleUrls: ['./student-list-repor.component.css']
})
export class StudentListReporComponent implements OnInit {

  displayedColumns: string[] = ['std_id', 'std_regist_no', 'name', 'std_father_name', 'mobile', 'std_email'];
  dataSource = new MatTableDataSource();
  count_student: number = 0;
  inst_id: any;
  rowdata = 0;
  login_deatils: any;
  login: any;
  batch_name: any;
  routdata: any;
  batch_id: any = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  imgUrl: string = '';
  color: ThemePalette = 'primary';
  studentList: any;
  selecteStudent: string = '0';
  attentenceList: any;


  selectedMonth: string = '';
  selectedYear: string = '';

  constructor(
    private service: ManageService,
    private router: Router
  ) {
    const institute_data = this.router.getCurrentNavigation();
    this.routdata = institute_data?.extras;

    this.login_deatils = localStorage.getItem('Token');
    this.login = JSON.parse(this.login_deatils || '{}');

    this.service.imgBaseUrl.subscribe((res: any) => {
      this.imgUrl = res;
    });

    this.batch_id = localStorage.getItem('batchId') || 0;
    this.getStudent()
  }

  ngOnInit(): void { }


  getStudent() {
    const instformdata = new FormData()
    instformdata.append('inst_id', this.login.inst_id)

    this.service.get_student_by_inst_id(instformdata).subscribe(
      (res: any) => {
        console.log(res);
        this.attentenceList = res.data;
        this.dataSource.data = res.data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_student = res.data.length;
      }, (error) => {
        console.error('Error fetching student list:', error);
      }
    )
  }







  downloadPDF() {
    const doc = new jsPDF();

    // Header Section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('SHRI RAM IT SOLUTIONS', 105, 15, { align: 'center' });
    doc.setFontSize(14);
    doc.text('Student List Report', 105, 25, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`${this.selectedMonth}-${this.selectedYear}`, 180, 25, { align: 'right' });

    doc.setDrawColor(0, 0, 0);
    doc.line(10, 30, 200, 30);

    // Table Section
    const columns = [
      'Sl No',
      'Reg No',
      'Name',
      'Father Name',
      'Mobile',
      'Email',
    ];

    const rows = this.attentenceList.map((row: any, index: number) => [
      index + 1,
      row.std_regist_no,
      row.std_name,
      row.std_father_name,
      row.std_whatsapp_no,
      row.std_email,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 35,
      theme: 'striped',
      styles: { halign: 'left', valign: 'middle', fontSize: 10 },
      headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [230, 240, 255] },
      margin: { left: 14, right: 14 },
    });

    // Save the file with a dynamic name
    const fileName = `studentList.pdf`;
    doc.save(fileName);
  }



  downloadExcel() {
      
    // Table Columns
    const columns = [
      'Sl No',
      'Reg No',
      'Name',
      'Father Name',
      'Mobile',
      'Email',
    ];
  
    // Map Rows
    const rows = this.attentenceList.map((row: any, index: number) => [
      index + 1,
      row.std_regist_no,
      row.std_name,
      row.std_father_name,
      row.std_whatsapp_no,
      row.std_email,
    ]);
  
    // Add Header Rows
    const headerRows = [
      ['SHRI RAM IT SOLUTIONS'], // Main Title
      ['Student List Report'],   // Sub-title
      [`${this.selectedMonth} - ${this.selectedYear}`], // Date
      [], // Empty Row
      columns, // Column Headers
    ];
  
    // Combine Header and Data Rows
    const finalRows = [...headerRows, ...rows];
  
    // Create Worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(finalRows);
  
    // Create Workbook and Append Worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Student List');
  
    // Export Workbook to Excel File
    const fileName = `studentList_${this.selectedMonth}_${this.selectedYear}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }
  


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
