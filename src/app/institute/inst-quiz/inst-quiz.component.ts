import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditInstQuizComponent } from '../add-edit-inst-quiz/add-edit-inst-quiz.component';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { ConfirmBoxComponent } from '../confirm-box/confirm-box.component';
@Component({
  selector: 'app-inst-quiz',
  templateUrl: './inst-quiz.component.html',
  styleUrls: ['./inst-quiz.component.css']
})

export class InstQuizComponent implements OnInit {
  displayedColumns: string[] = ['quiz_id', 'unit_id_fk', 'quiz_question', 'quiz_option_a', 'quiz_option_b', 'quiz_option_c', 'quiz_option_d', 'action'];
  dataSource = new MatTableDataSource();
  count_quiz: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  inst_id_for_admin: any;
  login_deatils: any;
  login: any;
  inst_id_for_inst_login: any;
  inst_id: any;
  course_data: any;
  sub_name: string = "Quiz";
  course: any
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

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id

    const navigation = this.router.getCurrentNavigation();
    this.course_data = navigation?.extras
  }

  ngOnInit(): void {
    console.log(this.course_data)
    const fromdata = new FormData()
    fromdata.append('inst_id', this.login.inst_id)
    fromdata.append('course_id', this.course_data)
    this.service.get_quiz_by_inst_id(fromdata).subscribe(
      (res: any) => {
        console.log(res)
        this.sub_name = res.data[0].course_name
        this.course = res.data[0].course_id

        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_quiz = res.data.length
      }
    )
  }

  add_course() {
    this.dailog.open(AddEditInstQuizComponent, {
      disableClose: true,
      data: this.course_data
    });
  }

  course_edit(row: any) {
    this.dailog.open(AddEditInstQuizComponent, {
      data: row,
      disableClose: true
    });
  }

  quiz_delete(row: any) {
    const dialogRef = this.dailog.open(ConfirmBoxComponent, {
      data: this.deletevalue,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.deletevalue == result) {
        const deldata = new FormData();
        deldata.append('quiz_id', row.quiz_id);
        this.service.quiz_delete(deldata).subscribe(
          (res: any) => {
            console.log(res)
            this.popup.success({ detail: 'Success', summary: 'Quiz Deleted', })
            this.router.navigate(['/institutehome/instquiz'], this.course_data)
          }
        )
      }
      else { }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

