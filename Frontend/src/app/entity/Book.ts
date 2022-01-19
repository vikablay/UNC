import {Byte} from "@angular/compiler/src/util";

export class Book {
  id: number;
  name: string;
  authors: [
    {
    firstName: string,
    lastName: string
    }
  ];
  image: Byte[];
  averageRating: number;
}
