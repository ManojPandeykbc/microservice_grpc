import { Controller, Get, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

interface INumberArray {
  data: number[];
}

interface ISmOfNumberArray {
  sum: number;
}

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  constructor(private readonly appService: AppService) {}

  @GrpcMethod('AppController', 'Accumulate')
  accumulate(numberArray: INumberArray, metadata: any): ISmOfNumberArray {
    this.logger.log('Adding ' + numberArray.data.toString());
    return { sum: this.appService.accumulate(numberArray.data) };
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
