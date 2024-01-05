import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { IdUser } from 'src/decorator/user-id.decorator';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventDto } from './dto/get-event.dto';
import { DaysOfWeekEnum } from './enum/days-of-week.enum';

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
        @Query() getEventsDto: GetEventDto,
    ) {
        return this.eventsService.getEvents(getEventsDto);
    };

    @ApiTags('Events')
    @ApiOperation({ summary: 'Get one event by id' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiParam({ name: 'idEvent' })
    @Get('/:idEvent')
    async getOneEvent(
        @Param('idEvent') idEvent: string,
    ) {
        return this.eventsService.getOneEvent(idEvent);
    };

    @ApiTags('Events')
    @ApiOperation({ summary: 'Delete one event by day of week' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiQuery({ name: 'dayOfWeek', enum: DaysOfWeekEnum })
    @Delete('/delete-event')
    async deleteEventByDayOfWeek(
        @Query('dayOfWeek') dayOfWeek: string,
    ) {
        return this.eventsService.deleteEventByDayOfWeek(dayOfWeek);
    };
}
