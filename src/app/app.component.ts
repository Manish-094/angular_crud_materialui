import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CrudWith-MaterialUI';
  displayedColumns: string[] = ['productName', 'category', 'freshness', 'price','date','comment','action'];
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,private apiservice:ApiService) {}
  ngOnInit(): void {
    this.getAllProduct();
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'35%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllProduct();
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
  getAllProduct(){
    this.apiservice.getProduct().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=>{
        alert("Error while fetching the data");
      }
    });
  }

  editProduct(row_value:any){
    this.dialog.open(DialogComponent,{
      width:'35%',
      data:row_value
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllProduct();
      }
    })
  }

  deleteProduct(id:number){
    this.apiservice.deleteProduct(id).subscribe({
      next:(res)=>{
        alert("Producct deleted Successfully");
        this.getAllProduct();
      },
      error:()=>{
        alert("Error While Deleting record");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
