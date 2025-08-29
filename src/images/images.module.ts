import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { HttpModule } from '@nestjs/axios';
import { ImagesService } from './application/images.service';
import { TheCatImagesApiService } from './infrastructure/the-cat-images-api.service';

@Module({
  imports: [HttpModule],
  controllers: [ImagesController],
  providers: [ImagesService, TheCatImagesApiService],
})
export class ImagesModule {}
