import { handleGetSubCategoriesAction } from "@/action/subCategoryAction"
import CategoryPage from "@/components/home/category/category"

export default async function page({params}: {params: {category: string}}) {
  if (params.category !== 'favicon.ico') {
    const {data} = await handleGetSubCategoriesAction(params.category)
    return (
      <CategoryPage data={data} />
    )
  }
}
