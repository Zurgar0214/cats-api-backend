import { Controller, Get, Param } from '@nestjs/common';
import { ImagesService } from './application/images.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Image } from './domain/image.entity';

@ApiTags('Images')
@Controller('imagesbybreedid')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':breed_id')
  @ApiOperation({ summary: 'Get images for a specific cat breed' })
  @ApiParam({
    name: 'breed_id',
    required: true,
    description: 'The ID of the cat breed to retrieve images for.',
  })
  @ApiResponse({
    status: 200,
    description: 'Images for the specified breed successfully retrieved.',
    type: [Image],
  })
  @ApiResponse({ status: 404, description: 'No images found for the specified breed.' })
  async getImagesByBreedId(@Param('breed_id') breedId: string): Promise<Image[]> {
    return this.imagesService.getImagesByBreedId(breedId);
  }
}