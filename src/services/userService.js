import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const getCustomer = (inputId) => {
  return axios.get(`/api/get-customer?id=${inputId}`);
};
//add user in admin
const createNewUserAdmin = (data) => {
  return axios.post("/api/create-new-user", data);
};

const DeleteUserAdmin = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};
const EditUserAdmin = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
const getAllCodeServices = (inputData) => {
  return axios.get(`/api/allcode?type=${inputData}`);
};
const getAllUser = (inputData) => {
  return axios.get(`/api/allcode?type=${inputData}`);
};

//? soft delete category
const restoreCategory = (inputId) => {
  return axios.patch(`/api/restore-category?id=${inputId}`);
};
const deleteCategorySoft = (inputId) => {
  return axios.delete(`/api/delete-category-soft?id=${inputId}`);
};
const getAllCategoryDelete = () => {
  return axios.get(`/api/get-all-category-delete`);
};
//? save brand
const restoreBrand = (inputId) => {
  return axios.patch(`/api/restore-brand?id=${inputId}`);
};
const deleteBrandSoft = (inputId) => {
  return axios.delete(`/api/delete-brand-soft?id=${inputId}`);
};
const getAllBrandDelete = () => {
  return axios.get(`/api/get-all-brand-delete`);
};
const saveBrand = (data) => {
  return axios.post(`/api/save-brand`, data);
};
const saveTrademark = (data) => {
  return axios.post(`/api/save-trademark`, data);
};

const deleteBrand = (inputId) => {
  return axios.delete(`/api/delete-brand?id=${inputId}`);
};
const deleteTrademark = (inputId) => {
  return axios.delete(`/api/delete-Trademark?id=${inputId}`);
};
const getAllTrademark = (inputData) => {
  return axios.get(`/api/get-all-Trademark?type=${inputData}`);
};
const getAllBrand = (inputData) => {
  return axios.get(`/api/get-all-brand?type=${inputData}`);
};
//? product

const saveAllOrder = (data) => {
  return axios.post(`/api/save-all-order`, data);
};
const restoreProduct = (inputId) => {
  return axios.patch(`/api/restore-product?id=${inputId}`);
};
const deleteProductSoft = (inputId) => {
  return axios.delete(`/api/delete-product-soft?id=${inputId}`);
};
const getAllProductDelete = () => {
  return axios.get(`/api/get-all-product-delete`);
};
const getAllProduct = () => {
  return axios.get(`/api/get-all-product`);
};
const getAllProductNyId = (inputId) => {
  return axios.get(`/api/get-all-product-by-id?id=${inputId}`);
};

const getAllProductSearch = (data) => {
  return axios.get(`/api/get-all-product-search?searchTerm=${data}`);
};

const getAllProductTop = () => {
  return axios.get(`/api/get-all-product-top`);
};
const getAllProductTopRelation = (data) => {
  return axios.get(
    `/api/get-all-product-relation?productId=${data.productDetailId}&&categoryId=${data.category_id}`
  );
};
const saveProduct = (data) => {
  return axios.post(`/api/save-product`, data);
};
const editProduct = (data) => {
  return axios.post(`/api/edit-product`, data);
};

const deleteProduct = (inputId) => {
  return axios.delete(`/api/delete-product?id=${inputId}`);
};
const saveCustomer = (data) => {
  return axios.post(`/api/save-customer`, data);
};

const getAllOrder = () => {
  return axios.get(`/api/get-all-order`);
};
//? Banner
const restoreBanner = (inputId) => {
  return axios.patch(`/api/restore-banner?id=${inputId}`);
};
const deleteBannerSoft = (inputId) => {
  return axios.delete(`/api/delete-banner-soft?id=${inputId}`);
};
const getAllBannerDelete = () => {
  return axios.get(`/api/get-all-banner-delete`);
};
const getAllBanner = () => {
  return axios.get(`/api/get-all-banner`);
};

const saveBanner = (data) => {
  return axios.post(`/api/save-banner`, data);
};

const deleteBanner = (inputId) => {
  return axios.delete(`/api/delete-banner?id=${inputId}`);
};

//? post

const deleteTopic = (inputId) => {
  return axios.delete(`/api/delete-topic?id=${inputId}`);
};
const deletePost = (inputId) => {
  return axios.delete(`/api/delete-post?id=${inputId}`);
};
const getAllTopic = () => {
  return axios.get(`/api/get-all-topic`);
};
const getAllPost = () => {
  return axios.get(`/api/get-all-post`);
};

const savePost = (data) => {
  return axios.post(`/api/save-post`, data);
};
const saveTopic = (data) => {
  return axios.post(`/api/save-topic`, data);
};

const saveContract = (data) => {
  return axios.post(`/api/save-contract`, data);
};
const getAllContact = () => {
  return axios.get(`/api/get-all-contact`);
};
const saveRemedy = (data) => {
  return axios.post(`/api/send-remedy`, data);
};

export {
  getAllOrder,
  saveRemedy,
  getAllContact,
  saveContract,
  saveBrand,
  getAllProductTopRelation,
  deleteProductSoft,
  restoreProduct,
  getAllProductDelete,
  deleteProduct,
  saveProduct,
  deletePost,
  getAllPost,
  savePost,
  deleteTopic,
  getAllTopic,
  saveTopic,
  deleteTrademark,
  getAllTrademark,
  getAllProduct,
  saveTrademark,
  getAllBrand,
  getCustomer,
  handleLoginApi,
  getAllUsers,
  createNewUserAdmin,
  DeleteUserAdmin,
  EditUserAdmin,
  getAllCodeServices,
  deleteBrand,
  saveCustomer,
  restoreBrand,
  deleteBrandSoft,
  getAllBrandDelete,
  getAllUser,
  restoreCategory,
  deleteCategorySoft,
  getAllCategoryDelete,
  restoreBanner,
  deleteBannerSoft,
  getAllBannerDelete,
  getAllBanner,
  saveBanner,
  deleteBanner,
  getAllProductTop,
  getAllProductSearch,
  saveAllOrder,
  getAllProductNyId,
  editProduct,
};
