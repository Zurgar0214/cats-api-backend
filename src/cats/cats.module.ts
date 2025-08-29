import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CatsController } from './cats.controller';
import { CatsService } from './application/cats.service';
import { TheCatApiService } from './infrastructure/the-cat-api.service';

@Module({
  imports: [HttpModule],
  controllers: [CatsController],
  providers: [CatsService, TheCatApiService],
  exports: [CatsService, TheCatApiService],
})
export class CatsModule {}