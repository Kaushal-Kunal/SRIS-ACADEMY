import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-addunit',
  templateUrl: './addunit.component.html',
  styleUrls: ['./addunit.component.css']
})
export class AddunitComponent implements OnInit {
  disableSelect = new FormControl(false);
  quiz_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'
  course_data: any
  institute_id = 1;
  login_deatils: any;
  inst_id: any;
  login: any;
  inst_id_for_inst_login: any;

  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private service: ManageService,
    private router: Router,
    private matref: MatDialogRef<AddunitComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_unit: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    this.inst_id_for_inst_login = this.login.inst_id

    const courseform = new FormData()
    courseform.append('inst_id', this.login.inst_id)

    this.service.get_course_by_inst_id(courseform).subscribe(
      (res: any) => {
        console.log(res);
        this.course_data = res.data
      }
    )
  }

  ngOnInit(): void {
    console.log(this.edit_unit)
    this.quiz_form = this.fb.group({
      unit_id: ['',],
      unitname: ['', Validators.required],
      unitdesc: [''],
      course_id_fk: ['', Validators.required],
      institute_id_fk: [''],
      admin_id_fk: ['', Validators.required]
    })

    this.quiz_form.controls['institute_id_fk'].setValue(this.inst_id_for_inst_login);

    if (this.edit_unit.unit_id) {
      this.actionBtn = "Update";
      this.quiz_form.controls['unit_id'].setValue(this.edit_unit.unit_id);
      this.quiz_form.controls['unitname'].setValue(this.edit_unit.unitname);
      this.quiz_form.controls['unitdesc'].setValue(this.edit_unit.unitdesc);
      this.quiz_form.controls['course_id_fk'].setValue(this.edit_unit.course_id);
      this.quiz_form.controls['institute_id_fk'].setValue(this.edit_unit.inst_id);
      this.quiz_form.controls['admin_id_fk'].setValue(this.edit_unit.admin_id_fk);
    }

    else {

    }

  }

  onSubmit() {
    if (!this.edit_unit.unit_id) {
      this.onAddUnit()
    } else {
      this.unitUpdate()
    }
  }

  onAddUnit() {
    if (this.quiz_form.valid)
      this.service.unit_insert(this.quiz_form.value).subscribe(
        (res: any) => {
          console.log(res)
          this.matref.close();
          console.log(this.quiz_form.value)
          this.popup.success({ detail: 'Success', summary: 'Quiz Saved', })
          this.router.navigate(['/institutehome/unitview'], this.edit_unit)
        },
        (error: any) => {
          console.log(error)
          this.popup.error({ detail: 'Unsuccess', summary: 'Quiz Not Saved', })
        }
      )

  }


  unitUpdate() {
    console.log(this.quiz_form.value)
    this.service.unit_update(this.quiz_form.value).subscribe({
      next: (res: any) => {
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'unit Updated' })
        this.router.navigate(['/institutehome/unitview'], this.quiz_form.get('course_id_fk')?.value)
      },
      error: (error: any) => {
        console.log(error)
        this.popup.error({ detail: 'Unsuccess', summary: 'Quiz Not Updated' })
      }

    }
    )
  }

}
