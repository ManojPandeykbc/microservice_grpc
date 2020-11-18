import { IGrpcService } from './grpc.interface';
import { microserviceOptions } from './grpc.options';
import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: IGrpcService;

  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('AppController');
  }

  @Post('add')
  async accumulate(@Body('data') data: number[]) {
    console.log('Adding ' + data);
    return this.grpcService.accumulate({ data });
  }
}
