import { Category } from './category.model';
import { User } from './user.model';



   export class Event{
        id?:number;
        categoryId?:number;
        imagePath?:string;
        title?:string;
        description?:string;
        startDate?:string;
        finishDate?:string;
        isActive?:boolean;
        creatorId?:number;
        limit?:number;
        category?:Category;
        creator?:User;
      
      }



