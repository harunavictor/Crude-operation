import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  studentsData: any;
  constructor(public apiService: ApiService) { 
    this.studentsData=[];
  }

  ngOnInit(){
    this.getAllStudents();
  }
 getAllStudents(){
   //Get saved list of students
   this.apiService.getList().subscribe((response)=>{
     console.log(response);
     this.studentsData=response;

   })
 }
  //Delete item in Student data
 delete(item){
this.apiService.deleteItem(item.id).subscribe(rseponse=>{
   //Update list after delete is successful
   this.getAllStudents();
})

 }
}
