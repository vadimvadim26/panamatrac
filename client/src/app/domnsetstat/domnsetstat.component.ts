import { Component, OnInit } from '@angular/core';
import {CampaignServices} from "../shared/services/campaign.service";
import {LinksServices} from "../shared/services/links.services";

@Component({
  selector: 'app-domnsetstat',
  templateUrl: './domnsetstat.component.html',
  styleUrls: ['./domnsetstat.component.scss']
})
export class DomnsetstatComponent implements OnInit {
  alllinks: any
  constructor(
    private  campaignService: CampaignServices,
    private  linksServices: LinksServices,
  ) { }

  ngOnInit(): void {

  }



  showFreeDom(){

    this.campaignService.getDomainid().subscribe(data =>{
      this.alllinks = data

      let freelinks = []

      for(let i = 0; i<this.alllinks.length; i++){
        let dom = this.alllinks[i]

        if(dom.default_campaign_id === 0){
          console.log(dom.name)
          freelinks.push(
            {
              'name': dom.name,
              'freelink': true
            }
          )
        }

      }

      for(let b=0; b<freelinks.length; b++){
        console.log('+')
        let frelink = freelinks[b]
        this.linksServices.updateDomain(frelink).subscribe(()=>{

        })
      }



    })

  }


}
