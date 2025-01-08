import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';


import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import 'jspdf-autotable';



@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent implements OnInit {

  displayedColumns: string[] = ['std_id', 'std_regist_no', 'roll_no', 'name', 'mobile', 'att_date', 'att_status'];
  dataSource = new MatTableDataSource();
  count_student: number = 0;
  inst_id: any
  rowdata = 0
  login_deatils: any
  login: any
  batch_name: any
  routdata: any
  batch_id: any = 0
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  imgUrl: string = '';
  color: ThemePalette = 'primary'

  studentList: any
  selecteStudent: string = '0'
  attentenceList: any
  constructor(
    private dailog: MatDialog,
    private service: ManageService,
    private router: Router
  ) {
    const institute_data = this.router.getCurrentNavigation();
    this.routdata = institute_data?.extras

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)

    this.service.imgBaseUrl.subscribe(
      (res: any) => {
        this.imgUrl = res
      }
    )

    this.batch_id = localStorage.getItem('batchId')
    this.getStudentlistByBatchId(this.batch_id)

  }

  ngOnInit(): void {
  }

  getStudentlistByBatchId(batch_id: any) {
    const instformdata = new FormData()
    instformdata.append('inst_id', this.login.inst_id)
    instformdata.append('batch_id', batch_id)
    this.service.get_std_for_batch_id(instformdata).subscribe(
      (result: any) => {
        console.log(result.data)
        this.studentList = result.data
      })
  }

  months = [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' }
  ];

  selectedMonth: string = '';
  selectedYear: string = '';

  onMonthChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    console.log('Selected Month Value:', value);
  }



  onReportGet(std_id: string, monthvalue: string, yearvalue: string) {
    console.log(std_id);
    console.log(yearvalue);
    console.log(monthvalue);
    const data = {
      "month": monthvalue,
      "year": yearvalue,
      "batch_id_fk": this.batch_id,
      "std_id_fk": std_id
    }
    this.service.attendencereport(data).subscribe(
      (res: any) => {
        console.log(res.data);
        this.attentenceList = res.data
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_student = res.data.length
      }
    )

  }


  downloadPDF() {
    const doc = new jsPDF();
    const columns = [
      'S.N.',
      'Registration Number',
      'Roll',
      'Name',
      'Mobile',
      'Date',
      'Status',
    ];
    const rows = this.attentenceList.map((row: any, index: any) => [
      index + 1,
      row.regist_no,
      row.roll_no,
      row.std_name,
      row.std_whatsapp_no,
      row.cur_date,
      row.attStatus === 1 ? 'Present' : 'Absent',
    ]);

    doc.text('Attendance Report', 14, 10);
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });

    doc.save('attendance_report.pdf');

  }

  downloadExcel() {
    const worksheetData = this.attentenceList.map((row: any, index: any) => ({
      SNo: index + 1,
      RegistrationNumber: row.regist_no,
      Roll: row.roll_no,
      Name: row.std_name,
      Mobile: row.std_whatsapp_no,
      Date: row.cur_date,
      Status: row.attStatus === 1 ? 'Present' : 'Absent',
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(data, 'attendance_report.xlsx');
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
