import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GeosofoffersServices} from "../shared/services/geosofoffers.services";
import {PrelandingsServices} from "../shared/services/prelandings.services";

@Component({
  selector: 'app-prelandingcreator',
  templateUrl: './prelandingcreator.component.html',
  styleUrls: ['./prelandingcreator.component.scss']
})
export class PrelandingcreatorComponent implements OnInit {
  form: any
  response: any
  geosofoffers: any
  prelandings: any
  imagePreview: any
  image = File
  filename = ''
  imagedata: any
  constructor(private  geosofoffersService: GeosofoffersServices,
              private  prelandingsService: PrelandingsServices,
              private http: HttpClient,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    })


  }

  onFileSelected(event: any) {

    const file = event.target.files[0];

    this.imagedata = file
    this.filename = file.name
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)

  }


  onSubmit(){
    this.form.disable()

    if(this.form.value.name && this.imagedata) {

      this.http.get('/admin_api/v1/landing_pages/' + this.form.value.name, {
        headers: new HttpHeaders({
          'Api-Key': '78b91a492738b74ac8ed6b6f53e15467'
        })
      }).subscribe((response) => {
        this.response = response

        const divider = '_'
        const resname = this.response['name']
        const newname = resname.split(divider)

        let url = 'http://178.62.251.36'+this.response['preview_path']
        let prelandurl = 'http://178.62.251.36'+this.response['local_path']

        let newgeo = {
          geo: newname[0],
          offer: newname[1]
        }
        let newpreland = {
          name: newname[2],
          geo: newname[0],
          offer: newname[1],
          avatar: '',
          preview_img: url,
          preland_link: prelandurl,
          track_id: this.form.value.name
        }


        this.geosofoffersService.update(newgeo).subscribe(geosofoffers => {
          this.geosofoffers = geosofoffers
        })

        this.prelandingsService.create(newpreland, this.imagedata).subscribe(prelandings => {
          this.snackBar.open('Prelanding: ' + newname[2] + ' created', 'ok')
          this.prelandings = prelandings
          this.form.enable()

        })

      })
    }else if(!this.form.value.name){
      this.snackBar.open('Error, field name required', 'ok')
      this.form.enable()
    }else if(!this.imagedata){
      this.snackBar.open('Error, field File required', 'ok')
      this.form.enable()
    }



  }

}
