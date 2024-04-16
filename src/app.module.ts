import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantController } from './tenant/controllers/tenant.controller';
import { TenantService } from './tenant/services/tenant.service';
import { TodoController } from './todo/controllers/todo.controller';
import { TodoService } from './todo/services/todo.service';
import { TenantMiddleware } from './tenant/middlewares/TenantMiddleware';

@Module({
  imports: [],
  controllers: [AppController, TenantController, TodoController],
  providers: [AppService, TenantService, TodoService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('/todos');
  }
}
