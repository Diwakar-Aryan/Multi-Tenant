import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { CreateTodoDto } from '../dtos/createToDoDTO';
import { UpdateTodoDto } from '../dtos/updateToDoDto';

@Controller()
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/todos')
  getTodos(@Req() req: Request) {
    return this.todoService.getAll(req['tenantId']);
  }

  @Post('/todos')
  createTodo(@Req() req: Request, @Body() data: CreateTodoDto) {
    this.todoService.create(data, req['tenantId']);
    return HttpStatus.CREATED;
  }

  @Get('/todos/:uuid')
  getTodo(@Req() req: Request, @Param('uuid') uuid: string) {
    return this.todoService.get(uuid, req['tenantId']);
  }

  @Put('/todos/:uuid')
  updateTodo(
    @Req() req: Request,
    @Param('uuid') uuid: string,
    @Body() data: UpdateTodoDto,
  ) {
    this.todoService.update(uuid, data, req['tenantId']);
    return HttpStatus.NO_CONTENT;
  }

  @Delete('/todos/:uuid')
  deleteTodo(@Req() req: Request, @Param('uuid') uuid: string) {
    this.todoService.delete(uuid, req['tenantId']);
    return HttpStatus.ACCEPTED;
  }
}
