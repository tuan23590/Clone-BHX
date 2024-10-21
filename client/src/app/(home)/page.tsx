import { handleGetAllCategoriesAction } from "@/action/categoryAction";
import HomeContent from "@/components/home/home.content";

export default async function Home() {
  const listCategories = await handleGetAllCategoriesAction();
  return (
    <HomeContent listCategories={listCategories.data.results} />
  );
}
