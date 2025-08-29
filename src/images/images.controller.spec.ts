import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from './images.controller';
import { ImagesService } from './application/images.service';

describe('ImagesController', () => {
  let controller: ImagesController;
  let service: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [
        {
          provide: ImagesService,
          useValue: {
            getImagesByBreedId: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getImagesByBreedId with the correct parameter', async () => {
    const breedId = 'beng';
    const mockImages = [
      { id: '1', url: 'test-url.jpg', width: 100, height: 100 },
    ];
    jest.spyOn(service, 'getImagesByBreedId').mockResolvedValue(mockImages);

    const result = await controller.getImagesByBreedId(breedId);

    expect(result).toEqual(mockImages);
    expect(service.getImagesByBreedId).toHaveBeenCalledWith(breedId);
  });
});
