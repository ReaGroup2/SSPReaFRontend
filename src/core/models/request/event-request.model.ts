export class EventRequest{

  categoryId?: number=0;//
  imagePath?: string='';
  title?: string='';//
  description?: string='';//
  startDate?: Date;
  finishDate?: Date;
  /*isActive?: boolean=true;*/
  creatorId?: number=0;
  limit?: number=0;  
}

/*
"categoryId": 5,
  "imagePath": "string",
  "title": "string",
  "description": "string",
  "startDate": "2023-10-09T13:31:44.140Z",
  "finishDate": "2023-10-09T13:31:44.140Z",
  "creatorId": 18,
  "limit": 10*/