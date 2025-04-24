import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { EventData } from './services/event.service';

@Injectable()
export class ObtainDataService {
    constructor(private readonly configService: ConfigService) { }

    async getEventBySlug(slug: string): Promise<EventData | null> {
        try {
            const host = this.configService.get<string>('POLYMARKET_HOST');
            const url = `${host}/events`;
            const response = await axios.get(url, {
                params: { slug }
            });
            if (response.data.length === 0) {
                return null;
            }
            return response.data[0];
        } catch (error) {
            throw new HttpException(error.response.data, error.response.status);
        }
    }
}
