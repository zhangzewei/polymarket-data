import { Controller, Get, Query } from '@nestjs/common';
import { ObtainDataService } from './obtain-data.service';

@Controller('polymarket')
export class ObtainDataController {
    constructor(private readonly obtainDataService: ObtainDataService) { }

    @Get('events')
    async getData(@Query('slug') slug: string) {
        return this.obtainDataService.getEventBySlug(slug);
    }
}
