'use server';

import { handleGetAddressAction } from "@/action/addressAction";
import CartPage from "@/components/home/cart/cart";

export default async function page() {
  const tinhResponse = await handleGetAddressAction('tinh');
  const tinhs = tinhResponse.data;
  return (
    <CartPage tinhs={tinhs}/>
  )
}
