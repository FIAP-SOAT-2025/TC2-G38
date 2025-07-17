import Item from "../entities/item.entity";
import ItemCategoryEnum from "../entities/itemCategory.enum";
import { ItemGatway } from "../gateways/item.gateway";
import { CreateItemInterface } from "../interfaces/createItemInterface";
import ItemGatewayInterface from "../interfaces/itemGatewayInterface";
import { UpdateItemInterface } from "../interfaces/updateItemInterface";
import CreateItemUseCase from "../usecases/createItem.useCase";
import { DeleteItemUseCase } from "../usecases/deleteItem.useCase";
import FindItemUseCase from "../usecases/findItem.useCase";
import UpdateItemUseCase from "../usecases/updateItem.useCase";


export class ControllerItem {
     constructor() { }

      private static createItemGateway(prismaItemRepository: ItemGatewayInterface) {
        return new ItemGatway(prismaItemRepository);
    }

     static async create(createdItem: CreateItemInterface , prismaItemRepository: ItemGatewayInterface): Promise<Item> {
               const itemGateway = this.createItemGateway(prismaItemRepository);
               return await CreateItemUseCase.create(createdItem, itemGateway);
          
     }

     static async update(id: string, updatedItem: UpdateItemInterface, prismaItemRepository: ItemGatewayInterface): Promise<Item> {
          const itemGateway = this.createItemGateway(prismaItemRepository);
          return  await UpdateItemUseCase.update(id, updatedItem, itemGateway);; 
     }

     static async findByCategory(categoryEnum: string, prismaItemRepository: ItemGatewayInterface): Promise<Item[] | null> {
          const itemGateway = this.createItemGateway(prismaItemRepository);
          return await FindItemUseCase.findByCategory(categoryEnum as ItemCategoryEnum, itemGateway);
     }

     static async findById(id: string, prismaItemRepository: ItemGatewayInterface): Promise<Item | null> {
          const itemGateway = this.createItemGateway(prismaItemRepository);
          return await FindItemUseCase.findById(id, itemGateway);
     }

     static async delete(id: string, prismaItemRepository: ItemGatewayInterface): Promise<Item> {
          const itemGateway = this.createItemGateway(prismaItemRepository);
           
           return await DeleteItemUseCase.delete(id, itemGateway);
     }
     


}