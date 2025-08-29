import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { TheCatApiService } from '../infrastructure/the-cat-api.service';

describe('CatsService', () => {
  let service: CatsService;
  let theCatApiService: TheCatApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: TheCatApiService,
          useValue: {
            findAllBreeds: jest.fn(),
            findBreedById: jest.fn(),
            searchBreeds: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    theCatApiService = module.get<TheCatApiService>(TheCatApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of cat breeds', async () => {
    const mockBreeds = [
      {
        id: 'abys',
        name: 'Abyssinian',
        temperament: 'Active',
        origin: 'Egypt',
        description: 'desc',
      },
    ];
    jest.spyOn(theCatApiService, 'findAllBreeds').mockResolvedValue(mockBreeds);

    const result = await service.getBreeds();

    expect(result).toEqual(mockBreeds);
    expect(theCatApiService.findAllBreeds).toHaveBeenCalled();
  });

  it('should return a single cat breed by ID', async () => {
    const mockBreed = {
      id: 'abys',
      name: 'Abyssinian',
      temperament: 'Active',
      origin: 'Egypt',
      description: 'desc',
    };
    jest.spyOn(theCatApiService, 'findBreedById').mockResolvedValue(mockBreed);

    const result = await service.getBreedById('abys');

    expect(result).toEqual(mockBreed);
    expect(theCatApiService.findBreedById).toHaveBeenCalledWith('abys');
  });

  it('should throw NotFoundException if breed not found', async () => {
    jest.spyOn(theCatApiService, 'findBreedById').mockResolvedValue(null);

    await expect(service.getBreedById('non-existent-id')).rejects.toThrow(
      'Cat breed with ID "non-existent-id" not found.',
    );
    expect(theCatApiService.findBreedById).toHaveBeenCalledWith(
      'non-existent-id',
    );
  });
});
