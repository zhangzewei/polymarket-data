import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
@Injectable()
export class ObtainDataService {
    constructor(private readonly configService: ConfigService) { }

    async getEventBySlug(slug: string) {
        try {
            const host = this.configService.get<string>('POLYMARKET_HOST');
            const url = `${host}/events`;
            const response = await axios.get(url, {
                params: { slug }
            });
            return response.data;
        } catch (error) {
            throw new HttpException(error.response.data, error.response.status);
        }
    }
}
