import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-std-noteslist',
  templateUrl: './std-noteslist.component.html',
  styleUrls: ['./std-noteslist.component.css']
})
export class StdNoteslistComponent implements OnInit {

  displayedColumns: string[] = ['notes_id', 'unit_id', 'inst_book_title', 'inst_book_description', 'inst_book_img'];
  dataSource = new MatTableDataSource();
  count_inst_book: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  imgUrl: string = '';

  constructor(
    private servies: ManageService,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.servies.imgBaseUrl.subscribe(
      (res: any) => {
        this.imgUrl = res
      }
    )

  }


  ngOnInit(): void {
    const course_id = localStorage.getItem('courseId')

    const data = new FormData()
    data.append('course_id', `${course_id}`)
    this.servies.get_notes_for_std(data).subscribe(
      (result: any) => {
        console.log(result);
        this.dataSource.data = result.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_inst_book = result.data.length

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
