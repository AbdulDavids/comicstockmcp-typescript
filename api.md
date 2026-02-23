# Analysis

Methods:

- <code title="get /api/analysis/{issueId}">client.analysis.<a href="./src/resources/analysis.ts">retrieve</a>(issueID, { ...params }) -> void</code>

# ComicsScraper

Methods:

- <code title="get /api/comics-scraper">client.comicsScraper.<a href="./src/resources/comics-scraper.ts">fetch</a>({ ...params }) -> void</code>

# Customers

Types:

- <code><a href="./src/resources/customers.ts">UserDetails</a></code>
- <code><a href="./src/resources/customers.ts">UserDetailsPagedResult</a></code>

Methods:

- <code title="get /api/Customers/{id}">client.customers.<a href="./src/resources/customers.ts">retrieve</a>(id) -> UserDetails</code>
- <code title="get /api/Customers">client.customers.<a href="./src/resources/customers.ts">list</a>({ ...params }) -> UserDetailsPagedResult</code>

# Dashboard

Types:

- <code><a href="./src/resources/dashboard/dashboard.ts">OrderSummary</a></code>
- <code><a href="./src/resources/dashboard/dashboard.ts">OrderTrend</a></code>
- <code><a href="./src/resources/dashboard/dashboard.ts">DashboardGetRecentOrdersResponse</a></code>
- <code><a href="./src/resources/dashboard/dashboard.ts">DashboardGetRecentUsersResponse</a></code>
- <code><a href="./src/resources/dashboard/dashboard.ts">DashboardGetStockSnapshotResponse</a></code>

Methods:

- <code title="get /api/Dashboard/older-orders">client.dashboard.<a href="./src/resources/dashboard/dashboard.ts">getOlderOrdersCount</a>() -> OrderTrend</code>
- <code title="get /api/Dashboard/order-trends">client.dashboard.<a href="./src/resources/dashboard/dashboard.ts">getOrderTrends</a>({ ...params }) -> OrderTrend</code>
- <code title="get /api/Dashboard/orders-expected-today">client.dashboard.<a href="./src/resources/dashboard/dashboard.ts">getOrdersExpectedTodayCount</a>() -> OrderTrend</code>
- <code title="get /api/Dashboard/orders-overdue">client.dashboard.<a href="./src/resources/dashboard/dashboard.ts">getOverdueOrdersCount</a>() -> OrderTrend</code>
- <code title="get /api/Dashboard/pending-payments">client.dashboard.<a href="./src/resources/dashboard/dashboard.ts">getPendingPaymentsCount</a>() -> OrderTrend</code>
- <code title="get /api/Dashboard/orders">client.dashboard.<a href="./src/resources/dashboard/dashboard.ts">getRecentOrders</a>() -> DashboardGetRecentOrdersResponse</code>
- <code title="get /api/Dashboard/users">client.dashboard.<a href="./src/resources/dashboard/dashboard.ts">getRecentUsers</a>() -> DashboardGetRecentUsersResponse</code>
- <code title="get /api/Dashboard/stock">client.dashboard.<a href="./src/resources/dashboard/dashboard.ts">getStockSnapshot</a>() -> DashboardGetStockSnapshotResponse</code>
- <code title="get /api/Dashboard/unfulfilled-orders">client.dashboard.<a href="./src/resources/dashboard/dashboard.ts">getUnfulfilledOrdersCount</a>() -> OrderTrend</code>

## AvgOrderValue

Methods:

- <code title="get /api/Dashboard/avg-order-value">client.dashboard.avgOrderValue.<a href="./src/resources/dashboard/avg-order-value.ts">get</a>() -> OrderTrend</code>
- <code title="get /api/Dashboard/avg-order-value/{id}">client.dashboard.avgOrderValue.<a href="./src/resources/dashboard/avg-order-value.ts">getByCustomer</a>(id) -> OrderTrend</code>

# Email

Types:

- <code><a href="./src/resources/email.ts">SendEmail</a></code>

Methods:

- <code title="post /api/Email/send">client.email.<a href="./src/resources/email.ts">send</a>({ ...params }) -> void</code>
- <code title="post /api/Email/send-newsletter">client.email.<a href="./src/resources/email.ts">sendNewsletter</a>({ ...params }) -> void</code>

# Fulfillment

Types:

