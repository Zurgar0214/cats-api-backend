import { Injectable, NotFoundException } from '@nestjs/common';
import { TheCatImagesApiService } from '../infrastructure/the-cat-images-api.service';
import { Image } from '../domain/image.entity';

@Injectable()
export class ImagesService {
  constructor(private readonly theCatImagesApiService: TheCatImagesApiService) {}

  async getImagesByBreedId(breedId: string): Promise<Image[]> {
    const images = await this.theCatImagesApiService.findImagesByBreedId(breedId);
    if (images.length === 0) {
      throw new NotFoundException(`No images found for breed ID "${breedId}".`);
    }
    return images.map(image => ({
      id: image.id,
      url: image.url,
      width: image.width,
      height: image.height,
    }));
  }
}