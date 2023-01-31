
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { HousingService } from 'src/app/services/housing.service';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent=1;
  properties: IPropertyBase[];
  City='';
  SearchCity='';
  SortbyParam='';
  SortDirection='asc';

  constructor(private route:ActivatedRoute, private housingService:HousingService) { }

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()){
      this.SellRent=2; //means we are on rent-property Url else we are on base url
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      data => {
      this.properties = data;

      console.log(data);
    }, error => {
      console.log('httperror:');
      console.log(error);
    }
  );
}
onClickFilter(){
  this.SearchCity=this.City;
}
onClickFilterClear(){
  this.SearchCity='';
  this.City='';
}
onSortDirection(){
  if(this.SortDirection==='desc'){
    this.SortDirection='asc';
  }else{
    this.SortDirection='desc';
  }
}
}
