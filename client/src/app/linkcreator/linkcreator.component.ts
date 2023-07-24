import {Component, Input, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LinksServices} from "../shared/services/links.services";
import {CampaignServices} from "../shared/services/campaign.service";
import {WhiteServices} from "../shared/services/white.services";
import { CloudflareService } from '../shared/services/cloudflare.service';

@Component({
  selector: 'app-linkcreator',
  templateUrl: './linkcreator.component.html',
  styleUrls: ['./linkcreator.component.scss']
})
export class LinkcreatorComponent{
  uniqueDomainZonesArray: any
  domain_status: string = ''
  domainszones: any
  manualwhite: boolean = false
  zoneslistbool: boolean = false
  whitelistbool: boolean = false
  getwhitebool: boolean = false
  getonewhite: any
  finishres: any
  finish: boolean = false
  start: boolean = false
  copy: boolean = false
  response: any
  fulldata: any
  stream_b: string = ''
  hotcampaignid: string = ''
  stream_w: string = ''
  white: string = ''
  encryptedSub: any
  streams: any
  campaign: any
  localuser: any
  domains: any
  form: any
  sub2: string = ''
  link: any
  whitepack: any
  @Input()
  newbundle: any

constructor(private  linksService: LinksServices,
            private campaignService: CampaignServices,
            private whiteService: WhiteServices,
            private snackBar: MatSnackBar,
            private cloudflareService: CloudflareService
) {}

  ngOnInit(){
    this.form = new FormGroup({
      sub1: new FormControl(null, ),
      sub3: new FormControl(null, )
    })
    let getuser = localStorage.getItem('user')
    if (typeof getuser === "string") {
      this.localuser = JSON.parse(getuser)
      this.sub2 = this.localuser.name
    }

    this.whitepack = []



  }

  ngOnChanges() {  }




  copied(){
    this.copy = true
  }

  removeLink(data: string){
    this.linksService.removelink(data).subscribe(()=>{
     /* console.log('removed')*/
      this.finish = false
    })
  }

  getWhite(white: any){
    console.log(white)
    this.manualwhite = true
    this.getwhitebool = true
    this.getonewhite = white
  }

  getwhitepage(geo: string){
    this.newbundle.opened = true
    this.manualwhite = false
    this.getwhitebool = false
    this.whitepack = []
    this.whitelistbool = false
    this.whiteService.getWhiteLand(geo).subscribe( data=>{

      if( geo === 'EC' ||
         geo === 'BO' ||
        geo === 'CR' ||
         geo === 'CL' ||
         geo === 'GT' ||
         geo === 'CO' ||
        geo === 'MX' ||
        geo === 'PE'
        ){
        geo = 'ES'
      }
      for(let i = 0; i<data.length; i++){
        let res = data[i]
        if(res.group_id === 100){
          /*console.log(res.name)*/
          let split = '_'
          let geos = res.name.split(split)
          if(geos[0] === geo){
            this.whitepack.push(
              {
                geo: geos[0],
                constructor: geos[1],
                topic: geos[2],
                number: geos[3],
                track_id: res.id,
                white_url: 'http://178.62.251.36'+res.local_path
              })

          }
        }
      }
      console.log(this.whitepack)
      this.whitelistbool = true
    })

  }

  getnewwhitepage(geo: string){
    this.newbundle.opened = true
    this.manualwhite = false
    this.getwhitebool = false
    this.whitepack = []
    this.whitelistbool = false
    this.whiteService.getWhiteLand(geo).subscribe( data=>{

      if( geo === 'EC' ||
         geo === 'BO' ||
        geo === 'CR' ||
         geo === 'CL' ||
         geo === 'GT' ||
         geo === 'CO' ||
        geo === 'MX' ||
        geo === 'PE'
        ){
        geo = 'ES'
      }
      for(let i = 0; i<data.length; i++){
        let res = data[i]
        if(res.group_id === 100){
          /*console.log(res.name)*/
          let split = '_'
          let geos = res.name.split(split)
          if(geos[0] === geo && geos[4] === 'new'){
            this.whitepack.push(
              {
                geo: geos[0],
                constructor: geos[1],
                topic: geos[2],
                number: geos[3],
                track_id: res.id,
                white_url: 'http://178.62.251.36'+res.local_path
              })

          }
        }
      }
      console.log(this.whitepack)
      this.whitelistbool = true
    })
  }

