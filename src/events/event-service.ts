import mongoose from 'mongoose';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, { IEvent } from './models/Event';
import { Event } from './types/response';

// this event service instance shows how to create an event, get an event by id, and get all events with in-memory data
class EventService {
    eventsInDatabase: Event[] = [
        {
            id: 1,
            name: "Art Fair",
            description: "Explore the latest works from local and international artists",
            date: new Date(),
            city: "Almaty",
            duration: "10:00 AM - 6:00PM"
        },
        {
            id: 2,
            name: "Backend Lecture",
            description: "",
            date: new Date("2024-06-11"),
            city: "Almaty",
            duration: "9:15 AM - 11:15AM"
        },
        {
            id: 3,
            name: "Demo Day",
            description: "",
            date: new Date("2024-08-09"),
            city: "Astana",
            duration: "9:00 AM - 12:00 PM"
        }
    ];

    async getEventById(id: string): Promise<IEvent | null> {
        return await EventModel.findById(id).exec();
    }

    async getEvents(): Promise<IEvent[]> {
      return await EventModel.find().exec();
    }

    async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
        const { name, description, date, city, duration } = createEventDto;
        const newEvent = new EventModel({
            name,
            description,
            date: new Date(date),
            city,
            duration
        });
        return await newEvent.save();
    }

    // In-memory method for creating an event (for demonstration purposes)
    createEventInMemory(createEventDto: CreateEventDto): Event {
        const newEvent: Event = {
            id: this.eventsInDatabase.length + 1,
            name: createEventDto.name,
            description: createEventDto.description,
            date: new Date(createEventDto.date),
            city: createEventDto.city,
            duration: createEventDto.duration,
        };
        this.eventsInDatabase.push(newEvent);
        return newEvent;
    }
}

export default EventService;