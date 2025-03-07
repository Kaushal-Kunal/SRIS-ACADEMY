import { Component, OnInit } from '@angular/core';
import { InstChangePasswordComponent } from '../inst-change-password/inst-change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institute-sidebar',
  templateUrl: './institute-sidebar.component.html',
  styleUrls: ['./institute-sidebar.component.css']
})
export class InstituteSidebarComponent implements OnInit {

  master: any
  action_icon1: boolean = false
  action_icon2: boolean = true
  action_icon3: boolean = false
  action_icon4: boolean = true
  action_icon5: boolean = false
  action_icon6: boolean = true
  action_icon7: boolean = false
  action_icon8: boolean = true
  action_icon9: boolean = false
  action_icon10: boolean = true
  inst_id: any
  login_deatils: any
  login: any
  inst_name: any
  constructor(
    private dailog: MatDialog,
    private service: ManageService,
    private router: Router

  ) {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    if (!this.login.inst_id) {
      this.router.navigate(['/']);
      localStorage.clear()
    }
  }

  ngOnInit(): void {

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    const fromdata = new FormData()
    fromdata.append('inst_id', this.inst_id)
    this.service.get_inst_by_inst_id(fromdata).subscribe(
      (result: any) => {
        // let str = result.data.inst_name;
        // let res = str.charAt(str.indexOf(" ") + 1);
        // this.inst_name = result.data.inst_name.charAt(0) + (res)
        this.inst_name = result.data.inst_name;

      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  //////////////////////////////////////////////////////////////////////// Report Dropdown /////////////////////////////////////////////////////
  dropdown_study() {
    this.master = document.getElementById("dropdown_study")
    if (this.master.style.display != "block") {
      this.master.style.display = "block";
      this.action_icon1 = true
      this.action_icon2 = false

    } else {
      this.master.style.display = "none";
      this.action_icon1 = false
      this.action_icon2 = true
    }
  }

  dropdown_master() {
    this.master = document.getElementById("dropdown_master")
    if (this.master.style.display != "block") {
      this.master.style.display = "block";
      this.action_icon3 = true
      this.action_icon4 = false

    } else {
      this.master.style.display = "none";
      this.action_icon3 = false
      this.action_icon4 = true
    }
  }

  account_dropdown() {
    this.master = document.getElementById("dropdown_account")
    if (this.master.style.display != "block") {
      this.master.style.display = "block";
      this.action_icon5 = true
      this.action_icon6 = false

    } else {
      this.master.style.display = "none";
      this.action_icon5 = false
      this.action_icon6 = true
    }
  }

  report_dropdown() {
    this.master = document.getElementById("dropdown_report")

    if (this.master.style.display != "block") {
      this.master.style.display = "block";
      this.action_icon9 = true
      this.action_icon10 = false

    } else {
      this.master.style.display = "none";
      this.action_icon9 = false
      this.action_icon10 = true
    }
  }


  dropdown_address() {
    this.master = document.getElementById("dropdown_address")
    if (this.master.style.display != "block") {
      this.master.style.display = "block";
      this.action_icon7 = true
      this.action_icon8 = false

    } else {
      this.master.style.display = "none";
      this.action_icon7 = false
      this.action_icon8 = true
    }
  }
  changepassword() {
    this.dailog.open(InstChangePasswordComponent, {
      disableClose: true
    });
  }

}

