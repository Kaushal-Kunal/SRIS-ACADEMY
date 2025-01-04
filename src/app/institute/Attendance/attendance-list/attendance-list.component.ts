import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {
  displayedColumns: string[] = ['std_id', 'std_regist_no', 'std_photo', 'roll_no', 'std_name', 'mark',];
  dataSource = new MatTableDataSource();
  count_student: number = 0;
  inst_id: any
  rowdata = 0
  login_deatils: any
  login: any
  batch_name: any
  routdata: any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  imgUrl: string = '';
  color: ThemePalette = 'primary'
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
  }

  ngOnInit(): void {
    const instformdata = new FormData()
    instformdata.append('inst_id', this.login.inst_id)
    instformdata.append('batch_id', this.routdata.batch_id)
    this.service.get_std_for_batch_id(instformdata).subscribe(
      (result: any) => {
        console.log(result.data)
        this.batch_name = result.data[0].batch_name
        this.dataSource.data = result.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_student = result.data.length

      }
    )

    this.getAttendent()
  }

  getAttendent() {
    this.service.attendance_getAll().subscribe(
      (res: any) => {
        console.log(res);
        console.log(res);

      }
    )
  }
  AttendentMark(event: any, row: any): void {
    const selectedValue = event.value;
    console.log(row);

    console.log(selectedValue);
    const data = {
      std_id_fk: `${Number(row.std_id_fk)}`,
      course_id_fk: `${Number(row.course_id_fk)}`,
      "batch_id_fk": `${Number(row.batch_id_fk)}`,
      "cur_date": "",
      "status": selectedValue
    }


    this.service.attendanceMark(data).subscribe(
      (res: any) => {
        console.log(res);

      }
    )
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}

