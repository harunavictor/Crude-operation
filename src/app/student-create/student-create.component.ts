import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit {
 data :Student;
  constructor( public apiService:ApiService,
    public router:Router) { }

  ngOnInit(): void {
  }
  submitForm(){
    this.apiService.createItem(this.data).subscribe((response)=>{
      this.router.navigate(['lists'])
    })
  }
}
