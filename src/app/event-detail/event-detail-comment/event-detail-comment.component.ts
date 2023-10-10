import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { Event } from 'src/core/models/event.model';
import { Comment } from 'src/core/models/comment.model';

@Component({
  selector: 'app-event-detail-comment',
  templateUrl: './event-detail-comment.component.html',
  styleUrls: ['./event-detail-comment.component.css'],
})
export class EventDetailCommentComponent {
  comments: Comment[] = [];
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.apiService
      .getAllEntities(Comment)
      .subscribe((response) => (this.comments = response.data));
  }

  getCommentPastTime(comment: Comment) {
    return Date.now().valueOf() - comment.createdAt!.valueOf();
  }
}
