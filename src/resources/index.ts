// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export { Analysis, type AnalysisRetrieveParams } from './analysis';
export { ComicsScraper, type ComicsScraperFetchParams } from './comics-scraper';
export {
  Customers,
  type UserDetails,
  type UserDetailsPagedResult,
  type CustomerListParams,
} from './customers';
export {
  Dashboard,
  type OrderSummary,
  type OrderTrend,
  type DashboardGetRecentOrdersResponse,
  type DashboardGetRecentUsersResponse,
  type DashboardGetStockSnapshotResponse,
  type DashboardGetOrderTrendsParams,
} from './dashboard/dashboard';
export { Email, type SendEmail, type EmailSendParams, type EmailSendNewsletterParams } from './email';
export { Fulfillment, type UpdateOrderStatus, type FulfillmentUpdateStatusParams } from './fulfillment';
export { IssueAnalysis } from './issue-analysis';
export { IssueSearch, type IssueSearchSearchParams } from './issue-search';
export {
  Orders,
  type OrderRetrieveResponse,
  type OrderListResponse,
  type OrderListParams,
  type OrderUpdateItemsParams,
  type OrderUpdateStatusParams,
} from './orders';
export {
  Stock,
  type IssueDetail,
  type IssueRequest,
  type StockItemRequestDto,
  type StockListResponse,
  type StockCreateParams,
  type StockUpdateParams,
  type StockListParams,
} from './stock';
export {
  Suggestions,
  type SuggestionGetBestsellersParams,
  type SuggestionGetLowStockParams,
} from './suggestions';
export {
  Summary,
  type SummaryGetOrderStatusCountsResponse,
  type SummaryGetSupplierCountsResponse,
} from './summary';
export {
  Suppliers,
  type SupplierRequest,
  type SupplierSummary,
  type SupplierListResponse,
  type SupplierCreateQuoteRequestResponse,
  type SupplierCreateParams,
  type SupplierUpdateParams,
  type SupplierListParams,
  type SupplierCreateQuoteRequestParams,
} from './suppliers/suppliers';
export {
  Vouchers,
  type VoucherRetrieveResponse,
  type VoucherExpiredResponse,
  type VoucherTotalIssuedResponse,
  type VoucherTotalRedeemedResponse,
  type VoucherListParams,
} from './vouchers';
export { WeatherForecast, type WeatherForecastRetrieveResponse } from './weather-forecast';