- <code><a href="./src/resources/fulfillment.ts">UpdateOrderStatus</a></code>

Methods:

- <code title="put /api/Fulfillment/{id}/status">client.fulfillment.<a href="./src/resources/fulfillment.ts">updateStatus</a>(id, { ...params }) -> void</code>

# IssueAnalysis

Methods:

- <code title="get /api/issue-analysis/{issueId}">client.issueAnalysis.<a href="./src/resources/issue-analysis.ts">retrieve</a>(issueID) -> void</code>

# IssueSearch

Methods:

- <code title="get /api/issue-search">client.issueSearch.<a href="./src/resources/issue-search.ts">search</a>({ ...params }) -> void</code>

# Orders

Types:

- <code><a href="./src/resources/orders.ts">OrderRetrieveResponse</a></code>
- <code><a href="./src/resources/orders.ts">OrderListResponse</a></code>

Methods:

- <code title="get /api/Orders/{id}">client.orders.<a href="./src/resources/orders.ts">retrieve</a>(id) -> OrderRetrieveResponse</code>
- <code title="get /api/Orders">client.orders.<a href="./src/resources/orders.ts">list</a>({ ...params }) -> OrderListResponse</code>
- <code title="put /api/Orders/{id}/items">client.orders.<a href="./src/resources/orders.ts">updateItems</a>(id, { ...params }) -> void</code>
- <code title="put /api/Orders/{id}/status">client.orders.<a href="./src/resources/orders.ts">updateStatus</a>(id, { ...params }) -> void</code>

# Stock

Types:

- <code><a href="./src/resources/stock.ts">IssueDetail</a></code>
- <code><a href="./src/resources/stock.ts">IssueRequest</a></code>
- <code><a href="./src/resources/stock.ts">StockItemRequestDto</a></code>
- <code><a href="./src/resources/stock.ts">StockListResponse</a></code>

Methods:

- <code title="post /api/Stock">client.stock.<a href="./src/resources/stock.ts">create</a>({ ...params }) -> IssueDetail</code>
- <code title="get /api/Stock/{id}">client.stock.<a href="./src/resources/stock.ts">retrieve</a>(id) -> IssueDetail</code>
- <code title="put /api/Stock/{id}">client.stock.<a href="./src/resources/stock.ts">update</a>(id, { ...params }) -> IssueDetail</code>
- <code title="get /api/Stock">client.stock.<a href="./src/resources/stock.ts">list</a>({ ...params }) -> StockListResponse</code>
- <code title="delete /api/Stock/{id}">client.stock.<a href="./src/resources/stock.ts">delete</a>(id) -> void</code>

# Suggestions

Methods:

- <code title="get /api/Suggestions/bestsellers">client.suggestions.<a href="./src/resources/suggestions.ts">getBestsellers</a>({ ...params }) -> void</code>
- <code title="get /api/Suggestions/low-stock">client.suggestions.<a href="./src/resources/suggestions.ts">getLowStock</a>({ ...params }) -> void</code>

# Summary

Types:

- <code><a href="./src/resources/summary.ts">SummaryGetOrderStatusCountsResponse</a></code>
- <code><a href="./src/resources/summary.ts">SummaryGetSupplierCountsResponse</a></code>

Methods:

- <code title="get /api/Summary/order-status-counts">client.summary.<a href="./src/resources/summary.ts">getOrderStatusCounts</a>() -> SummaryGetOrderStatusCountsResponse</code>
- <code title="get /api/Summary/supplier-counts">client.summary.<a href="./src/resources/summary.ts">getSupplierCounts</a>() -> SummaryGetSupplierCountsResponse</code>

# Suppliers

Types:

- <code><a href="./src/resources/suppliers/suppliers.ts">SupplierRequest</a></code>
- <code><a href="./src/resources/suppliers/suppliers.ts">SupplierSummary</a></code>
- <code><a href="./src/resources/suppliers/suppliers.ts">SupplierListResponse</a></code>
- <code><a href="./src/resources/suppliers/suppliers.ts">SupplierCreateQuoteRequestResponse</a></code>

Methods:

