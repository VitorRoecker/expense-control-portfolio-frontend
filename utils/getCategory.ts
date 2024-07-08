import { CategoryService } from "../services/category.service";

export const getCategoryItems = async (service: CategoryService, userId: string) => {
  const catItems = await service.GetAll(userId);
  return catItems;
};
