import { handleGetOneProductAction } from "@/action/productAction";
import ProductPage from "@/components/home/product/Product";

export default async function page({params}: {params: {product: string}}) {
  const procudt = await handleGetOneProductAction(params.product);
  return (
    <ProductPage data={procudt.data}/>
  )
}
