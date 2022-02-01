export class Book {

  constructor(name: string, authors: [{ firstName: string, lastName: string }], image: string, description: string) {
    this.name = name;
    this.authors = authors;
    this.image = image;
    this.description = description;
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
