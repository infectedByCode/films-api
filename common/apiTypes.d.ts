export interface Film {
  uid: string;
  title: string;
  description: string;
  year: number;
  keywords: string;
}

export interface RawFilm {
  title: string;
  description: string;
  year: number;
  keywords: string;
}
