import mongoose from 'mongoose';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, { IEvent } from './models/Event';
import { Event } from './types/response';



// this event service instance shows how to create a event, get a event by id, and get all events with in-memory data
class EventService {
<<<<<<< HEAD
    eventsInDatabase: Event[] = [
    {
        id: 1,
        name:"Art Fair",
        description: "Explore the latest works from local and international artists",
        date: new Date(),
        city:"Almaty",
        duration:"10:00 AM - 6:00PM"
    },
    {
        id: 2,
        name:"Backend Lecture",
        description: "",
        date: new Date("2024-06-11"),
        city:"Almaty",
        duration:"9:15 AM - 11:15AM"
    },
      {
        id: 3,
        name:"Demo Day",
        description:"",
        date: new Date("2024-08-09"),
        city:"Astana",
        duration:"9:00 AM - 12:00 PM"
      },
    ];
=======
>>>>>>> 1e59b70dca358b8f1b6f71b8311297e35198b8b7
  
    async getEventById(id: string): Promise<IEvent | null> {
      return await EventModel.findById(id).exec();
    }

    async getEvents(): Promise<IEvent[]> {
      return await EventModel.find().exec(); 
    }

    async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
      const { name, description, date, location ,duration} = createEventDto;
      const newEvent = new EventModel({
        name,
        description,
        date: new Date(date),
        location,
        duration
      });
  
<<<<<<< HEAD
    createEvent(userDto: CreateEventDto): Event {
        const newEvent: Event = {
            id: 4,
            name: userDto.name,
            description: userDto.description,
            date: new Date(userDto.date),
            city: userDto.city,
            duration: userDto.duration,
    };
        this.eventsInDatabase.push(newEvent);
        return newEvent;
=======
      await newEvent.save();
      return newEvent;
>>>>>>> 1e59b70dca358b8f1b6f71b8311297e35198b8b7
    }
  
    
  }
  
  export default EventService;
  