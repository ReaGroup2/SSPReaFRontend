import { Component } from '@angular/core';
import { Comment } from 'src/core/models/comment.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.css']
})
export class AllCommentsComponent {
 comments?:Comment[];

 constructor(private apiService:ApiService) { }
 ngOnInit(): void {
    this.LoadComments();
 }
  LoadComments(){
    this.apiService.getAllEntities(Comment).subscribe((res)=>{
      this.comments=res.data;
    });
  }
}
