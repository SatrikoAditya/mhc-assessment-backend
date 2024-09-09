import { Document, Types } from "mongoose";

export interface IEvent {
  name: string;
}

export interface IEventDoc extends IEvent, Document {}

export interface IEventWithId extends IEvent {
  _id: Types.ObjectId;
}
