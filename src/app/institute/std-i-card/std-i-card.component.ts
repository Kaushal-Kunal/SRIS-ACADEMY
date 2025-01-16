import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { AddEditStudentComponent } from '../add-edit-student/add-edit-student.component';
import { Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { StdICardGenerateComponent } from '../std-i-card-generate/std-i-card-generate.component';

@Component({
  selector: 'app-std-i-card',
  templateUrl: './std-i-card.component.html',
  styleUrls: ['./std-i-card.component.css']
})
export class StdICardComponent implements OnInit {
  displayedColumns: string[] = ['std_id', 'std_regist_no', 'std_photo', 'std_name', 'std_whatsapp_no', 'std_email', 'action'];
  dataSource = new MatTableDataSource();
  count_student: number = 0;
  inst_id: any
  rowdata = 0
  login_deatils: any
  login: any
  inst_id_for_inst_login: any
  std_reg_no: any
  std_id: any
  deletevalue: any = 1
  count_active: any = 0
  count_pending: any = 0
  pending_admission: any = 0
  red: string = 'forred'
  green: string = 'forgreen'
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  imgUrl: string = '';
  color: ThemePalette = 'primary'
  FilterData: any
  constructor(
    private dailog: MatDialog,
    private service: ManageService,
    private router: Router,
    private popup: NgToastService,

  ) {
    const institute_data = this.router.getCurrentNavigation();
    this.inst_id = institute_data?.extras

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    // this.inst_id = this.login.institute_id_fk
    this.inst_id_for_inst_login = this.login.inst_id

    this.service.imgBaseUrl.subscribe(
      (res: any) => {
        this.imgUrl = res
      }
    )
  }

  ngOnInit(): void {

    if (this.inst_id > 0) {
      this.get_std(this.inst_id)
    }
    else {
      this.get_std(this.inst_id_for_inst_login)
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get_std(inst: any) {
    const instformdata = new FormData()
    instformdata.append('inst_id', inst)
    this.service.get_student_by_inst_id(instformdata).subscribe(
      (result: any) => {
        console.log(result)
        this.FilterData = result.data
        this.dataSource.data = result.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_student = result.data.length
        this.count_active = this.dataSource.data.filter((f: any) => f.status.search(new RegExp('1', 'i')) > -1).map((t: any) => t).length;
        this.count_pending = this.dataSource.data.filter((f: any) => f.status.search(new RegExp('0', 'i')) > -1).map((t: any) => t).length;
        this.pending_admission = this.dataSource.data.filter((f: any) => f.total_admission.search(new RegExp('0', 'i')) > -1).map((t: any) => t).length;
      }
    )
  }
  onIcard(data: any) {
    this.dailog.open(StdICardGenerateComponent, {
      data: data,
      disableClose: true,
      panelClass: 'iCarddialog'
    });
  }

  onTotal() {
    this.dataSource.data = this.FilterData.filter((f: any) => f.std_name.search(new RegExp(this.dataSource.filter, 'i')) > -1).map((t: any) => t);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}