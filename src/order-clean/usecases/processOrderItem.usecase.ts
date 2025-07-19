import Item from 'src/arch_item/entities/item.entity';
import { OrderDto } from '../infraestructure/api/dto/order.dto';
import ItemGatewayInterface from 'src/arch_item/interfaces/itemGatewayInterface';
import { OrderItemProps } from 'src/order/domain/model/orderItem.entity';
import ValidItemOrderUseCase from './validItemOrder.usecase';

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
