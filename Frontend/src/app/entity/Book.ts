import {Byte} from "@angular/compiler/src/util";

export class Book {
  id: number;
  name: string;
  description: string;
  authors: [
    {
      firstName: string,
      lastName: string
    }
  ];
  sumRatingMarks: number;
  ratingsQuantity: number;
  averageRating: number;
  genres: [
    { name: string }
  ]
  image: Byte[];
}
