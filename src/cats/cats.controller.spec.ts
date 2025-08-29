import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './application/cats.service';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            getBreeds: jest.fn(),
            getBreedById: jest.fn(),
            searchBreeds: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getBreeds and return an array of cats', async () => {
    const mockResult = [
      {
        id: 'abys',
        name: 'Abyssinian',
        temperament: 'Active, Agile',
        origin: 'Egypt',
        description: 'The Abyssinian is a beautiful breed...',
      },
    ];
    jest.spyOn(service, 'getBreeds').mockResolvedValue(mockResult);

    const result = await controller.getBreeds();

    expect(result).toEqual(mockResult);
    expect(service.getBreeds).toHaveBeenCalled();
  });

  it('should call getBreedById with the correct parameter', async () => {
    const breedId = 'abys';
    jest.spyOn(service, 'getBreedById').mockResolvedValue({
      id: 'abys',
      name: 'Abyssinian',
      temperament: 'Active, Agile',
      origin: 'Egypt',
      description: 'The Abyssinian is a beautiful breed...',
    });

    await controller.getBreedById(breedId);

    expect(service.getBreedById).toHaveBeenCalledWith(breedId);
  });

  it('should call searchBreeds with the correct query', async () => {
    const query = 'siam';
    jest
      .spyOn(service, 'searchBreeds')
      .mockResolvedValue([
        {
          id: 'siam',
          name: 'Siamese',
          temperament: 'Active',
          origin: 'Thailand',
          description: 'The Siamese is a beautiful breed...',
        },
      ]);

    await controller.searchBreeds(query);

    expect(service.searchBreeds).toHaveBeenCalledWith(query);
  });
});
