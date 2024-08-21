export type BodyProps = {
  query?: string;
  pageNumber?: number;
  size?: number;
  additionalPages?: number;
  sort?: number;
  facets?: MappedFilters
};

export type MappedFilters = Record<string, FacetOption[]>;

export interface ResponseData {
  pagination: Pagination;
  facets: Facet[];
  products: Product[];
}

export interface Pagination {
  from: number;
  size: number;
  total: number;
  sortType: number;
}

export interface Facet {
  identifier: string;
  displayName: string;
  priority: number;
  options: FacetOption[];
  facetType: number;
}

export interface FacetOption {
  identifier: string;
  value: Value | string;
  displayValue: string;
  productCount: number;
  priority: number;
}

export interface Value {
  gte?: number;
  lte?: number;
  [key: string]: any;
}

export interface Product {
  id: string;
  legacyId: string;
  legacyVariantId: string;
  cultureCode: string;
  isDefaultVariant: boolean;
  sku: string;
  productName: string;
  slug: string;
  averageRating: number;
  reviewsCount: number;
  questionsCount: number;
  image: Image;
  stockStatus: StockStatus;
  price: Price;
  attributes: Attributes;
  defaultCategory: Category;
  brand: Brand;
  score: number;
}

export interface Image {
  externalId: string;
  url: string;
  priority: number;
  isDefault: boolean;
  attributes: ImageAttributes;
}

export interface ImageAttributes {
  imageAltText: string;
}

export interface StockStatus {
  status: string;
}

export interface Price {
  currencyCode: string;
  priceIncTax: number;
  priceExcTax: number;
  isOnPromotion: boolean;
  wasPriceIncTax?: number;
  wasPriceExcTax?: number;
  discountPercentage?: number;
  monthlyFinanceEstimate?: number;
}

export interface Attributes {
  isApproved: boolean;
  isShownOnTv: boolean;
  isBestSeller: boolean;
  isFreeWaste: boolean;
  isPremium: boolean;
  isRecommended: boolean;
  isTrayIncluded: boolean;
  isBluetoothIncluded: boolean;
  isBatteryIncluded: boolean;
  isAntiSlipIncluded: boolean;
  isShortProjection: boolean;
  hasOneOutlet: boolean;
  hasTwoOutlets: boolean;
  hasThreeOutlets: boolean;
  isWaterProof: boolean;
  isNew: boolean;
  hasMoreOptions: boolean;
}

export interface Category {
  externalId: string;
  slug: string;
  name: string;
  isDefault: boolean;
  ancestors: Ancestor[];
}

export interface Ancestor {
  slug: string;
  externalId: string;
  name: string;
  depth: number;
}

export interface Brand {
  externalId: string;
  slug: string;
  name: string;
  brandImage: BrandImage;
}

export interface BrandImage {
  externalId: string;
  url: string;
  priority: number;
  isDefault: boolean;
  attributes: ImageAttributes;
}

export type PageButtonProps = {
  totalPages: number
  currentPage: number
}

export type FilterProps = {
  facets: Facet[];
  filters: Record<string, FacetOption[]>;
}