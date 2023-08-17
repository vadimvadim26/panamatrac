import { Component, OnInit } from '@angular/core';
import { PageEvent } from "@angular/material/paginator";
import { LinksServices } from "../shared/services/links.services";
import { PrelandingsServices } from "../shared/services/prelandings.services";

@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss']
})
export class LinksPageComponent implements OnInit {
  localuser: any;
  links: any;
  prelandings: any;
  linkstatus: string = 'active';
  src: any;
  pageSize: number = 10; // Выберите нужный размер страницы
  pageIndex: number = 0; // Начальный индекс страницы
  slicedLinks: any; // Массив для отображения на странице
  constructor(
    private linksService: LinksServices,
    private prelandingsService: PrelandingsServices
  ) { }


  ngOnInit() {
    let getuser = localStorage.getItem('user');
    if (typeof getuser === "string") {
      this.localuser = JSON.parse(getuser);
    }

    this.linksService.getlinks(this.linkstatus).subscribe(res => {
      this.links = res;
      this.sliceLinks(); // Вызовите этот метод после получения links
    });


    this.prelandingsService.fetch().subscribe(prelandings => {

      this.prelandings = prelandings;

    });
  }

  onPageChange(event: PageEvent) {
    // Обновляем индекс и размер страницы при смене страницы
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.sliceLinks(); // Вызываем метод для обрезания массива
  }

  sliceLinks() {
    // Обрезаем массив links по индексу и размеру страницы
    this.slicedLinks = this.links.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

  selectLinkList(status: string) {
    this.linksService.getlinks(status).subscribe(res => {
      this.links = res;
      this.linkstatus = status;
      this.sliceLinks(); // Вызываем метод для обрезания массива
    });
  }


  updateLink(link: string, count: any) {
    const newlink = {
      domain: link,
      count: count
    };
    console.log(newlink, 'remove');
    /* this.linksService.updateDomain(newlink).subscribe(res =>{
       if(res){
         this.linksService.getlinks(this.linkstatus).subscribe(res =>{
           this.links = res
         })
       }

     })*/
  }

}
