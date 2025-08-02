import ItemCategoryEnum from "../entities/itemCategory.enum";
import { ItemGateway } from "../gateways/item.gateway";
import { CreateItemInterface } from "../interfaces/createItemInterface";
import { UpdateItemInterface } from "../interfaces/updateItemInterface";
import { ItemPresenter } from "../presenter/item.presenter";
import CreateItemUseCase from "../useCases/createItem.useCase";
import { DeleteItemUseCase } from "../useCases/deleteItem.useCase";
import FindItemUseCase from "../useCases/findItem.useCase";
import FindItemCategory from "../useCases/findItemCategory.useCase";
import UpdateItemUseCase from "../useCases/updateItem.useCase";
import { DeletePresenter } from "../presenter/Delete.presenter";
import { CategoryPresenter } from "../presenter/category.presenter";
import { ItemProps } from "../entities/item.entity";
import ItemRepositoryInterface from "../interfaces/ItemRepositoryInterface";


export class ControllerItem {
     constructor() { }

      private static createItemGateway(prismaItemRepository: ItemRepositoryInterface) {
        return new ItemGateway(prismaItemRepository);
    }

     static async create(createdItem: CreateItemInterface , prismaItemRepository: ItemRepositoryInterface): Promise<ItemProps> {
               const itemGateway = this.createItemGateway(prismaItemRepository);
               
                    const item = await CreateItemUseCase.create(createdItem, itemGateway);
                    return ItemPresenter.toResponse(item);            
          
     }

     static async update(id: string, updatedItem: UpdateItemInterface, prismaItemRepository: ItemRepositoryInterface): Promise<ItemProps> {
          const itemGateway = this.createItemGateway(prismaItemRepository);
           const updateItem = await UpdateItemUseCase.update(id, updatedItem, itemGateway);
            return ItemPresenter.toResponse(updateItem); 
     }

     static async findByCategory(categoryEnum: string, prismaItemRepository: ItemRepositoryInterface): Promise<ItemProps[]> {
          const itemGateway = this.createItemGateway(prismaItemRepository);
          const items = await FindItemCategory.findByCategory(categoryEnum as ItemCategoryEnum, itemGateway);
         return CategoryPresenter.toResponse(items || [])
     }

     static async findById(id: string, prismaItemRepository: ItemRepositoryInterface): Promise<ItemProps> {
          const itemGateway = this.createItemGateway(prismaItemRepository);
         const item =  await FindItemUseCase.findById(id, itemGateway);
           return ItemPresenter.toResponse(item!);
     }

     static async delete(id: string, prismaItemRepository: ItemRepositoryInterface): Promise<{ message: string }> {
          const itemGateway = this.createItemGateway(prismaItemRepository);
           
          const deleteItem =   await DeleteItemUseCase.delete(id, itemGateway);
           return DeletePresenter.toResponse(deleteItem.id);
     }
     


}