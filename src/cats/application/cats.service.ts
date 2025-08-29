import { Injectable, NotFoundException } from '@nestjs/common';
import { TheCatApiService } from '../infrastructure/the-cat-api.service';
import { Cat } from '../domain/cat.entity';

@Injectable()
export class CatsService {
  constructor(private readonly theCatApiService: TheCatApiService) {}

  async getBreeds(): Promise<Cat[]> {
    const breeds = await this.theCatApiService.findAllBreeds();
    return breeds.map((breed) => ({
      id: breed.id,
      name: breed.name,
      temperament: breed.temperament,
      origin: breed.origin,
      description: breed.description,
    }));
  }

  async getBreedById(breedId: string): Promise<Cat> {
    const breed = await this.theCatApiService.findBreedById(breedId);
    if (!breed) {
      throw new NotFoundException(`Cat breed with ID "${breedId}" not found.`);
    }
    return {
      id: breed.id,
      name: breed.name,
      temperament: breed.temperament,
      origin: breed.origin,
      description: breed.description,
    };
  }

  async searchBreeds(query: string): Promise<Cat[]> {
    const breeds = await this.theCatApiService.searchBreeds(query);
    if (breeds.length === 0) {
      throw new NotFoundException(`No cat breeds found for query "${query}".`);
    }  
    return breeds.map(
      (breed) => ({
        id: breed.id,
        name: breed.name,
        temperament: breed.temperament,
        origin: breed.origin,
        description: breed.description,
      })
    );
  }
}
