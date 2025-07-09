import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { CreateItemDto } from '../../../../domain/dto/createItem.dto';
import Item from '../../../../domain/model/item.entity';
import CreateItemService from '../../../../application/services/createItem.service';
import UpdateItemService from '../../../../application/services/updateItem.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateItemDto } from '../../../../domain/dto/updateItem.dto';
import FindItemService from '../../../../application/services/findItem.service';
import ItemCategoryEnum from '../../../../../item/domain/model/itemCategory.enum';
import DeleteItemService from '../../../../../item/application/services/deleteItem.service';
@ApiTags('Item')
@Controller('/item')
export class ItemController {
  constructor(
    private readonly createItemService: CreateItemService,
    private readonly updateItemService: UpdateItemService,
    private readonly findItemService: FindItemService,
    private readonly deleteItemService: DeleteItemService,
  ) {}

  @Post()
  async createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.createItemService.create(createItemDto);
  }

  @Patch('/:id')
  async updateItem(
    @Body() updateItemDto: UpdateItemDto,
    @Param('id') id: string,
  ): Promise<Item | null> {
    return await this.updateItemService.update(id, updateItemDto);
  }

  @Get('/category/:categoryEnum')
  async findByCategory(
    @Param('categoryEnum') categoryEnum: string,
  ): Promise<Item[] | null> {
    const upperCategory = categoryEnum.toUpperCase();

    return await this.findItemService.findByCategory(
      upperCategory as ItemCategoryEnum,
    );
  }

  @Get('/:id')
  async findById(
    @Param('id') id: string,
  ): Promise<Item | null> {
    return await this.findItemService.findById(id);
  }

  @Delete('/:id')
  async deleteItem(
    @Param('id') id: string
  ): Promise<any> {
    return await this.deleteItemService.delete(id);
  }
}
