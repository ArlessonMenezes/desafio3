import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {  Repository, FindOptions } from 'typeorm';
import { Event } from './model/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UserService } from 'src/user/user.service';
import { GetEventDto } from './dto/get-event.dto';
import { DaysOfWeekEnum } from './enum/days-of-week.enum';
import { identity } from 'rxjs';
import { ObjectId } from 'mongodb';

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

        const event = this.eventRepository.create({
            ...createEventDto,
            idUser: findUser.idUser,
        });

       return this.eventRepository.save(event)
    };

    async getEvents(getEventsDto: GetEventDto) {
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
                eventsByDayOfWeek,
            };

            return { ...eventObj };
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
                eventsByDescription,
            };

            return { ...eventObj };
        };
    };

    async getOneEvent(idEvent: string) {
        const objectId = new ObjectId(idEvent);

        const event = await this.eventRepository.findOne({
            where: { idEvent: objectId },
        });

        if (!event) {
            throw new NotFoundException('event not found.');
        };

        return event;
    };

    async deleteEventByDayOfWeek(dayOfWeek: string) {
        const event = await this.eventRepository.findOne({
            where: { dayOfWeek }, 
        });

        if (!event) {
            throw new NotFoundException('event not found.');
        };

        await this.eventRepository.delete(event)
    }
}
