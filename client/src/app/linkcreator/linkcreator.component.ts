import {Component, Input, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LinksServices} from "../shared/services/links.services";
import {CampaignServices} from "../shared/services/campaign.service";



@Component({
  selector: 'app-linkcreator',
  templateUrl: './linkcreator.component.html',
  styleUrls: ['./linkcreator.component.scss']
})
export class LinkcreatorComponent{
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
  @Input()
  newbundle: any
  offerimg: string = ''
constructor(private  linksService: LinksServices,
            private campaignService: CampaignServices,
            private snackBar: MatSnackBar
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
  }

  ngOnChanges() {  }



  copied(){
    this.copy = true
  }

  removeLink(data: string){
    this.linksService.removelink(data).subscribe(()=>{
      console.log('removed')
      this.finish = false
    })
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
            this.linksService.hotlink().subscribe(links => {
              this.domains = links
              let domain = this.domains.domain
              let activedom = {
                domain: domain,
                user_id: this.localuser.user_id
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
                                      this.newbundle.geo === 'CR' ||
                                      this.newbundle.geo === 'MX' ||
                                      this.newbundle.geo === 'PT'
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
