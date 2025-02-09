import {Component, OnInit, ViewChild} from '@angular/core';
import {OffersServices} from "../shared/services/offers.services";
import {LinksServices} from "../shared/services/links.services";
import {PrelandingsServices} from "../shared/services/prelandings.services";
import {GeosofoffersServices} from "../shared/services/geosofoffers.services";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LinkcreatorComponent} from "../linkcreator/linkcreator.component";
import {FavoritesoffersServices} from "../shared/services/favoritesoffers.services";

@Component({
  selector: 'app-offers-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})






export class DashboardPageComponent implements OnInit {
  @ViewChild(LinkcreatorComponent)
  linlcreator:  LinkcreatorComponent | undefined
  newbundle: any
  linkscount: any
  favoritescount: any
  statuslink: string = 'free'
  openedgeo: any
  aboutoffer: any
  openedpreland: any
  activepgeo: any
  activepreland: any
  localname: any
  disabled: boolean = false
  favoriteofferbool: boolean = false
  developer: boolean = false
  admin: boolean = false
  user: any
  response: any
  prelandresponse: any
  loading = false
  prelandlist = false
  form: any
  offers: any
  prelandings: any
  favoritesoffers: any
  geosofoffers: any
  geosofoffer: any
  prelandingsTrack: any
  id: string = ''
  mylinkscount: any
  landings_groupId: string = '94'
  name_divider: string = '_'
  constructor(
              private  offersService: OffersServices,
              private prelandingsService: PrelandingsServices,
              private geosofoffersService: GeosofoffersServices,
              private favoritesoffersService: FavoritesoffersServices,
              private  linksService: LinksServices,
              private snackBar: MatSnackBar,
              private http: HttpClient
              ){}



  ngOnInit(): void {

    this.aboutoffer = {
      url: ''
    }

    this.openedgeo = {
      opened: false,
      geo: '',
      offer: ''
    }
    this.openedpreland = {
      opened: false,
      geo: '',
      offer: '',
      name: ''
    }
    this.activepgeo = {
      active: false,
      geo: '',
      offer: ''
    }

    this.newbundle = {
      track_id: '',
      geo: '',
      name: '',
      offer: '',
      offer_img: '/uploads/11082023-124940_341-notimage.png',
      preland_img: '',
      preland_preview: '',
      preland_url: '',
      status_link: this.statuslink,
      all_links_count: this.linkscount
    }

    this.linkscount = {
      free: [],
      new: []
    }


    let userstring = localStorage.getItem('user')
    if (typeof userstring === "string") {
      this.user = JSON.parse(userstring)
      if(this.user.rights === 'User') {
        this.disabled = true
      }else if(this.user.rights === 'Developer'){
        this.developer = true
      }else if(this.user.rights === 'Admin'){
        this.admin = true
      }
    }

        this.offersService.fetch().subscribe(offers =>{

          this.offers = offers

        })
    this.geosofoffersService.fetch().subscribe(geosofoffers =>{

      this.geosofoffers = geosofoffers

    })
    this.prelandingsService.fetch().subscribe(prelandings =>{

      this.prelandings = prelandings

    })

    this.favoritesoffersService.getAll(this.user).subscribe(favoritesoffers =>{
      console.log(favoritesoffers, 'sd')
      this.favoritesoffers = favoritesoffers
      this.favoritescount = this.favoritesoffers.length

    })


      this.linksService.getlinks('active').subscribe(res =>{
        this.mylinkscount = res
        this.mylinkscount = this.mylinkscount.length

      })


  }

  setLocalstr(name: string){
    if(name) {
      this.localname = name
      localStorage.setItem('offer', name);
    }else if(!name)(
      localStorage.removeItem('offer')
    )
  }

  openPreland(offer: string , geo: string){


    if(offer && geo) {
      this.geosofoffer = {
        offer: offer,
        geo: geo
      }



      this.openedgeo = {
        opened: true,
        geo: geo,
        offer: offer
      }
      this.prelandlist = true
    /*  console.log(this.geosofoffer)*/
    }else{
      this.prelandlist = false
      this.openedgeo = {
        opened: false,
        geo: '',
        offer: ''
      }
    }
  }

  newBundle(preland: any, offerimgsrc: string){
    const new_bundle = {
      name: preland.name,
      geo: preland.geo,
      offer: preland.offer,
      track_id: preland.track_id
    }
    if(preland) {
      localStorage.setItem('new_bundle', JSON.stringify(new_bundle));
     /* console.log(preland)*/
      this.openedpreland = {
        opened: true,
        geo: preland.geo,
        offer: preland.offer,
        name: preland.name
      }
      this.newbundle = {
        opened: false,
        track_id: preland.track_id,
        geo: preland.geo,
        name: preland.name,
        offer: preland.offer,
        offer_img: offerimgsrc,
        preland_img: preland.avatar,
        preland_preview: preland.preview_img,
        preland_url: preland.preland_link,
        status_link: this.statuslink,
        all_links_count: this.linkscount
      }
    }else{
      this.openedpreland = {
        opened: false,
        geo: '',
        offer: '',
        name: ''
      }
    }
  }

  whitePack(geo: string) {
    this.newbundle.geo = geo
  }




  getLinks(){
    this.linkscount.free = []
    this.linkscount.new = []
    this.linksService.allLinks().subscribe(res => {

      for(let i =0; i<res.length; i++){
        let linkres = res[i]
        if(linkres.status === 'free'){
          this.linkscount.free.push(linkres)
        }else if(linkres.status === 'new'){
          this.linkscount.new.push(linkres)
        }

      }
      console.log(this.linkscount)

    })
  }

  offerActivator(offer: string){
    let active = '1'
    this.offersService.update(offer, active).subscribe(offers =>{
      this.snackBar.open('Offer: ' +offer+' active', 'ok')
    })
    this.offersService.fetch().subscribe(offers =>{

      this.offers = offers

    })
   /* console.log(offer)*/
  }
  offerDeActivator(offer: string){
    let active = '0'
    this.offersService.update(offer, active).subscribe(offers =>{
      this.snackBar.open('Offer: ' +offer+' Deactive', 'ok')
    })
    this.offersService.fetch().subscribe(offers =>{

      this.offers = offers

    })
    /* console.log(offer)*/
  }


  addToFavorite(offer: string, user: string){
    let favoriteoffer = {
      offer: offer,
      user: user
    }
    console.log(favoriteoffer)

    this.favoritesoffersService.create(favoriteoffer).subscribe(favoritesoffers => {
      this.favoritesoffersService.getAll(this.user).subscribe(favoritesoffers =>{

        this.favoritesoffers = favoritesoffers
        this.favoritescount = this.favoritesoffers.length
      })
      this.snackBar.open(offer + ' added to favorites ⭐', 'ok')
    })

  }

  removeFavorite(offer: string, user: string){
    let favoriteoffer = {
      offer: offer,
      user: user
    }
    console.log(favoriteoffer)

    this.favoritesoffersService.update(favoriteoffer).subscribe(favoritesoffers => {
      this.favoritesoffersService.getAll(this.user).subscribe(favoritesoffers =>{

        this.favoritesoffers = favoritesoffers
        this.favoritescount = this.favoritesoffers.length


      })
      this.snackBar.open(offer + ' removed from favorites ⭐', 'ok')
    })

  }

  geoActivator(offer: string, geo: string) {

    let geoactive = {
      offer: offer,
      geo: geo,
      active: '1'
    }

    this.geosofoffersService.update(geoactive).subscribe(geosofoffers => {
      this.snackBar.open('Geo: ' + geo + ' of offer: ' + offer + ' activate', 'ok')
      console.log(geosofoffers)
    })
    this.geosofoffersService.fetch().subscribe(geosofoffers =>{

      this.geosofoffers = geosofoffers

    })
  }
  geoDeActivator(offer: string, geo: string){
      let geoactive = {
        offer: offer,
        geo: geo,
        active: '0'
      }

    this.geosofoffersService.update(geoactive).subscribe(geosofoffers =>{
      this.snackBar.open('Geo: ' +geo+' of offer: '+offer+ ' Deactivate', 'ok')
    })
    this.geosofoffersService.fetch().subscribe(geosofoffers =>{

      this.geosofoffers = geosofoffers

    })
  }

  prelandActivator(offer: string, geo: string, name: string) {
    let active = '1'
    this.prelandingsService.update(offer, geo, name, active).subscribe(prelandings => {
      this.snackBar.open('Geo: ' + geo + ' of offer: ' + offer + ' activate', 'ok')

    })
    this.prelandingsService.fetch().subscribe(prelandings =>{

      this.prelandings = prelandings

    })
  }
  prelandDeActivator(offer: string, geo: string, name: string){
    let active = '0'

    this.prelandingsService.update(offer, geo, name, active).subscribe(prelandings =>{
      this.snackBar.open('Geo: ' +geo+' of offer: '+offer+ ' Deactivate', 'ok')
    })
    this.prelandingsService.fetch().subscribe(prelandings =>{

      this.prelandings = prelandings

    })
  }

  aboutPreland(track_id: string, avatar: string){
   /* console.log(track_id)*/
    this.http.get('/admin_api/v1/landing_pages/'+track_id, {
      headers: new HttpHeaders({
        'Api-Key': '78b91a492738b74ac8ed6b6f53e15467'
      })
    }).subscribe((response) => {
      this.prelandresponse = response
      let url = 'http://178.62.251.36'+this.prelandresponse.preview_path
      let prelandurl = 'http://178.62.251.36'+this.prelandresponse.local_path
      let spliter = '_'
      let namesplit = this.prelandresponse.name.split(spliter)
      this.aboutoffer = {
        url: url,
        prelandurl: prelandurl,
        name: this.prelandresponse.name,
        offer: namesplit[2],
        geo: namesplit[0],
        avatar: avatar
      }
    })

  }
}


