import {Byte} from "@angular/compiler/src/util";

export class Book {
  id: number;
  name: string;
  author: string;
  image: Byte[];
  averageRating: number;
}
