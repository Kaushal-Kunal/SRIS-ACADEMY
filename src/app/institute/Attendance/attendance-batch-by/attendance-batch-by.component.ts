import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-attendance-batch-by',
  templateUrl: './attendance-batch-by.component.html',
  styleUrls: ['./attendance-batch-by.component.css']
})
export class AttendanceBatchByComponent implements OnInit {

  displayedColumns: string[] = ['batch_id', 'course_id_fk', 'batch_name', 'batch_arrival', 'batch_total_std', 'batch_status', 'action'];
  dataSource = new MatTableDataSource();
  count_batch: number = 0;
  inst_id: any
  action_btn: boolean = false
  Ttalstd: number = 0
  total_batch: any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  login_deatils: any
  login: any
  inst_id_for_inst_login: any
  inst_id_for_admin: any;
  inst_id_for_std: any;
  deletevalue: any = 1

  constructor(
    private dailog: MatDialog,
    private router: Router,
    private service: ManageService,
    private popup: NgToastService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    const institute_data = this.router.getCurrentNavigation();
    this.inst_id_for_admin = institute_data?.extras
    console.log("admin" + this.inst_id_for_admin)
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)

    this.inst_id_for_std = this.login.institute_id_fk

    this.inst_id_for_inst_login = this.login.inst_id
    console.log("std" + this.inst_id_for_std)
    console.log("inst" + this.inst_id_for_inst_login)
  }

  ngOnInit(): void {
    this.get_batch_by_inst_id(this.inst_id_for_inst_login)

  }

  get_batch_by_inst_id(inst_for_all: any) {
    console.log(inst_for_all);

    const instformdata = new FormData()
    instformdata.append('inst_id', inst_for_all)
    this.service.get_batch_by_inst_id(instformdata).subscribe(
      (result: any) => {
        console.log(result)
        this.dataSource.data = result.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_batch = result.data.length
      }
    )
  }





  onAttendance(row: any) {
    this.router.navigate(['institutehome/attendancelist'], row)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

