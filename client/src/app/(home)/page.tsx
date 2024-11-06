import { handleGetAllProductsAction } from "@/action/productAction";
import { handleGetAllSubCategoriesAction } from "@/action/subCategoryAction";
import HomeContent from "@/components/home/home.content";

export default async function Home() {
  const listCategories = await handleGetAllSubCategoriesAction();
  return <HomeContent listCategories={listCategories.data}/>;
}
