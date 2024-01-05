import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { DaysOfWeekEnum } from "src/events/enum/days-of-week.enum";

export class GetEventDto {
    @ApiProperty({
        isArray: false,
        enum: DaysOfWeekEnum,
        required: false,
    })
    @IsString()
    @IsOptional()
    daysOfWeek?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    description?: string;
};