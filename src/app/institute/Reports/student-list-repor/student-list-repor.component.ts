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

  displayedColumns: string[] = ['std_id', 'std_regist_no', 'roll_no', 'name', 'mobile', 'att_date', 'att_status'];
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
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('SHRI RAM IT SOLUTIONS', 105, 15, { align: 'center' });
    doc.setFontSize(14);
    doc.text('Yearly/Monthly Attendance Report', 105, 25, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`${this.selectedMonth}-${this.selectedYear}`, 180, 25, { align: 'right' });

    doc.setDrawColor(0, 0, 0);
    doc.line(10, 30, 200, 30);

    const detailsStartY = 35;
    doc.setFontSize(12);
    const studentDetails = [
      `NAME: ${this.attentenceList[0].std_name}`,
      `FATHER NAME: ${this.attentenceList[0].std_father_name}`,
      `Registration No.: ${this.attentenceList[0].regist_no}`,
      `Roll No: ${this.attentenceList[0].roll_no}`,
      `Phone No: ${this.attentenceList[0].std_whatsapp_no}`,
      `Email: ${this.attentenceList[0].std_email}`,
    ];

    studentDetails.forEach((line, index) => {
      doc.text(line, 14, detailsStartY + index * 6);
    });

    const summaryStartY = 35;
    const presentDays = this.attentenceList.filter((row: any) => row.attStatus == 1).length;
    const absentDays = this.attentenceList.length - presentDays;
    const attendanceSummary = [
      `COURSE NAME: ${this.attentenceList[0].course_name}`,
      `Duration: ${this.attentenceList[0].course_duration} Month`,
      `Yearly: 24/365`,
      `Total Present Day: ${presentDays}`,
      `Total Absent Day: ${absentDays}`,
    ];

    attendanceSummary.forEach((line, index) => {
      doc.text(line, 150, summaryStartY + index * 6, { align: 'right' });
    });

    // Horizontal Line for Separation Before Table
    doc.line(10, 70, 200, 70);

    // Table Section
    const columns = ['Sl No', 'Date', 'Status'];
    const rows = this.attentenceList.map((row: any, index: number) => [
      index + 1,
      row.cur_date,
      row.attStatus == 1 ? 'PRESENT' : 'ABSENT',
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 75,
      theme: 'striped',
      styles: { halign: 'center', valign: 'middle', fontSize: 10 },
      headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] }, // Dark Blue Header
      alternateRowStyles: { fillColor: [230, 240, 255] }, // Light Blue Alternate Rows
      margin: { left: 14, right: 14 },
    });

    // Save the file with a dynamic name
    const fileName = `${this.attentenceList[0].std_name}_Attendance_${this.selectedMonth}_${this.selectedYear}.pdf`;
    doc.save(fileName);
  }



  downloadExcel() {
    const presentDays = this.attentenceList.filter((row: any) => row.attStatus === 1).length;
    const absentDays = this.attentenceList.length - presentDays;

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
      ['SHRI RAM IT SOLUTIONS'], // Title
      ['Yearly/Monthly Attendance Report'], // Subtitle
      [],
      [`Month-Year: ${this.selectedMonth}-${this.selectedYear}`],
      [],
      ['Student Details'],
      [`NAME: ${this.attentenceList[0].std_name}`, `FATHER NAME: ${this.attentenceList[0].std_father_name}`],
      [`Registration No.: ${this.attentenceList[0].regist_no}`, `Roll No: ${this.attentenceList[0].roll_no}`],
      [`Phone No: ${this.attentenceList[0].std_whatsapp_no}`, `Email: ${this.attentenceList[0].std_email}`],
      [],
      ['Attendance Summary'],
      [`COURSE NAME: ${this.attentenceList[0].course_name}`, `Duration: ${this.attentenceList[0].course_duration} Month`],
      [`Total Present Day: ${presentDays}`, `Total Absent Day: ${absentDays}`],
      [],
      ['Sl No', 'Date', 'Status'] // Table header
    ]);

    // Add attendance data
    this.attentenceList.forEach((row: any, index: number) => {
      XLSX.utils.sheet_add_aoa(worksheet, [[
        index + 1,
        row.cur_date,
        row.attStatus === 1 ? 'Present' : 'Absent'
      ]], { origin: -1 });
    });

    // Apply basic styles
    const range = XLSX.utils.decode_range(worksheet['!ref']!);
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          font: { bold: true, sz: 14 },
          alignment: { horizontal: 'center' }
        };
      }
    }

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Report');

    // Export Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, `Attendance_Report_${this.selectedMonth}_${this.selectedYear}.xlsx`);
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
