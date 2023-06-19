import { ICategory } from 'src/models/CategoryModel';

export interface CategoryData {
  _id: string;
  name: string;
}

export interface GetAllCategoriesResponse<T> {
  message: string;
  categoryData: T[];
}

export interface CategoryIdInterface {
  id: string;
}

export interface DeleteCategoryResponse<T> {
  message: string;
  deletedCategory: T;
}

export interface AddCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  id: string;
  name: string;
}
export interface AddCategoryResponse<T> {
  message: string;
  newCategory: T;
}
export const decodeCategoriesResponse = (
  response: GetAllCategoriesResponse<CategoryData>
): ICategory[] => {
  const data: CategoryData[] = response.categoryData;

  const categories: ICategory[] = data.map((category) => ({
    id: category._id,
    name: category.name
  }));

  return categories;
};
