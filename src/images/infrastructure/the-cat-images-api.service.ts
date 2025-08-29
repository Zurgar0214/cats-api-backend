import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TheCatImagesApiService {
  private readonly CAT_API_URL = 'https://api.thecatapi.com/v1';
  private readonly API_KEY = 'live_JBT0Ah0Nt12iyl2IpjQVLDWjcLk0GQwf4zI9wBMfmfejKmcC31mOJp4yJz5TsOUP';

  constructor(private httpService: HttpService) {}

  async findImagesByBreedId(breedId: string): Promise<any[]> {
    const headers = { 'x-api-key': this.API_KEY };
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.CAT_API_URL}/images/search?breed_id=${breedId}`, { headers }),
    );
    return data;
  }
}