import { OrderStatus } from "./OrderStatus";

 

export interface IOrder
{
    id:string;
    userId:string;
    userFullName:string;
    orderNumber:string;
    orderLines:IOrderLine[];
    totalPrice:number;
    address:string;
    status:OrderStatus;


}

export interface IOrderLine
{
    ProductId:string;
    Quantity:number;
    Price:number;
    
}