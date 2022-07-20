import { Component, OnInit } from '@angular/core';
import {LinksServices} from "../shared/services/links.services";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CampaignServices} from "../shared/services/campaign.service";

@Component({
  selector: 'app-domaincreator',
  templateUrl: './domaincreator.component.html',
  styleUrls: ['./domaincreator.component.scss']
})
export class DomaincreatorComponent implements OnInit {
  getdomtrack: boolean = false
  domains: any
  alldomains: any
  links: any
  form: any
  constructor(private  campaignService: CampaignServices,
              private  linksService: LinksServices,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      domains: new FormControl(null, [Validators.required])
    })
  }




  onSubmit(){
    this.form.disable()
    if(this.form.value.domains) {
      let domains: { domain: any; domain_id: any; }[] = []
      let splitter = ' '
      let value = this.form.value.domains.split(splitter)
      this.campaignService.getDomainid().subscribe(alldomains => {
        if(alldomains){
          this.alldomains =  alldomains
          for (let d = 0; d < value.length; d++) {
            for (let b = 0; b < this.alldomains.length; b++) {
              let domain = this.alldomains[b]
              if (domain.name === value[d]) {
                domains.push({
                  domain: domain.name.toString(),
                  domain_id: domain.id.toString()
                })
              }
            }
          }
          this.domains = domains
        }
      })

    }else if(!this.form.value.domains){
      this.snackBar.open('Error, field domain required', 'ok')
      this.form.enable()
    }
    console.log(this.domains)
      this.linksService.create(this.domains).subscribe(links => {
        this.snackBar.open('Domains: ' + this.form.value.domains + ' created', 'ok')
        this.links = links
        this.form.enable()
        console.log(this.domains)

      })

  }

}
