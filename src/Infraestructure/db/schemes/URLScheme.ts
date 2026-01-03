import { IURL } from "@src/Domain/entities/URL";
import { CollectionList } from "@src/helpers/collectionList";
import { model, Schema } from "mongoose";

const URLScheme = new Schema<IURL>({
  id: { type: String, required: true },
  originalURL: { type: String, required: true },
  shortURL: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, required: true },
})

const URLModel = model<IURL>(CollectionList.URLS, URLScheme);
export { URLModel };