import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { User } from 'src/core/models/user.model';
import { CommentRequest } from 'src/core/models/request/comment-request.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { Comment } from 'src/core/models/response/comment-request.model';
import { CommentLikeRequest } from 'src/core/models/request/commentLike-request.model';
import { CommentLike } from 'src/core/models/commentLike.model';
import { EventParticipant } from 'src/core/models/eventParticipant.model';

@Component({
  selector: 'app-event-detail-comment',
  templateUrl: './event-detail-comment.component.html',
  styleUrls: ['./event-detail-comment.component.css'],
})
export class EventDetailCommentComponent {
  @Input() eventId?: number;
  comments: Comment[] = [];
  currentUser!: User;
  commentRequest!: CommentRequest;
  commentText: string = '';
  // likeCount: number = 0;
  commentLike!: CommentLikeRequest;
  allCommentLikes: CommentLike[] = [];
  countLike: number = 0;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.commentRequest = new CommentRequest();
    this.commentLike = new CommentLikeRequest();
  }

  ngOnInit(): void {
    this.getComments();
    this.getProfileInfo();
    // this.handleLikeButtonClick();
    this.getAllCommentLike();
  }

  getProfileInfo() {
    this.apiService.getProfileInfo().subscribe((user) => {
      this.currentUser = user.data;
      if (this.currentUser.imagePath == null) {
        this.currentUser.imagePath =
          'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg';
      }
    });
  }

  async createComment() {
    console.log(this.commentText);
    console.log(this.eventId);
    this.commentRequest.eventId = this.eventId;
    this.commentRequest.userId = this.currentUser.id;

    // Kullanıcının girdiği metni commentRequest içine atayın
    this.commentRequest.description = this.commentText;

    let status = await this.apiService.createEntity<CommentRequest>(
      this.commentRequest!,
      'Comment'
    );
    if (status?.status == ResponseStatus.Ok) {
      alert('Ekleme Başarılı');
      this.getComments();
      this.commentText = '';
    } else {
      alert('Ekleme Başarısız');
    }
  }

  getComments() {
    this.apiService
      .getAllEntities(Comment)
      .subscribe(
        (response) =>
          (this.comments = response.data.filter(
            (f) => f.eventId == this.eventId
          ))
      );
  }

  createLike(comment: Comment) {
    const index = this.allCommentLikes.findIndex(
      (a: CommentLike) =>
        a.userId === comment.userId && a.commentId === comment.id
    );
    if (index > -1) {
      window.alert('Bu yorum beğenilmiş.');
    } else {
      this.commentLike.commentId = comment.id;
      this.commentLike.userId = this.currentUser.id;
      console.log(this.commentLike);
      let status = this.apiService.createEntity(
        this.commentLike,
        'CommentLike'
      );
      status.then((response) => {
        if (response?.status == ResponseStatus.Ok) {
          window.alert('like eklendi');
          this.getAllCommentLike();
        } else {
          window.alert('likelanırken bir hata oluştu');
        }
      });
      console.log(this.commentLike);
    }
  }

  getAllCommentLike() {
    this.apiService.getAllEntities(CommentLike).subscribe((response) => {
      this.allCommentLikes = response.data;
    });
  }
  likeCount(comment: Comment): number {
    let x: number;
    x = this.countLike = this.allCommentLikes.filter(
      (a: CommentLike) => a.commentId === comment.id
    ).length;
    return x;
  }

  
  // handleLikeButtonClick() {
  //   // let likeCount: number = 0;
  //   // const button = document.querySelector<HTMLElement>('.like-button');
  //   const button: HTMLElement | null =
  //     document.querySelector<HTMLElement>('.like-button');

  //   if (button) {
  //     button.classList.toggle('active');
  //     button.classList.add('animated');
  //     generateClones(button);

  //     // Beğeni sayısını artırın
  //     this.likeCount++;

  //     // Beğeni sayısını görüntüleyin
  //     const likeCountElement: HTMLElement | null =
  //       document.querySelector<HTMLElement>('.like-count');
  //     if (likeCountElement) {
  //       likeCountElement.textContent = `Beğeni Sayısı: ${this.likeCount}`;
  //     }

  //     button?.classList.toggle('active');
  //     button?.classList.add('animated');
  //     generateClones(button!);

  //     function generateClones(button: HTMLElement) {
  //       const clones = randomInt(2, 4);
  //       for (let it = 1; it <= clones; it++) {
  //         const clone = button
  //           .querySelector<SVGElement>('svg')!
  //           .cloneNode(true) as SVGElement;
  //         const size = randomInt(5, 16);
  //         button.appendChild(clone);
  //         clone.setAttribute('width', size.toString());
  //         clone.setAttribute('height', size.toString());
  //         clone.style.position = 'absolute';
  //         clone.style.transition =
  //           'transform 0.5s cubic-bezier(0.12, 0.74, 0.58, 0.99) 0.3s, opacity 1s ease-out 0.5s';

  //         const animTimeout = setTimeout(function () {
  //           clearTimeout(animTimeout);
  //           clone.style.transform = `translate3d(${
  //             plusOrMinus() * randomInt(10, 25)
  //           }px, ${plusOrMinus() * randomInt(10, 25)}px, 0)`;
  //           clone.style.opacity = '0';
  //         }, 1);

  //         const removeNodeTimeout = setTimeout(function () {
  //           clone.parentNode?.removeChild(clone);
  //           clearTimeout(removeNodeTimeout);
  //         }, 900);

  //         const removeClassTimeout = setTimeout(function () {
  //           button.classList.remove('animated');
  //         }, 600);
  //       }
  //     }

  //     function plusOrMinus() {
  //       return Math.random() < 0.5 ? -1 : 1;
  //     }

  //     function randomInt(min: number, max: number) {
  //       return Math.floor(Math.random() * (max - min + 1) + min);
  //     }
  //   }
  //   console.log(this.likeCount.toString());
  //   console.log('handleLikeButtonClick çalıştı');
  // }
}
