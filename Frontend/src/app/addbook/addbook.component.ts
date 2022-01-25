import {Component, OnInit} from '@angular/core';
import {RestapiService} from "../restapi.service";
import {Byte} from "@angular/compiler/src/util";
import {Book} from "../entity/Book";
import {FormBuilder, FormGroup} from '@angular/forms';
import {deserialize} from "class-transformer";

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {

  book: Book;
  bookName: string;
  authorName: string;
  description: string;
  image: File;
  byteArray: Uint8Array;
  title = "NOTHING"

  constructor(private service: RestapiService) {
  }

  convertDataURIToBinary(dataURI: string): Uint8Array {
    let base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
    let base64 = dataURI.substring(base64Index);
    let raw = window.atob(base64);
    let rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  onFileSelected(event: any) {
    console.log("IMG:  " + this.image);
    this.image = event.target.files[0];
    console.log("IMG2:  " + this.image);
    const preview = document.getElementById('preview');
    const reader = new FileReader();
    reader.addEventListener("loadend",() =>{
      // convert image file to base64 string
      console.log('onFileSelected:', reader.result);
      console.log('onFileSelected22:',((<string>reader.result).split(';')[1]).split(',')[1]);
      console.log('onFileSelected Type:',typeof ((<string>reader.result).split(';')[1]).split(',')[1]);
      let str =((<string>reader.result).split(';')[1]).split(',')[1];
      let bytes = [];
      for(let i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        bytes.push(char >>> 8);
        bytes.push(char & 0xFF);
      }
      console.log('onFileSelected len:',((<string>reader.result).split(';')[1]).split(',')[1].length);

      console.log('bytes:', bytes);
      //preview.src = reader.result;
     this.byteArray = this.convertDataURIToBinary(<string>reader.result);

      console.log('byte array', this.byteArray);
    },false);

    if (this.image) {
      reader.readAsDataURL(this.image);
    }
  }


  saveBook() {
    this.title = "book saved ";

    /*let formData = new FormData();
    formData.append("file", this.image, this.image.name);
    console.log("FOrmData:  " + formData);*/
    let resp = this.service.saveBook(this.bookName, this.authorName.split(' ')[0],
      this.authorName.split(' ')[1], this.byteArray);
    resp.subscribe(data => {
      console.log("DATA:  " + data)});
  }

}
