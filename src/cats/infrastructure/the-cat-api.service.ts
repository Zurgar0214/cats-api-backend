import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TheCatApiService {
  private readonly CAT_API_URL = 'https://api.thecatapi.com/v1';
  private readonly API_KEY: string;

  constructor(private httpService: HttpService, private configService: ConfigService) {
    this.API_KEY = this.configService.get<string>('THE_CAT_API_KEY') ?? '';
  }

  async findAllBreeds(): Promise<any[]> {
    const headers = { 'x-api-key': this.API_KEY };
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.CAT_API_URL}/breeds`, { headers }),
    );
    return data;
  }

  async findBreedById(breedId: string): Promise<any> {
    const headers = { 'x-api-key': this.API_KEY };
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.CAT_API_URL}/breeds/${breedId}`, {
        headers,
      }),
    );
    return data;
  }

  async searchBreeds(query: string): Promise<any[]> {
    console.log('Llega');    
    const headers = { 'x-api-key': this.API_KEY };
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.CAT_API_URL}/breeds/search?q=${query}`, {
        headers,
      }),
    );
    return data;
  }
}
