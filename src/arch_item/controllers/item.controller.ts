import { BaseException } from "src/shared/exception/exceptions.base";
import Item from "../entities/item.entity";
import ItemCategoryEnum from "../entities/itemCategory.enum";
import { ItemGatway } from "../gateways/item.gateway";
import { ItemResponse } from "../infraestructure/api/dto/itemResponse.dto";
import { CreateItemInterface } from "../interfaces/createItemInterface";
import ItemGatewayInterface from "../interfaces/itemGatewayInterface";
import { UpdateItemInterface } from "../interfaces/updateItemInterface";
import { ItemPresenter } from "../presenter.ts/item.presenter";
import CreateItemUseCase from "../useCases/createItem.useCase";
import { DeleteItemUseCase } from "../useCases/deleteItem.useCase";
import FindItemUseCase from "../useCases/findItem.useCase";
import FindItemCategory from "../useCases/findItemCategory.useCase";
import UpdateItemUseCase from "../useCases/updateItem.useCase";
import { DeletePresenter } from "../presenter.ts/Delete.presenter";
import { CategoryPresenter } from "../presenter.ts/category.presenter";


export class ControllerItem {
     constructor() { }

      private static createItemGateway(prismaItemRepository: ItemGatewayInterface) {
        return new ItemGatway(prismaItemRepository);
    }

     static async create(createdItem: CreateItemInterface , prismaItemRepository: ItemGatewayInterface): Promise<ItemResponse> {
               const itemGateway = this.createItemGateway(prismaItemRepository);
               
                    const item = await CreateItemUseCase.create(createdItem, itemGateway);
                    return ItemPresenter.toResponse(item);            
          
     }

     static async update(id: string, updatedItem: UpdateItemInterface, prismaItemRepository: ItemGatewayInterface): Promise<ItemResponse> {
          const itemGateway = this.createItemGateway(prismaItemRepository);
           const updateItem = await UpdateItemUseCase.update(id, updatedItem, itemGateway);
            return ItemPresenter.toResponse(updateItem); 
     }

     static async findByCategory(categoryEnum: string, prismaItemRepository: ItemGatewayInterface): Promise<ItemResponse[]> {
          const itemGateway = this.createItemGateway(prismaItemRepository);
          const items = await FindItemCategory.findByCategory(categoryEnum as ItemCategoryEnum, itemGateway);
         return CategoryPresenter.toResponse(items || [])
     }

     static async findById(id: string, prismaItemRepository: ItemGatewayInterface): Promise<ItemResponse> {
          const itemGateway = this.createItemGateway(prismaItemRepository);
         const item =  await FindItemUseCase.findById(id, itemGateway);
           return ItemPresenter.toResponse(item!);
     }

     static async delete(id: string, prismaItemRepository: ItemGatewayInterface): Promise<{ message: string }> {
          const itemGateway = this.createItemGateway(prismaItemRepository);
           
          const deleteItem =   await DeleteItemUseCase.delete(id, itemGateway);
           return DeletePresenter.toResponse(deleteItem.id);
     }
     


}