export class Book {

  constructor(name: string, authors: [{ firstName: string, lastName: string }], image: string, description: string) {
  }

  id: number;
  name: string;
  authors: [
    {
      firstName: string,
      lastName: string
    }
  ];
  image: string;
  averageRating: number;
  description: string;
}
