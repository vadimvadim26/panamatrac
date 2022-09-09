import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LinksServices} from "../shared/services/links.services";

@Component({
  selector: 'app-domnsetstat',
  templateUrl: './domnsetstat.component.html',
  styleUrls: ['./domnsetstat.component.scss']
})
export class DomnsetstatComponent implements OnInit {
  form:any
  statusdomain: string = 'remove'
  constructor(
    private  linksService: LinksServices
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      domains: new FormControl(null, [Validators.required])
    })
  }

  setStatusDom(status: string){
    this.statusdomain = status
  }

 setStatus(){

   let split = ' '
   let domain = this.form.value.domains.split(split)

     const newlinks = {
       linksDead: true,
       domain: domain,
       status: this.statusdomain
     }

     console.log(newlinks)
     this.linksService.updateDomain(newlinks).subscribe(res => {
       console.log(res)
     })


 }


}
