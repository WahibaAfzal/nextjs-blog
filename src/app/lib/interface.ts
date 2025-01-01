import { TypedObject } from "sanity";

export interface simpleBlogCard {
    title: string;
    smalDescription: string;
    currentSlug: string;
    titleImage:  {
      asset: {
        _ref: string;
        _type: string;
      };
      alt?: string;
    };
  }

export interface fullBlog {
  currentSlug: string;
  title: string;
  content: TypedObject[];
  titleImage:  {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
}  