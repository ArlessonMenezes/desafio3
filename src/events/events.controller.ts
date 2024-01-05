import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IdUser } from 'src/decorator/user-id.decorator';
import { CreateEventDto } from './dto/create-event.dto';
import { ObjectId } from 'typeorm';
import { GetEventDto } from './dto/get-event.dto';

@Controller('events')
export class EventsController {
    constructor(
        private readonly eventsService: EventsService,
    ){}

    @ApiTags('Events')
    @ApiOperation({ summary: 'Create a event' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createEvent(
        @IdUser() email: string,
        @Body() createEventDto: CreateEventDto,
    ) {
        return this.eventsService.createEvent(createEventDto, email);
    };

    
    @ApiTags('Events')
    @ApiOperation({ summary: 'Get events by day of week' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getEvents(
        @IdUser() email: string,
        @Query() getEventsDto: GetEventDto,
    ) {
        return this.eventsService.getEvents(getEventsDto, email);
    };
}
