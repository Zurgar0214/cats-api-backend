import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatsService } from './application/cats.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Cat } from './domain/cat.entity';

@ApiTags('Cats')
@Controller('breeds')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all cat breeds' })
  @ApiResponse({
    status: 200,
    description: 'List of cat breeds successfully retrieved.',
    type: [Cat],
  })
  async getBreeds(): Promise<Cat[]> {
    return this.catsService.getBreeds();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search for cat breeds' })
  @ApiQuery({
    name: 'q',
    required: true,
    description: 'The search query for cat breeds.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Cat breeds matching the search criteria successfully retrieved.',
    type: [Cat],
  })
  @ApiResponse({
    status: 404,
    description: 'No breeds found for the search query.',
  })
  async searchBreeds(@Query('q') query: string): Promise<Cat[]> {
    return this.catsService.searchBreeds(query);
  }

  @Get('get_by_id')
  @ApiOperation({ summary: 'Get a single cat breed by ID' })
  @ApiQuery({
    name: 'breed_id',
    required: true,
    description: 'The ID of the cat breed.',
  })
  @ApiResponse({
    status: 200,
    description: 'Cat breed found and returned.',
    type: Cat,
  })
  @ApiResponse({ status: 404, description: 'Cat breed not found.' })
  async getBreedById(@Query('breed_id') breedId: string): Promise<Cat> {
    return this.catsService.getBreedById(breedId);
  }
}
