import mongoose, { Document, Schema } from 'mongoose';

interface IEvent extends Document {
  title: string;
  date: Date;
  city: string;
}

const eventSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  city: { type: String, required: true }
});

const Event = mongoose.model<IEvent>('Event', eventSchema);
export default Event;
export { IEvent };