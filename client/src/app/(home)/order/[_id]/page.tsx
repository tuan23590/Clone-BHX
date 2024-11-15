"use server"
import { handleGetOrderByIdAction } from '@/action/ordersActions'
import React from 'react'
import OrderDetail from "@/components/home/order/orderDetail";


export default async function page({params}: {params: {_id: string}}) {
    const order = await handleGetOrderByIdAction({orderId: params._id})
  return (
    <OrderDetail order={order.data} />
  )
}
