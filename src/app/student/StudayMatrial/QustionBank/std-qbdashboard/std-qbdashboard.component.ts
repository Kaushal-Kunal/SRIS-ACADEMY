import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-std-qbdashboard',
  templateUrl: './std-qbdashboard.component.html',
  styleUrls: ['./std-qbdashboard.component.css']
})
export class StdQBDashboardComponent implements OnInit {
  logindata: any
  course_data: any
  constructor(
    private service: ManageService,
    private _router: Router
  ) {
    const data = localStorage.getItem('Token')
    if (data) {
      this.logindata = JSON.parse(data)
    }
  }

  ngOnInit(): void {
    const formdata = new FormData()
    formdata.append('std_id', this.logindata.std_id)
    this.service.get_admission_id_by_std_id(formdata).subscribe(
      (res: any) => {
        console.log(res)
        this.course_data = res.data
      }
    )
  }

  onunit(id: any) {
    console.log(id);
    localStorage.setItem('courseId', id)
    this._router.navigate(['/studenthome/stdqblist'])
  }


}
