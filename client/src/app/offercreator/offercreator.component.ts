import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OffersServices} from "../shared/services/offers.services";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-offercreator',
  templateUrl: './offercreator.component.html',
  styleUrls: ['./offercreator.component.scss']
})
export class OffercreatorComponent implements OnInit {
  offers: any
  form: any
  imagePreview: any
  image = File
  filename = ''
  imagedata: any
  constructor(private  offersService: OffersServices,
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
    this.offersService.create(this.form.value.name, this.imagedata).subscribe(offers => {
      this.snackBar.open('Offer: ' + this.form.value.name + ' created', 'ok')
      this.offers = offers
      this.form.enable()

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
