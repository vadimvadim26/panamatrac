import { Component, OnInit } from '@angular/core';
import {LinksServices} from "../shared/services/links.services";

@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss']
})
export class LinksPageComponent {
  localuser: any
  links: any
  constructor(private  linksService: LinksServices) { }

  ngOnInit() {

    let getuser = localStorage.getItem('user')
    if (typeof getuser === "string") {
      this.localuser = JSON.parse(getuser)
    }
    this.linksService.getlinks().subscribe(res =>{
      this.links = res
console.log(res)
    })
  }

}