- <code title="post /api/Suppliers">client.suppliers.<a href="./src/resources/suppliers/suppliers.ts">create</a>({ ...params }) -> SupplierSummary</code>
- <code title="get /api/Suppliers/{id}">client.suppliers.<a href="./src/resources/suppliers/suppliers.ts">retrieve</a>(id) -> SupplierSummary</code>
- <code title="put /api/Suppliers/{id}">client.suppliers.<a href="./src/resources/suppliers/suppliers.ts">update</a>(id, { ...params }) -> SupplierSummary</code>
- <code title="get /api/Suppliers">client.suppliers.<a href="./src/resources/suppliers/suppliers.ts">list</a>({ ...params }) -> SupplierListResponse</code>
- <code title="post /api/Suppliers/quote-requests">client.suppliers.<a href="./src/resources/suppliers/suppliers.ts">createQuoteRequest</a>({ ...params }) -> SupplierCreateQuoteRequestResponse</code>

## Quotes

Types:

- <code><a href="./src/resources/suppliers/quotes.ts">SupplierQuoteCsvRow</a></code>
- <code><a href="./src/resources/suppliers/quotes.ts">SupplierQuoteSummary</a></code>
- <code><a href="./src/resources/suppliers/quotes.ts">QuoteListResponse</a></code>
- <code><a href="./src/resources/suppliers/quotes.ts">QuoteListBySupplierResponse</a></code>
- <code><a href="./src/resources/suppliers/quotes.ts">QuotePendingCountResponse</a></code>

Methods:

- <code title="get /api/Suppliers/quotes/{quoteId}">client.suppliers.quotes.<a href="./src/resources/suppliers/quotes.ts">retrieve</a>(quoteID) -> SupplierQuoteSummary</code>
- <code title="put /api/Suppliers/quotes/{quoteId}">client.suppliers.quotes.<a href="./src/resources/suppliers/quotes.ts">update</a>(quoteID, { ...params }) -> SupplierQuoteSummary</code>
- <code title="get /api/Suppliers/quotes">client.suppliers.quotes.<a href="./src/resources/suppliers/quotes.ts">list</a>({ ...params }) -> QuoteListResponse</code>
- <code title="put /api/Suppliers/quotes/{quoteId}/fulfill">client.suppliers.quotes.<a href="./src/resources/suppliers/quotes.ts">fulfill</a>(quoteID, { ...params }) -> SupplierQuoteSummary</code>
- <code title="get /api/Suppliers/{supplierId}/quotes">client.suppliers.quotes.<a href="./src/resources/suppliers/quotes.ts">listBySupplier</a>(supplierID, { ...params }) -> QuoteListBySupplierResponse</code>
- <code title="get /api/Suppliers/quotes/pending-count">client.suppliers.quotes.<a href="./src/resources/suppliers/quotes.ts">pendingCount</a>() -> QuotePendingCountResponse</code>
- <code title="post /api/Suppliers/{supplierId}/quotes">client.suppliers.quotes.<a href="./src/resources/suppliers/quotes.ts">save</a>(supplierID, { ...params }) -> void</code>

## Orders

Types:

- <code><a href="./src/resources/suppliers/orders/orders.ts">SupplierOrderDetail</a></code>
- <code><a href="./src/resources/suppliers/orders/orders.ts">SupplierPaymentSummary</a></code>
- <code><a href="./src/resources/suppliers/orders/orders.ts">OrderListResponse</a></code>
- <code><a href="./src/resources/suppliers/orders/orders.ts">OrderStatusCountsResponse</a></code>

Methods:

- <code title="post /api/Suppliers/orders">client.suppliers.orders.<a href="./src/resources/suppliers/orders/orders.ts">create</a>({ ...params }) -> SupplierOrderDetail</code>
- <code title="get /api/Suppliers/orders/{orderId}">client.suppliers.orders.<a href="./src/resources/suppliers/orders/orders.ts">retrieve</a>(orderID) -> SupplierOrderDetail</code>
- <code title="put /api/Suppliers/orders/{orderId}">client.suppliers.orders.<a href="./src/resources/suppliers/orders/orders.ts">update</a>(orderID, { ...params }) -> void</code>
- <code title="get /api/Suppliers/orders">client.suppliers.orders.<a href="./src/resources/suppliers/orders/orders.ts">list</a>({ ...params }) -> OrderListResponse</code>
- <code title="put /api/Suppliers/orders/{orderId}/confirm">client.suppliers.orders.<a href="./src/resources/suppliers/orders/orders.ts">confirm</a>(orderID) -> void</code>
- <code title="post /api/Suppliers/orders/{orderId}/payment">client.suppliers.orders.<a href="./src/resources/suppliers/orders/orders.ts">recordPayment</a>(orderID, { ...params }) -> SupplierPaymentSummary</code>
- <code title="get /api/Suppliers/orders/status-counts">client.suppliers.orders.<a href="./src/resources/suppliers/orders/orders.ts">statusCounts</a>() -> OrderStatusCountsResponse</code>

