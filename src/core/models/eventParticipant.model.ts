import { User } from "./user.model";
import { Event } from "./event.model";

export class EventParticipant {
  id?: number;
  userId?: number;
  eventId?: number;
  user?:User;
  event?:Event;
  
}
