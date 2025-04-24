import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
    @ApiProperty({ description: 'Success message' })
    message: string;
} 