import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Market } from './entities/market.entity';
import { MarketPriceHistory } from './entities/market-price-history.entity';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';
import { ObtainDataService } from './obtain-data.service';
import { ObtainDataController } from './obtain-data.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Event, Market, MarketPriceHistory]),
    ],
    controllers: [EventController, ObtainDataController],
    providers: [EventService, ObtainDataService],
    exports: [EventService, ObtainDataService],
})
export class ObtainDataModule { } 