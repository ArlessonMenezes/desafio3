import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId, Repository, FindOptions } from 'typeorm';
import { Event } from './model/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UserService } from 'src/user/user.service';
import { GetEventDto } from './dto/get-event.dto';
import { DaysOfWeekEnum } from './enum/days-of-week.enum';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
        private readonly userService: UserService,
    ) {}

    async createEvent(createEventDto: CreateEventDto, email: string) {
        const findUser = await this.userService.findUserByEmail(
            email,
        );    

        const event = this.eventRepository.create(createEventDto);

        await this.eventRepository.save(event)

        const returnEvent = {
            idEvent: event.idEvent,
            description: event.description,
            dayOfweek: event.dayOfWeek,
            idUser: findUser.idUser
        };

        return returnEvent;
    };

    async getEvents(getEventsDto: GetEventDto, email: string) {
        const findUser = await this.userService.findUserByEmail(
            email,
        );

        let eventsByDayOfWeek = [];
        let eventsByDescription = [];

        if (getEventsDto.daysOfWeek) {
            const events = await this.eventRepository.find({
                where: { dayOfWeek: getEventsDto.daysOfWeek }
            })

            if (events.length > 0) {
                for (let event of events) {
                    if (!event) {
                        throw new NotFoundException('event not found.');
                    };
                    
                    eventsByDayOfWeek.push(event);
                };
            } else {
                throw new NotFoundException('List of events its empty');
            };

            const eventObj = {
                ...eventsByDayOfWeek,
                iduser: findUser.idUser
            };

            return eventObj;
        };
        
        if (getEventsDto.description) {
            const events = await this.eventRepository.find({
                where: { description: getEventsDto.description }
            })
            if (events.length > 0) {
                for (let event of events) {
                    if (!event) {
                        throw new NotFoundException('event not found.');
                    };
                    
                    eventsByDescription.push(event);
                };
            } else {
                throw new NotFoundException('List of events its empty');
            };

            const eventObj = {
                ...eventsByDescription,
                iduser: findUser.idUser
            };

            return eventObj;
        };
    };
}
