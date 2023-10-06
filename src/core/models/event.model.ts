import { Category } from "./category.model";
import { User } from "./user.model";

/*
     "id": 0,
      "categoryId": 0,
      "imagePath": "string",
      "title": "string",
      "description": "string",
      "startDate": "2023-09-29T09:47:12.520Z",
      "finishDate": "2023-09-29T09:47:12.520Z",
      "isActive": true,
      "creatorId": 0,
      "limit": 0*/

      export class Event{
        id?:number;
        categoryId?:number;
        imagePath?:string;
        title?:string;
        description?:string;
        startDate?:Date;
        finishDate?:Date;
        isActive?:boolean;
        creatorId?:number;
        limit?:number;
        category?:Category;
        creator?:User;


