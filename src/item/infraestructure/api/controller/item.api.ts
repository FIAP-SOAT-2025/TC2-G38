import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ControllerItem } from '../../../controllers/item.controller';
import { UpdateItemDto } from 'src/item/infraestructure/api/dto/updateItem.dto';
import { CreateItemDto } from 'src/item/infraestructure/api/dto/createItem.dto';
import { PrismaItemRepository } from 'src/item/infraestructure/persistence/prismaItem.repository';
import { ExceptionMapper } from 'src/shared/exceptions/exception.mapper';
import { BaseException } from 'src/shared/exceptions/exceptions.base';

@ApiTags('Item')
@Controller('/item')
export class ItemControllerApi {
    constructor(
        private readonly prismaItemRepository: PrismaItemRepository
    ) { }

    @Post()
    async createItem(@Body() createItemDto: CreateItemDto) {
        try {
            return await ControllerItem.create(createItemDto, this.prismaItemRepository);
        } catch (error) {
            throw ExceptionMapper.mapToHttpException(error as BaseException);
        }
    }

    @Patch('/:id')
    async updateItem(
        @Body() updateItemDto: UpdateItemDto,
        @Param('id') id: string,
    ) {
        try {
            return await ControllerItem.update(id, updateItemDto, this.prismaItemRepository);
             
        } catch (error) {
           throw ExceptionMapper.mapToHttpException(error as BaseException);
        }
    }

    @Get('/category/:category')
    async findByCategory(@Param('category') category: string) {
        try {
            return await ControllerItem.findByCategory(category, this.prismaItemRepository);
            
        } catch (error) {
            throw ExceptionMapper.mapToHttpException(error as BaseException);
        }
    }

    @Get('/:id')
    async findById(@Param('id') id: string) {
        try {
            return await ControllerItem.findById(id, this.prismaItemRepository);
             
        } catch (error) {
            throw ExceptionMapper.mapToHttpException(error as BaseException);
        }
    }

    @Delete('/:id')
    async deleteItem(@Param('id') id: string) {
        try {
            return await ControllerItem.delete(id, this.prismaItemRepository);
             
        } catch (error) {
            throw ExceptionMapper.mapToHttpException(error as BaseException);
        }
    }
}
