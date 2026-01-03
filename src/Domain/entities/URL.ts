export interface IURL {
  id: string;
  originalURL: string;
  shortURL: string;
  userId: string;
  createdAt: Date;
  alias?: string;
}