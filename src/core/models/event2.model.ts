import { Category } from './category.model';
import { User } from './user.model';

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

export class Event {
  id?: number=0;
  categoryId?: number=0;//
  imagePath?: string='';
  title?: string='';//
  description?: string='';//
  startDate?: string='';
  finishDate?: string='';
  isActive?: boolean=true;
  creatorId?: number=0;
  limit?: number=0;
  category?: Category;
  creator?: User;
}
