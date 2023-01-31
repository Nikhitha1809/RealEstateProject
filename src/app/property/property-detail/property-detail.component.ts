import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';


@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
public propertyId:number;
property =new Property();

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.propertyId=+this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data:Property)=>{
        this.property=data['prp']
      }
    )

  }
}
