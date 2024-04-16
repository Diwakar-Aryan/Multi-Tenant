import { Injectable, NotFoundException } from '@nestjs/common';
import { IService } from 'src/app.interface';
import { ToDoModel } from '../models/Todo.models';
import { CreateTodoDto } from '../dtos/createToDoDTO';
import { UpdateTodoDto } from '../dtos/updateToDoDto';
import { randomUUID } from 'crypto';

@Injectable()
export class TodoService
  implements IService<ToDoModel, CreateTodoDto, UpdateTodoDto>
{
  private readonly todos: ToDoModel[] = [];

  create(data: CreateTodoDto, tenantId?: string): void {
    const uuid = randomUUID();
    const newTodo = new ToDoModel(uuid, data.title, data.done);
    if (tenantId) newTodo.setTenantId(tenantId);
    this.todos.push(newTodo);
  }

  delete(uuid: string, tenantId?: string) {
    const index = this.todos.findIndex((todo) => todo.uuid === uuid);
    if (index === -1) throw new NotFoundException('Todo not found');
    if (tenantId && this.todos[index].tenantId !== tenantId)
      throw new NotFoundException('Todo not found');
    this.todos.splice(index, 1);
  }

  get(uuid: string, tenantId?: string): ToDoModel {
    const todo = this.todos.find((todo) => todo.uuid === uuid);
    if (!todo) throw new NotFoundException('Todo not found');
    if (tenantId && todo.tenantId !== tenantId)
      throw new NotFoundException('Todo not found');
    return todo;
  }

  update(uuid: string, data: UpdateTodoDto, tenantId?: string): ToDoModel {
    const todo = this.todos.find((todo) => todo.uuid === uuid);
    if (!todo) throw new NotFoundException('Todo not found');
    if (tenantId && todo.tenantId !== tenantId)
      throw new NotFoundException('Todo not found');
    todo.title = data.title;
    todo.done = data.done;
    return todo;
  }

  getAll(tenantId?: string): ToDoModel[] {
    if (tenantId)
      return this.todos.filter((todo) => todo.tenantId === tenantId);
    return this.todos.filter((todo) => !todo.tenantId);
  }
}
