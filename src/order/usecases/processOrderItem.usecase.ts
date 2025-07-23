import Item from 'src/item/entities/item.entity';
import { OrderDto } from '../infraestructure/api/dto/order.dto';
import ItemGatewayInterface from 'src/item/interfaces/itemGatewayInterface';
import ValidItemOrderUseCase from './validItemOrder.usecase';
import { OrderItemProps } from '../entities/orderItem.entity';

export default class ProccessOrderItemUseCase {
    constructor() { }
    static async proccessOrderItem(
        order: OrderDto,
        itemGateway: ItemGatewayInterface
    ) {

        const processedOrderItems: OrderItemProps[] = [];

        for (const orderItem of order.orderItems) {
            const { id, price } = await ValidItemOrderUseCase.validItemOrderUseCase(itemGateway, orderItem);

            processedOrderItems.push({
                itemId: id as string,
                quantity: orderItem.itemQuantity,
                price,
            });
        }

        return processedOrderItems;

    }
}
