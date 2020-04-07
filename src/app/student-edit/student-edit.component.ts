import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {
  id: number;
  data: Student;
 
  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService) {  
      this.data = new Student();
      //[...data]
    }

  ngOnInit(){
    this .id= this.activatedRoute.snapshot.params['id'];
      //get item details using id
      this.apiService.getItem(this.id);
  }
  update(){
   this.apiService.updateItem(this.id,this.data).subscribe(response=>{
     console.log(response);
     this.router.navigate(['list']);
   })
  }
}
