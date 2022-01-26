export class Book {

  constructor(name: string, authors: [{ firstName: string, lastName: string }], image: string, description: string) {
  }

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
  image: string;
}
