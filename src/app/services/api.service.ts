import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Student } from "../models/student";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  base_path = "http://localhost:3000/students";
  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    header: new HttpHeaders({
      "content-Type": "application/json",
    }),
  };
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error has occurred", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend return Code ${error.error}`,
        `+ body was ${error.error}`
      );
    } // return an observable with a user-facing error message
    return throwError("Something bad happened; Please try again later.");
  }

  // Create a new item
  createItem(item): Observable<Student> {
    return this.http
      .post<Student>(this.base_path, JSON.stringify(item))
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get single student data by ID
  getItem(id): Observable<Student> {
    return this.http
      .get<Student>(this.base_path + "/" + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get students data
  getList(): Observable<Student> {
    return this.http
      .get<Student>(this.base_path)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update item by id
  updateItem(id, item): Observable<Student> {
    return this.http
      .put<Student>(this.base_path + "/" + id, JSON.stringify(item))
      .pipe(retry(2), catchError(this.handleError));
  }

  // Delete item by id
  deleteItem(id) {
    return this.http
      .delete<Student>(this.base_path + "/" + id)
      .pipe(retry(2), catchError(this.handleError));
  }
}