  getAllDomainZones() {
    this.newbundle.opened = true;
    this.zoneslistbool = true;
    this.linksService.allLinks().subscribe(data => {
      const uniqueDomainZones = new Set(); // Создаем Set для хранения уникальных доменных зон

      for (let i = 0; i < data.length; i++) {
        this.domainszones = data[i];
        let splitter = '.';
        let split = this.domainszones.domain.split(splitter);
        if (split[1]) { // Убеждаемся, что есть хотя бы один элемент после разделения
          uniqueDomainZones.add(split[1]); // Добавляем в Set
        }
      }

      // Преобразуем Set обратно в массив, если это необходимо
      this.uniqueDomainZonesArray = Array.from(uniqueDomainZones);

      console.log(this.uniqueDomainZonesArray);
    });
  }

  testGetZones(){
    let email = 'lkioter@outlook.com'
    let apikey= 'ef6f3a7e18a6c09ad7e5dcee740c4ddbc0b29'
    this.cloudflareService.getZones(email, apikey).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('HTTP Error:', error)
      }
    )
  }

  setOldDomain(){
    this.domain_status = ''
  }

  setNewDomain(){
    this.domain_status = '/:new'
  }

  setNewSubDomain() {
    this.domain_status = 'subdomain'
  }

  onSubmit(){
    this.copy = false
    this.finish = false

    this.start = true
    if(this.start) {
      setTimeout(
        () => {
          if (this.form.value.sub1 && this.form.value.sub3 && this.sub2) {

            this.form.disable()
            this.linksService.hotlink(this.domain_status).subscribe(links => {
              this.domains = links
              let domain = this.domains.domain
              let activedom = {
                domain: domain,
                user_id: this.localuser.user_id,
                use_count: this.domains.use_count
              }
              this.linksService.activelink(activedom).subscribe(links => {
                this.campaignService.getonecamp().subscribe(camp => {
                    this.campaign = camp
                    for (let c = 0; c < this.campaign.length; c++) {
                      let camp = this.campaign[c]
                      if (camp.group_id === '95' || camp.name === this.newbundle.geo) {
                        this.campaignService.create(camp.id).subscribe(camp => {
                          // @ts-ignore
                          for (let res of camp) {
                            this.campaignService.getstreamofcamp(res.id).subscribe(streams => {
                              this.streams = streams
                              this.hotcampaignid = res.id
                              for (let stream of this.streams) {
                                if (stream.name === 'black') {
                                  this.stream_b = stream.id
                                }
                                if (stream.name === 'white') {
                                  this.stream_w = stream.id
                                }
                              }



                                this.campaignService.subEncoder(this.form.value.sub1, this.sub2, this.form.value.sub3).subscribe(res => {
                                  console.log(res)
                                  this.encryptedSub = res

                                })




                        if(this.manualwhite === false){
                          let p = new Promise((resolve) =>{
                            this.campaignService.getWhiteland()
                              .subscribe(res =>{
                                this.response = res
                                let whiteArr = []
                                let whiteidArr = []
                                for(let i =0; i < this.response.length; i++){
                                  let res = this.response[i]
                                  if(res.group_id === 100){
                                    let splitter = '_'
                                    let split = res.name.split(splitter)

                                    let whiteGeo = split[0]
                                    if(whiteGeo === this.newbundle.geo){

                                      whiteArr.push({
                                        geo: split[0],
                                        id: res.id,
                                        name: res.name
                                      })
                                    }else if(
                                      this.newbundle.geo === 'EC' ||
                                      this.newbundle.geo === 'BO' ||
                                      this.newbundle.geo === 'CR' ||
                                      this.newbundle.geo === 'CL' ||
                                       this.newbundle.geo === 'GT' ||
                                       this.newbundle.geo === 'CO' ||
                                      this.newbundle.geo === 'MX' ||
                                      this.newbundle.geo === 'PE'
                                    ){
                                      let Geo = 'ES'
                                      if(whiteGeo === Geo){
                                        whiteArr.push({
                                          geo: split[0],
                                          id: res.id,
                                          name: res.name
                                        })
                                      }
                                    }else{
                                      let Geo = 'EN'
                                      if(whiteGeo === Geo){
                                        whiteArr.push({
                                          geo: split[0],
                                          id: res.id,
                                          name: res.name
                                        })
                                      }
                                    }
                                  }
                                }
                                if(whiteArr.length !== 0){
                                  let rand = Math.floor(Math.random() * whiteArr.length)
                                  whiteidArr.push(whiteArr[rand].id)
                                  console.log(whiteArr[rand])
                                }
                                this.white = whiteidArr.toString()
                                let newstream = {
                                  black_id: this.newbundle.track_id,
                                  white_id: this.white,
                                  stream_b: this.stream_b,
                                  stream_w: this.stream_w
                                }
                                this.campaignService.updateStreamW(newstream).subscribe()
                                resolve(newstream)
                              })
                          })
                          p.then( data =>{

                            this.campaignService.updateStream(data)
                              .subscribe(() => {
                                console.log(data)
                                let hotcamp = {
                                  camp_id: this.hotcampaignid,
                                  geo: this.newbundle.geo,
                                  offer: this.newbundle.offer,
                                  preland: this.newbundle.name,
                                  group_id: 96
                                }
                                let newlink = {
                                  user_id: this.localuser.user_id,
                                  use_count: this.domains.use_count,
                                  status: 'active',
                                  domain: this.domains.domain,
                                  full_link: 'https://'+this.domains.domain+'/?e='+this.encryptedSub,
                                  sub1: this.form.value.sub1,
                                  sub2: this.sub2,
                                  sub3: this.form.value.sub3,
                                  campaign_id: this.hotcampaignid,
                                  stream_b_id: this.stream_b,
                                  stream_w_id: this.stream_w,
                                  geo: this.newbundle.geo,
                                  offer: this.newbundle.offer,
                                  preland: this.newbundle.name,
                                  white: this.white
                                }
                                this.link = newlink
                                this.fulldata = newlink

                                this.campaignService.updateCampaign(hotcamp).subscribe(res => {
                                })

                                this.linksService.update(this.link).subscribe(links => {
                                  this.snackBar.open('Link: ' + this.domains.domain + ' created', 'ok')
                                  this.link = links
                                  this.form.enable()
                                  this.start = false
                                })

                                this.campaignService.updateDomain(this.domains.domain_id, newlink.campaign_id).subscribe(res => {
                                  this.response = res

                                  if (res) {
                                    this.finishres = this.fulldata.full_link
                                    this.finish = true
                                  } else {
                                    this.finish = false
                                  }
                                })
                                this.form.reset()
                                this.form.enable()

                              })
                          })
                        }else if(this.manualwhite === true){
                          let p = new Promise((resolve) =>{
                                let newstream = {
                                  black_id: this.newbundle.track_id,
                                  white_id: this.getonewhite.track_id,
                                  stream_b: this.stream_b,
                                  stream_w: this.stream_w
                                }
                                this.campaignService.updateStreamW(newstream).subscribe()
                            this.manualwhite = false
                            this.getwhitebool = false
                                resolve(newstream)

                          })
                          p.then( data =>{

                            this.campaignService.updateStream(data)
                              .subscribe(() => {
                                console.log(data)
                                let hotcamp = {
                                  camp_id: this.hotcampaignid,
                                  geo: this.newbundle.geo,
                                  offer: this.newbundle.offer,
                                  preland: this.newbundle.name,
                                  group_id: 96
                                }
                                let newlink = {
                                  user_id: this.localuser.user_id,
                                  use_count: this.domains.use_count,
                                  status: 'active',
                                  domain: this.domains.domain,
                                  full_link: 'https://'+this.domains.domain+'/?e='+this.encryptedSub,
                                  sub1: this.form.value.sub1,
                                  sub2: this.sub2,
                                  sub3: this.form.value.sub3,
                                  campaign_id: this.hotcampaignid,
                                  stream_b_id: this.stream_b,
                                  stream_w_id: this.stream_w,
                                  geo: this.newbundle.geo,
                                  offer: this.newbundle.offer,
                                  preland: this.newbundle.name,
                                  white: this.white
                                }
                                this.link = newlink
                                this.fulldata = newlink

                                this.campaignService.updateCampaign(hotcamp).subscribe(res => {
                                })

                                this.linksService.update(this.link).subscribe(links => {
                                  this.snackBar.open('Link: ' + this.domains.domain + ' created', 'ok')
                                  this.link = links
                                  this.form.enable()
                                  this.start = false
                                })

                                this.campaignService.updateDomain(this.domains.domain_id, newlink.campaign_id).subscribe(res => {
                                  this.response = res

                                  if (res) {
                                    this.finishres = this.fulldata.full_link
                                    this.finish = true
                                  } else {
                                    this.finish = false
                                  }
                                })
                                this.form.reset()
                                this.form.enable()

                              })
                          })
                        }






                            })
                          }
                        })
                      }
                    }

                  },
                  error => {
                    console.log(error)
                  })
              })
            })
          } else if (!this.form.value.sub1 && !this.form.value.sub3) {
            this.snackBar.open('Error, all field required', 'ok')
            this.form.enable()
          } else if (!this.form.value.sub1) {
            this.snackBar.open('Error, field FbPixel required', 'ok')
            this.form.enable()
            this.start = false
          } else if (!this.form.value.sub2) {
            this.snackBar.open('Error, field Campaign name required', 'ok')
            this.form.enable()
          }
        }, Math.floor(Math.random() * 1372)
      )
    }
  }


}
