import { handleGetOneProductAction } from "@/action/productAction";
import ProductPage from "@/components/home/product/Product";
import { notFound } from "next/navigation";

export default async function page({params}: {params: {product: string}}) {
  const procudt = await handleGetOneProductAction(params.product);
  if (!procudt.data) {
   notFound();
  }
  return (
    <ProductPage data={procudt.data} _id={params.product}/>
  )
}
