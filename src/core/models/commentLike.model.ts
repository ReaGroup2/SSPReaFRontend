import { User } from "./user.model";
import { Comment } from "./comment.model";

/*
public int Id { get; set; }
        public int UserId { get; set; }
        public int CommentId { get; set; }
        public UserProfileDto User { get; set; }
        public CommentInfoDto Comment { get; set; }*/
        export class CommentLike{
            id?:number;
            userId?:number;
            commentId?:number;
            user?:User;
            comment?:Comment
        }