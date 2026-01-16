import { ICategory } from "./ICategory";

export interface IBaseListResponse {
  items: ICategory[];
  size: number;
  index: number;
  count: number;
  pages: number;
  hasprevious: boolean;
  hasNext: boolean;
}