### Creation

Types:

- <code><a href="./src/resources/suppliers/orders/creation.ts">SupplierCreateOrderItems</a></code>
- <code><a href="./src/resources/suppliers/orders/creation.ts">CreationListIssuesResponse</a></code>

Methods:

- <code title="get /api/Suppliers/orders/creation/issues">client.suppliers.orders.creation.<a href="./src/resources/suppliers/orders/creation.ts">listIssues</a>({ ...params }) -> CreationListIssuesResponse</code>
- <code title="get /api/Suppliers/orders/creation/issue/{issueId}">client.suppliers.orders.creation.<a href="./src/resources/suppliers/orders/creation.ts">retrieveIssue</a>(issueID) -> SupplierCreateOrderItems</code>

## Issues

Types:

- <code><a href="./src/resources/suppliers/issues.ts">IssueListPreviousSuppliersResponse</a></code>

Methods:

- <code title="get /api/Suppliers/issues/{issueId}/previous-suppliers">client.suppliers.issues.<a href="./src/resources/suppliers/issues.ts">listPreviousSuppliers</a>(issueID) -> IssueListPreviousSuppliersResponse</code>

## Payments

Types:

- <code><a href="./src/resources/suppliers/payments.ts">SupplierPaymentSummaryPagedResult</a></code>

Methods:

- <code title="get /api/Suppliers/payments/{id}">client.suppliers.payments.<a href="./src/resources/suppliers/payments.ts">retrieve</a>(id) -> SupplierPaymentSummary</code>
- <code title="get /api/Suppliers/payments">client.suppliers.payments.<a href="./src/resources/suppliers/payments.ts">list</a>({ ...params }) -> SupplierPaymentSummaryPagedResult</code>
- <code title="get /api/Suppliers/payments/order/{orderId}">client.suppliers.payments.<a href="./src/resources/suppliers/payments.ts">listByOrder</a>(orderID, { ...params }) -> SupplierPaymentSummaryPagedResult</code>
- <code title="get /api/Suppliers/payments/supplier/{supplierId}">client.suppliers.payments.<a href="./src/resources/suppliers/payments.ts">listBySupplier</a>(supplierID, { ...params }) -> SupplierPaymentSummaryPagedResult</code>

# Vouchers

Types:

- <code><a href="./src/resources/vouchers.ts">VoucherRetrieveResponse</a></code>
- <code><a href="./src/resources/vouchers.ts">VoucherExpiredResponse</a></code>
- <code><a href="./src/resources/vouchers.ts">VoucherTotalIssuedResponse</a></code>
- <code><a href="./src/resources/vouchers.ts">VoucherTotalRedeemedResponse</a></code>

Methods:

- <code title="get /api/Vouchers/{id}">client.vouchers.<a href="./src/resources/vouchers.ts">retrieve</a>(id) -> VoucherRetrieveResponse</code>
- <code title="get /api/Vouchers">client.vouchers.<a href="./src/resources/vouchers.ts">list</a>({ ...params }) -> UserDetailsPagedResult</code>
- <code title="get /api/Vouchers/expired">client.vouchers.<a href="./src/resources/vouchers.ts">expired</a>() -> VoucherExpiredResponse</code>
- <code title="get /api/Vouchers/total-issued">client.vouchers.<a href="./src/resources/vouchers.ts">totalIssued</a>() -> VoucherTotalIssuedResponse</code>
- <code title="get /api/Vouchers/total-redeemed">client.vouchers.<a href="./src/resources/vouchers.ts">totalRedeemed</a>() -> VoucherTotalRedeemedResponse</code>

# WeatherForecast

Types:

- <code><a href="./src/resources/weather-forecast.ts">WeatherForecastRetrieveResponse</a></code>

Methods:

- <code title="get /api/WeatherForecast">client.weatherForecast.<a href="./src/resources/weather-forecast.ts">retrieve</a>() -> WeatherForecastRetrieveResponse</code>
