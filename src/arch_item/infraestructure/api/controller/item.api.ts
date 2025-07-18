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
import { DomainError } from '../../../entities/errors/domain.error';
import { ItemPresenter } from '../../../presenter.ts/item.presenter';
import { CategoryPresenter } from '../../../presenter.ts/category.presenter';
import { DeletePresenter } from '../../../presenter.ts/Delete.presenter';
import { UpdateItemDto } from 'src/arch_item/infraestructure/api/dto/updateItem.dto';
import { CreateItemDto } from 'src/arch_item/infraestructure/api/dto/createItem.dto';
import { PrismaItemRepository } from 'src/arch_item/infraestructure/persistence/prismaItem.repository';
import { ErrorPresenter } from 'src/arch_item/presenter.ts/error.presenter';

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
            if (error instanceof DomainError) {
            const errorResponse = ErrorPresenter.toResponse(error);
            throw new HttpException(
                errorResponse.message,
                errorResponse.status
            );
            }
            throw error;
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
            if (error instanceof DomainError) {
            const errorResponse = ErrorPresenter.toResponse(error);
            throw new HttpException(
                errorResponse.message,
                errorResponse.status
            );
            }
            throw error;
        }
    }

    @Get('/category/:category')
    async findByCategory(@Param('category') category: string) {
        try {
            return await ControllerItem.findByCategory(category, this.prismaItemRepository);
            
        } catch (error) {
            if (error instanceof DomainError) {
            const errorResponse = ErrorPresenter.toResponse(error);
            throw new HttpException(
                errorResponse.message,
                errorResponse.status
            );
            }
            throw error;
        }
    }

    @Get('/:id')
    async findById(@Param('id') id: string) {
        try {
            return await ControllerItem.findById(id, this.prismaItemRepository);
             
        } catch (error) {
            if (error instanceof DomainError) {
            const errorResponse = ErrorPresenter.toResponse(error);
            throw new HttpException(
                errorResponse.message,
                errorResponse.status
            );
            }
            throw error;
        }
    }

    @Delete('/:id')
    async deleteItem(@Param('id') id: string) {
        try {
            return await ControllerItem.delete(id, this.prismaItemRepository);
             
        } catch (error) {
            if (error instanceof DomainError) {
            const errorResponse = ErrorPresenter.toResponse(error);
            throw new HttpException(
                errorResponse.message,
                errorResponse.status
            );
            }
            throw error;
        }
    }
}
