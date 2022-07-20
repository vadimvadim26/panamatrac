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
  response: any
  stream_b: string = ''
  hotcampaignid: string = ''
  stream_w: string = ''
  streams: any
  campaign: any
  localuser: any
  domains: any
  form: any
  sub2: string = 'Gosha'
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
  }

  ngOnChanges() {  }

  onSubmit(){

    this.finish = false

    if(this.form.value.sub1 && this.form.value.sub3 && this.sub2){
      let getuser = localStorage.getItem('user')
      if (typeof getuser === "string") {
        this.localuser = JSON.parse(getuser)
      }
        this.form.disable()
        this.linksService.hotlink().subscribe(links =>{
          this.domains = links
          let domain = this.domains.domain
          let activedom = {
            domain: domain,
            user_id: this.localuser.user_id
          }
          this.linksService.activelink(activedom).subscribe(links => {
          this.campaignService.getonecamp().subscribe(camp =>{
            this.campaign = camp
            for(let c=0; c<this.campaign.length; c++){
              let camp = this.campaign[c]
              if(camp.group_id === '95' || camp.name === this.newbundle.geo){
                this.campaignService.create(camp.id).subscribe(camp =>{
                  // @ts-ignore
                  for(let res of camp){
                    this.campaignService.getstreamofcamp(res.id).subscribe(streams =>{
                      this.streams = streams
                      this.hotcampaignid = res.id
                      for(let stream of this.streams){
                        if(stream.name === 'black'){
                          this.stream_b = stream.id
                        }
                        if(stream.name === 'white'){
                          this.stream_w = stream.id
                        }
                      }
                      let newstream = {
                        black_id: this.newbundle.track_id,
                        white_id: '',
                        stream_b: this.stream_b,
                        stream_w: this.stream_w
                      }
                      this.campaignService.updateStream(newstream).subscribe(res =>{
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
                          full_link: '',
                          sub1: this.form.value.sub1,
                          sub2: this.sub2,
                          sub3: this.form.value.sub3,
                          campaign_id: this.hotcampaignid,
                          stream_b_id: this.stream_b,
                          stream_w_id: this.stream_w,
                          geo: this.newbundle.geo,
                          offer: this.newbundle.offer,
                          preland: this.newbundle.name,
                          white: ''
                        }
                        this.link = newlink
                        this.campaignService.updateCampaign(hotcamp).subscribe(res =>{
                        })
                        this.linksService.update(this.link).subscribe(links => {
                          this.snackBar.open('Link: ' +this.domains.domain+' created', 'ok')
                          this.link = links
                          this.form.enable()
                        })
                        this.campaignService.updateDomain(this.domains.domain_id, newlink.campaign_id).subscribe(res =>{
                          this.response = res

                          if(res){
                            console.log(this.response.name)
                            this.finishres = this.response
                            this.finish = true
                          }else {
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
            }
          })
          })
        })
        }else if (!this.form.value.sub1 && !this.form.value.sub3){
          this.snackBar.open('Error, all field required', 'ok')
          this.form.enable()
        }
            else if(!this.form.value.sub1){
              this.snackBar.open('Error, field FbPixel required', 'ok')
              this.form.enable()
            }else if(!this.form.value.sub2){
              this.snackBar.open('Error, field Campaign name required', 'ok')
              this.form.enable()
            }
  }
}
