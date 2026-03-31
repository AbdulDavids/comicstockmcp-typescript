// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'retrieve',
    endpoint: '/api/analysis/{issueId}',
    httpMethod: 'get',
    summary: 'Run full AI analysis for a comic issue',
    description:
      'Orchestrates three data sources into a single analysis report:\n1. Stock + order history from the database\n2. Upcoming issues scraped from Grand Comics Database (GCD)\n3. OpenAI narrative summary and recommendations\n\nThe `scraperQuery` defaults to the issue title if omitted. The scraper step is fault-tolerant — if GCD is unavailable the report is still generated without upcoming-issues context.',
    stainlessPath: '(resource) analysis > (method) retrieve',
    qualified: 'client.analysis.retrieve',
    params: ['issueId: number;', 'scraperQuery?: string;'],
    markdown:
      "## retrieve\n\n`client.analysis.retrieve(issueId: number, scraperQuery?: string): void`\n\n**get** `/api/analysis/{issueId}`\n\nOrchestrates three data sources into a single analysis report:\n1. Stock + order history from the database\n2. Upcoming issues scraped from Grand Comics Database (GCD)\n3. OpenAI narrative summary and recommendations\n\nThe `scraperQuery` defaults to the issue title if omitted. The scraper step is fault-tolerant — if GCD is unavailable the report is still generated without upcoming-issues context.\n\n### Parameters\n\n- `issueId: number`\n\n- `scraperQuery?: string`\n  Character or series name to use for the GCD scrape. Defaults to the issue title stored in the database.\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nawait client.analysis.retrieve(0)\n```",
  },
  {
    name: 'fetch',
    endpoint: '/api/comics-scraper',
    httpMethod: 'get',
    summary: 'Scrape upcoming comic issues from GCD',
    description:
      'Fetches a list of upcoming comic releases matching the query from the Grand Comics Database website. Results are used to enrich the Analysis report.',
    stainlessPath: '(resource) comics_scraper > (method) fetch',
    qualified: 'client.comicsScraper.fetch',
    params: ['query?: string;', 'year?: number;'],
    markdown:
      "## fetch\n\n`client.comicsScraper.fetch(query?: string, year?: number): void`\n\n**get** `/api/comics-scraper`\n\nFetches a list of upcoming comic releases matching the query from the Grand Comics Database website. Results are used to enrich the Analysis report.\n\n### Parameters\n\n- `query?: string`\n  Character or series name to search for (e.g. 'Spider-Man', 'Batman').\n\n- `year?: number`\n  Publication year filter. Defaults to the current year.\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nawait client.comicsScraper.fetch()\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/api/Customers/{id}',
    httpMethod: 'get',
    summary: 'Get a single customer by ID',
    description: 'Get a single customer by ID',
    stainlessPath: '(resource) customers > (method) retrieve',
    qualified: 'client.customers.retrieve',
    params: ['id: number;'],
    response: '{ email?: string; firstName?: string; lastName?: string; title?: string; userId?: number; }',
    markdown:
      "## retrieve\n\n`client.customers.retrieve(id: number): { email?: string; firstName?: string; lastName?: string; title?: string; userId?: number; }`\n\n**get** `/api/Customers/{id}`\n\nGet a single customer by ID\n\n### Parameters\n\n- `id: number`\n\n### Returns\n\n- `{ email?: string; firstName?: string; lastName?: string; title?: string; userId?: number; }`\n  Customer profile detail.\n\n  - `email?: string`\n  - `firstName?: string`\n  - `lastName?: string`\n  - `title?: string`\n  - `userId?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst userDetails = await client.customers.retrieve(0);\n\nconsole.log(userDetails);\n```",
  },
  {
    name: 'list',
    endpoint: '/api/Customers',
    httpMethod: 'get',
    summary: 'List customers (paginated)',
    description:
      'Returns a paginated list of registered customers. Supports optional full-text search across name and email.',
    stainlessPath: '(resource) customers > (method) list',
    qualified: 'client.customers.list',
    params: ['page?: number;', 'pageSize?: number;', 'searchTerm?: string;'],
    response:
      '{ items?: { email?: string; firstName?: string; lastName?: string; title?: string; userId?: number; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }',
    markdown:
      "## list\n\n`client.customers.list(page?: number, pageSize?: number, searchTerm?: string): { items?: user_details[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n\n**get** `/api/Customers`\n\nReturns a paginated list of registered customers. Supports optional full-text search across name and email.\n\n### Parameters\n\n- `page?: number`\n  1-based page number.\n\n- `pageSize?: number`\n  Number of records per page.\n\n- `searchTerm?: string`\n  Optional search string matched against customer name and email.\n\n### Returns\n\n- `{ items?: { email?: string; firstName?: string; lastName?: string; title?: string; userId?: number; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n  Paginated result wrapping UserDetailsDTO items.\n\n  - `items?: { email?: string; firstName?: string; lastName?: string; title?: string; userId?: number; }[]`\n  - `page?: number`\n  - `pageSize?: number`\n  - `totalCount?: number`\n  - `totalPages?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst userDetailsPagedResult = await client.customers.list();\n\nconsole.log(userDetailsPagedResult);\n```",
  },
  {
    name: 'get_older_orders_count',
    endpoint: '/api/Dashboard/older-orders',
    httpMethod: 'get',
    summary: 'Get count of orders older than a stale threshold',
    description: 'Get count of orders older than a stale threshold',
    stainlessPath: '(resource) dashboard > (method) get_older_orders_count',
    qualified: 'client.dashboard.getOlderOrdersCount',
    response:
      '{ dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }',
    markdown:
      "## get_older_orders_count\n\n`client.dashboard.getOlderOrdersCount(): { dataPoints?: object[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }`\n\n**get** `/api/Dashboard/older-orders`\n\nGet count of orders older than a stale threshold\n\n### Returns\n\n- `{ dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }`\n  Time-series metric result used by dashboard trend charts and KPI cards.\n\n  - `dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]`\n  - `granularity?: string`\n  - `totalOrders?: number`\n  - `totalRevenue?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst orderTrend = await client.dashboard.getOlderOrdersCount();\n\nconsole.log(orderTrend);\n```",
  },
  {
    name: 'get_order_trends',
    endpoint: '/api/Dashboard/order-trends',
    httpMethod: 'get',
    summary: 'Get order volume and revenue trends',
    description:
      'Returns time-series data points grouped by week or month (granularity chosen by the API based on the requested window) for order count and revenue.',
    stainlessPath: '(resource) dashboard > (method) get_order_trends',
    qualified: 'client.dashboard.getOrderTrends',
    params: ['months?: number;'],
    response:
      '{ dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }',
    markdown:
      "## get_order_trends\n\n`client.dashboard.getOrderTrends(months?: number): { dataPoints?: object[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }`\n\n**get** `/api/Dashboard/order-trends`\n\nReturns time-series data points grouped by week or month (granularity chosen by the API based on the requested window) for order count and revenue.\n\n### Parameters\n\n- `months?: number`\n  How many months of history to return. Defaults to 12.\n\n### Returns\n\n- `{ dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }`\n  Time-series metric result used by dashboard trend charts and KPI cards.\n\n  - `dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]`\n  - `granularity?: string`\n  - `totalOrders?: number`\n  - `totalRevenue?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst orderTrend = await client.dashboard.getOrderTrends();\n\nconsole.log(orderTrend);\n```",
  },
  {
    name: 'get_orders_expected_today_count',
    endpoint: '/api/Dashboard/orders-expected-today',
    httpMethod: 'get',
    summary: 'Get count of supplier shipments expected to arrive today',
    description: 'Get count of supplier shipments expected to arrive today',
    stainlessPath: '(resource) dashboard > (method) get_orders_expected_today_count',
    qualified: 'client.dashboard.getOrdersExpectedTodayCount',
    response:
      '{ dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }',
    markdown:
      "## get_orders_expected_today_count\n\n`client.dashboard.getOrdersExpectedTodayCount(): { dataPoints?: object[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }`\n\n**get** `/api/Dashboard/orders-expected-today`\n\nGet count of supplier shipments expected to arrive today\n\n### Returns\n\n- `{ dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }`\n  Time-series metric result used by dashboard trend charts and KPI cards.\n\n  - `dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]`\n  - `granularity?: string`\n  - `totalOrders?: number`\n  - `totalRevenue?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst orderTrend = await client.dashboard.getOrdersExpectedTodayCount();\n\nconsole.log(orderTrend);\n```",
  },
  {
    name: 'get_overdue_orders_count',
    endpoint: '/api/Dashboard/orders-overdue',
    httpMethod: 'get',
    summary: 'Get count of supplier orders past their expected delivery date',
    description: 'Get count of supplier orders past their expected delivery date',
    stainlessPath: '(resource) dashboard > (method) get_overdue_orders_count',
    qualified: 'client.dashboard.getOverdueOrdersCount',
    response:
      '{ dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }',
    markdown:
      "## get_overdue_orders_count\n\n`client.dashboard.getOverdueOrdersCount(): { dataPoints?: object[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }`\n\n**get** `/api/Dashboard/orders-overdue`\n\nGet count of supplier orders past their expected delivery date\n\n### Returns\n\n- `{ dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }`\n  Time-series metric result used by dashboard trend charts and KPI cards.\n\n  - `dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]`\n  - `granularity?: string`\n  - `totalOrders?: number`\n  - `totalRevenue?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst orderTrend = await client.dashboard.getOverdueOrdersCount();\n\nconsole.log(orderTrend);\n```",
  },
  {
    name: 'get_pending_payments_count',
    endpoint: '/api/Dashboard/pending-payments',
    httpMethod: 'get',
    summary: 'Get count of orders with pending payments',
    description: 'Get count of orders with pending payments',
    stainlessPath: '(resource) dashboard > (method) get_pending_payments_count',
    qualified: 'client.dashboard.getPendingPaymentsCount',
    response:
      '{ dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }',
    markdown:
      "## get_pending_payments_count\n\n`client.dashboard.getPendingPaymentsCount(): { dataPoints?: object[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }`\n\n**get** `/api/Dashboard/pending-payments`\n\nGet count of orders with pending payments\n\n### Returns\n\n- `{ dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }`\n  Time-series metric result used by dashboard trend charts and KPI cards.\n\n  - `dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]`\n  - `granularity?: string`\n  - `totalOrders?: number`\n  - `totalRevenue?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst orderTrend = await client.dashboard.getPendingPaymentsCount();\n\nconsole.log(orderTrend);\n```",
  },
  {
    name: 'get_recent_orders',
    endpoint: '/api/Dashboard/orders',
    httpMethod: 'get',
    summary: 'Get recent customer orders for the dashboard',
    description:
      'Returns a short list of the most recent customer orders shown on the dashboard home screen.',
    stainlessPath: '(resource) dashboard > (method) get_recent_orders',
    qualified: 'client.dashboard.getRecentOrders',
    response:
      '{ customerEmail?: string; customerFullName?: string; customerOrderId?: number; dateDelivered?: string; dateShipped?: string; deliveryType?: string; orderDate?: string; orderNumber?: string; status?: string; total?: number; totalPaid?: number; waybillNumber?: string; }[]',
    markdown:
      "## get_recent_orders\n\n`client.dashboard.getRecentOrders(): object[]`\n\n**get** `/api/Dashboard/orders`\n\nReturns a short list of the most recent customer orders shown on the dashboard home screen.\n\n### Returns\n\n- `{ customerEmail?: string; customerFullName?: string; customerOrderId?: number; dateDelivered?: string; dateShipped?: string; deliveryType?: string; orderDate?: string; orderNumber?: string; status?: string; total?: number; totalPaid?: number; waybillNumber?: string; }[]`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst orderSummaries = await client.dashboard.getRecentOrders();\n\nconsole.log(orderSummaries);\n```",
  },
  {
    name: 'get_recent_users',
    endpoint: '/api/Dashboard/users',
    httpMethod: 'get',
    summary: 'Get recently active users for the dashboard',
    description: 'Get recently active users for the dashboard',
    stainlessPath: '(resource) dashboard > (method) get_recent_users',
    qualified: 'client.dashboard.getRecentUsers',
    response:
      '{ customerId?: number; email?: string; firstName?: string; lastName?: string; title?: string; totalOrders?: number; totalSpent?: number; }[]',
    markdown:
      "## get_recent_users\n\n`client.dashboard.getRecentUsers(): { customerId?: number; email?: string; firstName?: string; lastName?: string; title?: string; totalOrders?: number; totalSpent?: number; }[]`\n\n**get** `/api/Dashboard/users`\n\nGet recently active users for the dashboard\n\n### Returns\n\n- `{ customerId?: number; email?: string; firstName?: string; lastName?: string; title?: string; totalOrders?: number; totalSpent?: number; }[]`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst response = await client.dashboard.getRecentUsers();\n\nconsole.log(response);\n```",
  },
  {
    name: 'get_stock_snapshot',
    endpoint: '/api/Dashboard/stock',
    httpMethod: 'get',
    summary: 'Get stock snapshot for the dashboard',
    description: 'Get stock snapshot for the dashboard',
    stainlessPath: '(resource) dashboard > (method) get_stock_snapshot',
    qualified: 'client.dashboard.getStockSnapshot',
    response:
      '{ coverImage?: string; description?: string; issueId?: number; publicationDate?: string; publisher?: string; seriesNumber?: number; stock?: { availableQuantity?: number; condition?: string; price?: number; stockItemId?: number; }[]; title?: string; }[]',
    markdown:
      "## get_stock_snapshot\n\n`client.dashboard.getStockSnapshot(): object[]`\n\n**get** `/api/Dashboard/stock`\n\nGet stock snapshot for the dashboard\n\n### Returns\n\n- `{ coverImage?: string; description?: string; issueId?: number; publicationDate?: string; publisher?: string; seriesNumber?: number; stock?: { availableQuantity?: number; condition?: string; price?: number; stockItemId?: number; }[]; title?: string; }[]`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst issueDetails = await client.dashboard.getStockSnapshot();\n\nconsole.log(issueDetails);\n```",
  },
  {
    name: 'get_unfulfilled_orders_count',
    endpoint: '/api/Dashboard/unfulfilled-orders',
    httpMethod: 'get',
    summary: 'Get count of unfulfilled orders',
    description: 'Get count of unfulfilled orders',
    stainlessPath: '(resource) dashboard > (method) get_unfulfilled_orders_count',
    qualified: 'client.dashboard.getUnfulfilledOrdersCount',
    response:
      '{ dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }',
    markdown:
      "## get_unfulfilled_orders_count\n\n`client.dashboard.getUnfulfilledOrdersCount(): { dataPoints?: object[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }`\n\n**get** `/api/Dashboard/unfulfilled-orders`\n\nGet count of unfulfilled orders\n\n### Returns\n\n- `{ dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }`\n  Time-series metric result used by dashboard trend charts and KPI cards.\n\n  - `dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]`\n  - `granularity?: string`\n  - `totalOrders?: number`\n  - `totalRevenue?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst orderTrend = await client.dashboard.getUnfulfilledOrdersCount();\n\nconsole.log(orderTrend);\n```",
  },
  {
    name: 'get',
    endpoint: '/api/Dashboard/avg-order-value',
    httpMethod: 'get',
    summary: 'Get average order value (all customers)',
    description: 'Get average order value (all customers)',
    stainlessPath: '(resource) dashboard.avg_order_value > (method) get',
    qualified: 'client.dashboard.avgOrderValue.get',
    response:
      '{ dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }',
    markdown:
      "## get\n\n`client.dashboard.avgOrderValue.get(): { dataPoints?: object[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }`\n\n**get** `/api/Dashboard/avg-order-value`\n\nGet average order value (all customers)\n\n### Returns\n\n- `{ dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }`\n  Time-series metric result used by dashboard trend charts and KPI cards.\n\n  - `dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]`\n  - `granularity?: string`\n  - `totalOrders?: number`\n  - `totalRevenue?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst orderTrend = await client.dashboard.avgOrderValue.get();\n\nconsole.log(orderTrend);\n```",
  },
  {
    name: 'get_by_customer',
    endpoint: '/api/Dashboard/avg-order-value/{id}',
    httpMethod: 'get',
    summary: 'Get average order value for a specific customer',
    description: 'Get average order value for a specific customer',
    stainlessPath: '(resource) dashboard.avg_order_value > (method) get_by_customer',
    qualified: 'client.dashboard.avgOrderValue.getByCustomer',
    params: ['id: number;'],
    response:
      '{ dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }',
    markdown:
      "## get_by_customer\n\n`client.dashboard.avgOrderValue.getByCustomer(id: number): { dataPoints?: object[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }`\n\n**get** `/api/Dashboard/avg-order-value/{id}`\n\nGet average order value for a specific customer\n\n### Parameters\n\n- `id: number`\n\n### Returns\n\n- `{ dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]; granularity?: string; totalOrders?: number; totalRevenue?: number; }`\n  Time-series metric result used by dashboard trend charts and KPI cards.\n\n  - `dataPoints?: { label?: string; orderCount?: number; revenue?: number; }[]`\n  - `granularity?: string`\n  - `totalOrders?: number`\n  - `totalRevenue?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst orderTrend = await client.dashboard.avgOrderValue.getByCustomer(0);\n\nconsole.log(orderTrend);\n```",
  },
  {
    name: 'send',
    endpoint: '/api/Email/send',
    httpMethod: 'post',
    summary: 'Send a transactional email',
    description: 'Send a transactional email',
    stainlessPath: '(resource) email > (method) send',
    qualified: 'client.email.send',
    params: ['htmlBody?: string;', 'subject?: string;', 'to?: string;'],
    markdown:
      "## send\n\n`client.email.send(htmlBody?: string, subject?: string, to?: string): void`\n\n**post** `/api/Email/send`\n\nSend a transactional email\n\n### Parameters\n\n- `htmlBody?: string`\n  HTML body of the email.\n\n- `subject?: string`\n  Email subject line.\n\n- `to?: string`\n  Recipient email address.\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nawait client.email.send()\n```",
  },
  {
    name: 'send_newsletter',
    endpoint: '/api/Email/send-newsletter',
    httpMethod: 'post',
    summary: 'Send a newsletter blast',
    description:
      'Sends an HTML email newsletter to the specified recipient. In a production setup this is typically a mailing-list address.',
    stainlessPath: '(resource) email > (method) send_newsletter',
    qualified: 'client.email.sendNewsletter',
    params: ['htmlBody?: string;', 'subject?: string;', 'to?: string;'],
    markdown:
      "## send_newsletter\n\n`client.email.sendNewsletter(htmlBody?: string, subject?: string, to?: string): void`\n\n**post** `/api/Email/send-newsletter`\n\nSends an HTML email newsletter to the specified recipient. In a production setup this is typically a mailing-list address.\n\n### Parameters\n\n- `htmlBody?: string`\n  HTML body of the email.\n\n- `subject?: string`\n  Email subject line.\n\n- `to?: string`\n  Recipient email address.\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nawait client.email.sendNewsletter()\n```",
  },
  {
    name: 'update_status',
    endpoint: '/api/Fulfillment/{id}/status',
    httpMethod: 'put',
    summary: 'Update fulfillment status of a customer order',
    description:
      'Advances or updates the delivery status of a customer order (e.g. Pending → Shipped → Delivered). Optionally records a waybill number.',
    stainlessPath: '(resource) fulfillment > (method) update_status',
    qualified: 'client.fulfillment.updateStatus',
    params: ['id: number;', 'newStatus?: string;', 'waybillNumber?: string;'],
    markdown:
      "## update_status\n\n`client.fulfillment.updateStatus(id: number, newStatus?: string, waybillNumber?: string): void`\n\n**put** `/api/Fulfillment/{id}/status`\n\nAdvances or updates the delivery status of a customer order (e.g. Pending → Shipped → Delivered). Optionally records a waybill number.\n\n### Parameters\n\n- `id: number`\n\n- `newStatus?: string`\n  Target status string (e.g. 'Shipped', 'Delivered', 'Cancelled').\n\n- `waybillNumber?: string`\n  Courier waybill number (required when transitioning to Shipped).\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nawait client.fulfillment.updateStatus(0)\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/api/issue-analysis/{issueId}',
    httpMethod: 'get',
    summary: 'Get raw stock and order data for an issue (no AI)',
    description:
      'Returns the issue record plus stock items and total order count. Faster and cheaper than the full `/api/analysis/{issueId}` endpoint since it skips the GCD scraper and OpenAI call.',
    stainlessPath: '(resource) issue_analysis > (method) retrieve',
    qualified: 'client.issueAnalysis.retrieve',
    params: ['issueId: number;'],
    markdown:
      "## retrieve\n\n`client.issueAnalysis.retrieve(issueId: number): void`\n\n**get** `/api/issue-analysis/{issueId}`\n\nReturns the issue record plus stock items and total order count. Faster and cheaper than the full `/api/analysis/{issueId}` endpoint since it skips the GCD scraper and OpenAI call.\n\n### Parameters\n\n- `issueId: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nawait client.issueAnalysis.retrieve(0)\n```",
  },
  {
    name: 'search',
    endpoint: '/api/issue-search',
    httpMethod: 'get',
    summary: 'Typeahead search for comic issues',
    description: 'Returns matching comic issue titles for use in autocomplete/search inputs.',
    stainlessPath: '(resource) issue_search > (method) search',
    qualified: 'client.issueSearch.search',
    params: ['query?: string;'],
    markdown:
      "## search\n\n`client.issueSearch.search(query?: string): void`\n\n**get** `/api/issue-search`\n\nReturns matching comic issue titles for use in autocomplete/search inputs.\n\n### Parameters\n\n- `query?: string`\n  Partial title to search for.\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nawait client.issueSearch.search()\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/api/Orders/{id}',
    httpMethod: 'get',
    summary: 'Get customer order detail by ID',
    description: 'Get customer order detail by ID',
    stainlessPath: '(resource) orders > (method) retrieve',
    qualified: 'client.orders.retrieve',
    params: ['id: number;'],
    response:
      '{ customer?: { email?: string; firstName?: string; lastName?: string; title?: string; userId?: number; }; customerOrderId?: number; delivery?: { address?: { addressLineOne?: string; addressLineTwo?: string; city?: string; postalCode?: string; }; dateDelivered?: string; dateShipped?: string; deliveryType?: string; orderDeliveryId?: number; specialInstructions?: string; waybillNumber?: string; }; items?: { condition?: string; issueTitle?: string; publisher?: string; quantity?: number; sellingPrice?: number; seriesNumber?: number; stockItemId?: number; }[]; orderDate?: string; orderNumber?: string; payment?: { amount?: number; orderPaymentId?: number; processedDate?: string; returnedCode?: string; returnedMessage?: string; status?: string; transactionReference?: string; }; status?: string; total?: number; totalPaid?: number; vatPaid?: number; }',
    markdown:
      "## retrieve\n\n`client.orders.retrieve(id: number): { customer?: user_details; customerOrderId?: number; delivery?: object; items?: object[]; orderDate?: string; orderNumber?: string; payment?: object; status?: string; total?: number; totalPaid?: number; vatPaid?: number; }`\n\n**get** `/api/Orders/{id}`\n\nGet customer order detail by ID\n\n### Parameters\n\n- `id: number`\n\n### Returns\n\n- `{ customer?: { email?: string; firstName?: string; lastName?: string; title?: string; userId?: number; }; customerOrderId?: number; delivery?: { address?: { addressLineOne?: string; addressLineTwo?: string; city?: string; postalCode?: string; }; dateDelivered?: string; dateShipped?: string; deliveryType?: string; orderDeliveryId?: number; specialInstructions?: string; waybillNumber?: string; }; items?: { condition?: string; issueTitle?: string; publisher?: string; quantity?: number; sellingPrice?: number; seriesNumber?: number; stockItemId?: number; }[]; orderDate?: string; orderNumber?: string; payment?: { amount?: number; orderPaymentId?: number; processedDate?: string; returnedCode?: string; returnedMessage?: string; status?: string; transactionReference?: string; }; status?: string; total?: number; totalPaid?: number; vatPaid?: number; }`\n  Full customer order detail including line items, delivery, and payment.\n\n  - `customer?: { email?: string; firstName?: string; lastName?: string; title?: string; userId?: number; }`\n  - `customerOrderId?: number`\n  - `delivery?: { address?: { addressLineOne?: string; addressLineTwo?: string; city?: string; postalCode?: string; }; dateDelivered?: string; dateShipped?: string; deliveryType?: string; orderDeliveryId?: number; specialInstructions?: string; waybillNumber?: string; }`\n  - `items?: { condition?: string; issueTitle?: string; publisher?: string; quantity?: number; sellingPrice?: number; seriesNumber?: number; stockItemId?: number; }[]`\n  - `orderDate?: string`\n  - `orderNumber?: string`\n  - `payment?: { amount?: number; orderPaymentId?: number; processedDate?: string; returnedCode?: string; returnedMessage?: string; status?: string; transactionReference?: string; }`\n  - `status?: string`\n  - `total?: number`\n  - `totalPaid?: number`\n  - `vatPaid?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst order = await client.orders.retrieve(0);\n\nconsole.log(order);\n```",
  },
  {
    name: 'list',
    endpoint: '/api/Orders',
    httpMethod: 'get',
    summary: 'List customer orders (paginated, filterable)',
    description:
      'Returns a paginated list of customer purchase orders. Supports search, status filter, sort field, and customer filter.',
    stainlessPath: '(resource) orders > (method) list',
    qualified: 'client.orders.list',
    params: [
      'CustomerId?: number;',
      'Page?: number;',
      'PageSize?: number;',
      'SearchTerm?: string;',
      'SortBy?: string;',
      'SortDescending?: boolean;',
      'StatusFilter?: string;',
    ],
    response:
      '{ orders?: { customerEmail?: string; customerFullName?: string; customerOrderId?: number; dateDelivered?: string; dateShipped?: string; deliveryType?: string; orderDate?: string; orderNumber?: string; status?: string; total?: number; totalPaid?: number; waybillNumber?: string; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }',
    markdown:
      "## list\n\n`client.orders.list(CustomerId?: number, Page?: number, PageSize?: number, SearchTerm?: string, SortBy?: string, SortDescending?: boolean, StatusFilter?: string): { orders?: order_summary[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n\n**get** `/api/Orders`\n\nReturns a paginated list of customer purchase orders. Supports search, status filter, sort field, and customer filter.\n\n### Parameters\n\n- `CustomerId?: number`\n  Filter orders belonging to a specific customer.\n\n- `Page?: number`\n  1-based page number.\n\n- `PageSize?: number`\n  Number of records per page.\n\n- `SearchTerm?: string`\n  Full-text search across order number and customer name.\n\n- `SortBy?: string`\n  Field name to sort by (e.g. 'orderDate', 'total').\n\n- `SortDescending?: boolean`\n  Sort in descending order when true.\n\n- `StatusFilter?: string`\n  Filter by order status string (e.g. 'Pending', 'Shipped', 'Delivered').\n\n### Returns\n\n- `{ orders?: { customerEmail?: string; customerFullName?: string; customerOrderId?: number; dateDelivered?: string; dateShipped?: string; deliveryType?: string; orderDate?: string; orderNumber?: string; status?: string; total?: number; totalPaid?: number; waybillNumber?: string; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n  Paginated result for customer orders (uses `orders` instead of `items` for the array field).\n\n  - `orders?: { customerEmail?: string; customerFullName?: string; customerOrderId?: number; dateDelivered?: string; dateShipped?: string; deliveryType?: string; orderDate?: string; orderNumber?: string; status?: string; total?: number; totalPaid?: number; waybillNumber?: string; }[]`\n  - `page?: number`\n  - `pageSize?: number`\n  - `totalCount?: number`\n  - `totalPages?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst orders = await client.orders.list();\n\nconsole.log(orders);\n```",
  },
  {
    name: 'update_items',
    endpoint: '/api/Orders/{id}/items',
    httpMethod: 'put',
    summary: 'Update line items on a customer order',
    description:
      'Replaces the line items on an existing order. Used to correct quantities or pricing before fulfillment.',
    stainlessPath: '(resource) orders > (method) update_items',
    qualified: 'client.orders.updateItems',
    params: [
      'id: number;',
      'items?: { condition?: string; customerOrderItemsId?: number; price?: number; quantity?: number; seriesNumber?: number; title?: string; }[];',
    ],
    markdown:
      "## update_items\n\n`client.orders.updateItems(id: number, items?: { condition?: string; customerOrderItemsId?: number; price?: number; quantity?: number; seriesNumber?: number; title?: string; }[]): void`\n\n**put** `/api/Orders/{id}/items`\n\nReplaces the line items on an existing order. Used to correct quantities or pricing before fulfillment.\n\n### Parameters\n\n- `id: number`\n\n- `items?: { condition?: string; customerOrderItemsId?: number; price?: number; quantity?: number; seriesNumber?: number; title?: string; }[]`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nawait client.orders.updateItems(0)\n```",
  },
  {
    name: 'update_status',
    endpoint: '/api/Orders/{id}/status',
    httpMethod: 'put',
    summary: 'Update the status of a customer order',
    description: 'Update the status of a customer order',
    stainlessPath: '(resource) orders > (method) update_status',
    qualified: 'client.orders.updateStatus',
    params: ['id: number;', 'newStatus?: string;', 'waybillNumber?: string;'],
    markdown:
      "## update_status\n\n`client.orders.updateStatus(id: number, newStatus?: string, waybillNumber?: string): void`\n\n**put** `/api/Orders/{id}/status`\n\nUpdate the status of a customer order\n\n### Parameters\n\n- `id: number`\n\n- `newStatus?: string`\n  Target status string (e.g. 'Shipped', 'Delivered', 'Cancelled').\n\n- `waybillNumber?: string`\n  Courier waybill number (required when transitioning to Shipped).\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nawait client.orders.updateStatus(0)\n```",
  },
  {
    name: 'create',
    endpoint: '/api/Stock',
    httpMethod: 'post',
    summary: 'Create a new comic issue with stock items',
    description:
      'Creates an issue record along with its initial stock items. Each stock item specifies a condition, quantity, and selling price.',
    stainlessPath: '(resource) stock > (method) create',
    qualified: 'client.stock.create',
    params: [
      'coverImage?: string;',
      'description?: string;',
      'publicationDate?: string;',
      'publisher?: string;',
      'seriesNumber?: number;',
      'stock?: { availableQuantity?: number; condition?: string; price?: number; }[];',
      'title?: string;',
    ],
    response:
      '{ coverImage?: string; description?: string; issueId?: number; publicationDate?: string; publisher?: string; seriesNumber?: number; stock?: { availableQuantity?: number; condition?: string; price?: number; stockItemId?: number; }[]; title?: string; }',
    markdown:
      "## create\n\n`client.stock.create(coverImage?: string, description?: string, publicationDate?: string, publisher?: string, seriesNumber?: number, stock?: { availableQuantity?: number; condition?: string; price?: number; }[], title?: string): { coverImage?: string; description?: string; issueId?: number; publicationDate?: string; publisher?: string; seriesNumber?: number; stock?: object[]; title?: string; }`\n\n**post** `/api/Stock`\n\nCreates an issue record along with its initial stock items. Each stock item specifies a condition, quantity, and selling price.\n\n### Parameters\n\n- `coverImage?: string`\n\n- `description?: string`\n\n- `publicationDate?: string`\n\n- `publisher?: string`\n\n- `seriesNumber?: number`\n\n- `stock?: { availableQuantity?: number; condition?: string; price?: number; }[]`\n  Stock items to create / update.\n\n- `title?: string`\n  Series title.\n\n### Returns\n\n- `{ coverImage?: string; description?: string; issueId?: number; publicationDate?: string; publisher?: string; seriesNumber?: number; stock?: { availableQuantity?: number; condition?: string; price?: number; stockItemId?: number; }[]; title?: string; }`\n  Full detail for a comic issue including all associated stock items.\n\n  - `coverImage?: string`\n  - `description?: string`\n  - `issueId?: number`\n  - `publicationDate?: string`\n  - `publisher?: string`\n  - `seriesNumber?: number`\n  - `stock?: { availableQuantity?: number; condition?: string; price?: number; stockItemId?: number; }[]`\n  - `title?: string`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst issueDetail = await client.stock.create();\n\nconsole.log(issueDetail);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/api/Stock/{id}',
    httpMethod: 'get',
    summary: 'Get a single comic issue by ID',
    description: 'Get a single comic issue by ID',
    stainlessPath: '(resource) stock > (method) retrieve',
    qualified: 'client.stock.retrieve',
    params: ['id: number;'],
    response:
      '{ coverImage?: string; description?: string; issueId?: number; publicationDate?: string; publisher?: string; seriesNumber?: number; stock?: { availableQuantity?: number; condition?: string; price?: number; stockItemId?: number; }[]; title?: string; }',
    markdown:
      "## retrieve\n\n`client.stock.retrieve(id: number): { coverImage?: string; description?: string; issueId?: number; publicationDate?: string; publisher?: string; seriesNumber?: number; stock?: object[]; title?: string; }`\n\n**get** `/api/Stock/{id}`\n\nGet a single comic issue by ID\n\n### Parameters\n\n- `id: number`\n\n### Returns\n\n- `{ coverImage?: string; description?: string; issueId?: number; publicationDate?: string; publisher?: string; seriesNumber?: number; stock?: { availableQuantity?: number; condition?: string; price?: number; stockItemId?: number; }[]; title?: string; }`\n  Full detail for a comic issue including all associated stock items.\n\n  - `coverImage?: string`\n  - `description?: string`\n  - `issueId?: number`\n  - `publicationDate?: string`\n  - `publisher?: string`\n  - `seriesNumber?: number`\n  - `stock?: { availableQuantity?: number; condition?: string; price?: number; stockItemId?: number; }[]`\n  - `title?: string`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst issueDetail = await client.stock.retrieve(0);\n\nconsole.log(issueDetail);\n```",
  },
  {
    name: 'update',
    endpoint: '/api/Stock/{id}',
    httpMethod: 'put',
    summary: 'Update a comic issue and its stock items',
    description: 'Update a comic issue and its stock items',
    stainlessPath: '(resource) stock > (method) update',
    qualified: 'client.stock.update',
    params: [
      'id: number;',
      'coverImage?: string;',
      'description?: string;',
      'publicationDate?: string;',
      'publisher?: string;',
      'seriesNumber?: number;',
      'stock?: { availableQuantity?: number; condition?: string; price?: number; }[];',
      'title?: string;',
    ],
    response:
      '{ coverImage?: string; description?: string; issueId?: number; publicationDate?: string; publisher?: string; seriesNumber?: number; stock?: { availableQuantity?: number; condition?: string; price?: number; stockItemId?: number; }[]; title?: string; }',
    markdown:
      "## update\n\n`client.stock.update(id: number, coverImage?: string, description?: string, publicationDate?: string, publisher?: string, seriesNumber?: number, stock?: { availableQuantity?: number; condition?: string; price?: number; }[], title?: string): { coverImage?: string; description?: string; issueId?: number; publicationDate?: string; publisher?: string; seriesNumber?: number; stock?: object[]; title?: string; }`\n\n**put** `/api/Stock/{id}`\n\nUpdate a comic issue and its stock items\n\n### Parameters\n\n- `id: number`\n\n- `coverImage?: string`\n\n- `description?: string`\n\n- `publicationDate?: string`\n\n- `publisher?: string`\n\n- `seriesNumber?: number`\n\n- `stock?: { availableQuantity?: number; condition?: string; price?: number; }[]`\n  Stock items to create / update.\n\n- `title?: string`\n  Series title.\n\n### Returns\n\n- `{ coverImage?: string; description?: string; issueId?: number; publicationDate?: string; publisher?: string; seriesNumber?: number; stock?: { availableQuantity?: number; condition?: string; price?: number; stockItemId?: number; }[]; title?: string; }`\n  Full detail for a comic issue including all associated stock items.\n\n  - `coverImage?: string`\n  - `description?: string`\n  - `issueId?: number`\n  - `publicationDate?: string`\n  - `publisher?: string`\n  - `seriesNumber?: number`\n  - `stock?: { availableQuantity?: number; condition?: string; price?: number; stockItemId?: number; }[]`\n  - `title?: string`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst issueDetail = await client.stock.update(0);\n\nconsole.log(issueDetail);\n```",
  },
  {
    name: 'list',
    endpoint: '/api/Stock',
    httpMethod: 'get',
    summary: 'List comic issues in stock (paginated)',
    description:
      'Returns a paginated list of comic issues, each with their associated stock items (condition, quantity, price). Supports search by title or publisher.',
    stainlessPath: '(resource) stock > (method) list',
    qualified: 'client.stock.list',
    params: ['page?: number;', 'pageSize?: number;', 'searchTerm?: string;'],
    response:
      '{ items?: { coverImage?: string; description?: string; issueId?: number; publicationDate?: string; publisher?: string; seriesNumber?: number; stock?: object[]; title?: string; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }',
    markdown:
      "## list\n\n`client.stock.list(page?: number, pageSize?: number, searchTerm?: string): { items?: issue_detail[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n\n**get** `/api/Stock`\n\nReturns a paginated list of comic issues, each with their associated stock items (condition, quantity, price). Supports search by title or publisher.\n\n### Parameters\n\n- `page?: number`\n  1-based page number.\n\n- `pageSize?: number`\n  Number of issues per page.\n\n- `searchTerm?: string`\n  Optional search term matched against issue title and publisher.\n\n### Returns\n\n- `{ items?: { coverImage?: string; description?: string; issueId?: number; publicationDate?: string; publisher?: string; seriesNumber?: number; stock?: object[]; title?: string; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n  Paginated result wrapping IssueDetailDTO items.\n\n  - `items?: { coverImage?: string; description?: string; issueId?: number; publicationDate?: string; publisher?: string; seriesNumber?: number; stock?: { availableQuantity?: number; condition?: string; price?: number; stockItemId?: number; }[]; title?: string; }[]`\n  - `page?: number`\n  - `pageSize?: number`\n  - `totalCount?: number`\n  - `totalPages?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst stocks = await client.stock.list();\n\nconsole.log(stocks);\n```",
  },
  {
    name: 'delete',
    endpoint: '/api/Stock/{id}',
    httpMethod: 'delete',
    summary: 'Delete a comic issue',
    description: 'Removes the issue and all its associated stock items. Irreversible.',
    stainlessPath: '(resource) stock > (method) delete',
    qualified: 'client.stock.delete',
    params: ['id: number;'],
    markdown:
      "## delete\n\n`client.stock.delete(id: number): void`\n\n**delete** `/api/Stock/{id}`\n\nRemoves the issue and all its associated stock items. Irreversible.\n\n### Parameters\n\n- `id: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nawait client.stock.delete(0)\n```",
  },
  {
    name: 'get_bestsellers',
    endpoint: '/api/Suggestions/bestsellers',
    httpMethod: 'get',
    summary: 'Get bestselling issue suggestions',
    description:
      'Returns the top N issues by units sold over the specified historical window. Useful for deciding which titles to restock proactively.',
    stainlessPath: '(resource) suggestions > (method) get_bestsellers',
    qualified: 'client.suggestions.getBestsellers',
    params: ['months?: number;', 'topN?: number;'],
    markdown:
      "## get_bestsellers\n\n`client.suggestions.getBestsellers(months?: number, topN?: number): void`\n\n**get** `/api/Suggestions/bestsellers`\n\nReturns the top N issues by units sold over the specified historical window. Useful for deciding which titles to restock proactively.\n\n### Parameters\n\n- `months?: number`\n  Number of months of sales history to use.\n\n- `topN?: number`\n  Number of bestsellers to return.\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nawait client.suggestions.getBestsellers()\n```",
  },
  {
    name: 'get_low_stock',
    endpoint: '/api/Suggestions/low-stock',
    httpMethod: 'get',
    summary: 'Get low-stock reorder suggestions',
    description:
      'Returns issues whose total available quantity is at or below `threshold`, ranked by recent sales velocity over the past `months`. Used by the Dashboard Low Stock tab to drive the supplier order creation flow.',
    stainlessPath: '(resource) suggestions > (method) get_low_stock',
    qualified: 'client.suggestions.getLowStock',
    params: ['months?: number;', 'threshold?: number;'],
    markdown:
      "## get_low_stock\n\n`client.suggestions.getLowStock(months?: number, threshold?: number): void`\n\n**get** `/api/Suggestions/low-stock`\n\nReturns issues whose total available quantity is at or below `threshold`, ranked by recent sales velocity over the past `months`. Used by the Dashboard Low Stock tab to drive the supplier order creation flow.\n\n### Parameters\n\n- `months?: number`\n  Number of months of sales history to weight the suggestion ranking.\n\n- `threshold?: number`\n  Maximum stock quantity to qualify as low-stock. Issues at or below this value are included.\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nawait client.suggestions.getLowStock()\n```",
  },
  {
    name: 'get_order_status_counts',
    endpoint: '/api/Summary/order-status-counts',
    httpMethod: 'get',
    summary: 'Get customer order counts grouped by status',
    description:
      'Returns a breakdown of customer orders by status (e.g. Pending, Shipped, Delivered, Cancelled). Used by the dashboard header status badges.',
    stainlessPath: '(resource) summary > (method) get_order_status_counts',
    qualified: 'client.summary.getOrderStatusCounts',
    response: '{ counts?: { count?: number; status?: string; }[]; }',
    markdown:
      "## get_order_status_counts\n\n`client.summary.getOrderStatusCounts(): { counts?: object[]; }`\n\n**get** `/api/Summary/order-status-counts`\n\nReturns a breakdown of customer orders by status (e.g. Pending, Shipped, Delivered, Cancelled). Used by the dashboard header status badges.\n\n### Returns\n\n- `{ counts?: { count?: number; status?: string; }[]; }`\n  Breakdown of customer order counts by status.\n\n  - `counts?: { count?: number; status?: string; }[]`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst response = await client.summary.getOrderStatusCounts();\n\nconsole.log(response);\n```",
  },
  {
    name: 'get_supplier_counts',
    endpoint: '/api/Summary/supplier-counts',
    httpMethod: 'get',
    summary: 'Get supplier entity counts',
    description:
      'Returns aggregate counts for suppliers, quotes, orders, and payments. Used by the Suppliers page header cards.',
    stainlessPath: '(resource) summary > (method) get_supplier_counts',
    qualified: 'client.summary.getSupplierCounts',
    response: '{ orders?: number; payments?: number; quotes?: number; suppliers?: number; }',
    markdown:
      "## get_supplier_counts\n\n`client.summary.getSupplierCounts(): { orders?: number; payments?: number; quotes?: number; suppliers?: number; }`\n\n**get** `/api/Summary/supplier-counts`\n\nReturns aggregate counts for suppliers, quotes, orders, and payments. Used by the Suppliers page header cards.\n\n### Returns\n\n- `{ orders?: number; payments?: number; quotes?: number; suppliers?: number; }`\n  Aggregate entity counts for the Suppliers section.\n\n  - `orders?: number`\n  - `payments?: number`\n  - `quotes?: number`\n  - `suppliers?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst response = await client.summary.getSupplierCounts();\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/api/Suppliers',
    httpMethod: 'post',
    summary: 'Create a new supplier',
    description: 'Create a new supplier',
    stainlessPath: '(resource) suppliers > (method) create',
    qualified: 'client.suppliers.create',
    params: [
      'city?: string;',
      'contactEmail?: string;',
      'contactNumber?: string;',
      'name?: string;',
      'referenceNumber?: string;',
    ],
    response:
      '{ city?: string; contactEmail?: string; contactNumber?: string; name?: string; referenceNumber?: string; supplierId?: number; }',
    markdown:
      "## create\n\n`client.suppliers.create(city?: string, contactEmail?: string, contactNumber?: string, name?: string, referenceNumber?: string): { city?: string; contactEmail?: string; contactNumber?: string; name?: string; referenceNumber?: string; supplierId?: number; }`\n\n**post** `/api/Suppliers`\n\nCreate a new supplier\n\n### Parameters\n\n- `city?: string`\n\n- `contactEmail?: string`\n\n- `contactNumber?: string`\n\n- `name?: string`\n  Supplier company name.\n\n- `referenceNumber?: string`\n  Internal or external reference code.\n\n### Returns\n\n- `{ city?: string; contactEmail?: string; contactNumber?: string; name?: string; referenceNumber?: string; supplierId?: number; }`\n  Supplier profile summary.\n\n  - `city?: string`\n  - `contactEmail?: string`\n  - `contactNumber?: string`\n  - `name?: string`\n  - `referenceNumber?: string`\n  - `supplierId?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst supplierSummary = await client.suppliers.create();\n\nconsole.log(supplierSummary);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/api/Suppliers/{id}',
    httpMethod: 'get',
    summary: 'Get a single supplier by ID',
    description: 'Get a single supplier by ID',
    stainlessPath: '(resource) suppliers > (method) retrieve',
    qualified: 'client.suppliers.retrieve',
    params: ['id: number;'],
    response:
      '{ city?: string; contactEmail?: string; contactNumber?: string; name?: string; referenceNumber?: string; supplierId?: number; }',
    markdown:
      "## retrieve\n\n`client.suppliers.retrieve(id: number): { city?: string; contactEmail?: string; contactNumber?: string; name?: string; referenceNumber?: string; supplierId?: number; }`\n\n**get** `/api/Suppliers/{id}`\n\nGet a single supplier by ID\n\n### Parameters\n\n- `id: number`\n\n### Returns\n\n- `{ city?: string; contactEmail?: string; contactNumber?: string; name?: string; referenceNumber?: string; supplierId?: number; }`\n  Supplier profile summary.\n\n  - `city?: string`\n  - `contactEmail?: string`\n  - `contactNumber?: string`\n  - `name?: string`\n  - `referenceNumber?: string`\n  - `supplierId?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst supplierSummary = await client.suppliers.retrieve(0);\n\nconsole.log(supplierSummary);\n```",
  },
  {
    name: 'update',
    endpoint: '/api/Suppliers/{id}',
    httpMethod: 'put',
    summary: "Update a supplier's details",
    description: "Update a supplier's details",
    stainlessPath: '(resource) suppliers > (method) update',
    qualified: 'client.suppliers.update',
    params: [
      'id: number;',
      'city?: string;',
      'contactEmail?: string;',
      'contactNumber?: string;',
      'name?: string;',
      'referenceNumber?: string;',
    ],
    response:
      '{ city?: string; contactEmail?: string; contactNumber?: string; name?: string; referenceNumber?: string; supplierId?: number; }',
    markdown:
      "## update\n\n`client.suppliers.update(id: number, city?: string, contactEmail?: string, contactNumber?: string, name?: string, referenceNumber?: string): { city?: string; contactEmail?: string; contactNumber?: string; name?: string; referenceNumber?: string; supplierId?: number; }`\n\n**put** `/api/Suppliers/{id}`\n\nUpdate a supplier's details\n\n### Parameters\n\n- `id: number`\n\n- `city?: string`\n\n- `contactEmail?: string`\n\n- `contactNumber?: string`\n\n- `name?: string`\n  Supplier company name.\n\n- `referenceNumber?: string`\n  Internal or external reference code.\n\n### Returns\n\n- `{ city?: string; contactEmail?: string; contactNumber?: string; name?: string; referenceNumber?: string; supplierId?: number; }`\n  Supplier profile summary.\n\n  - `city?: string`\n  - `contactEmail?: string`\n  - `contactNumber?: string`\n  - `name?: string`\n  - `referenceNumber?: string`\n  - `supplierId?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst supplierSummary = await client.suppliers.update(0);\n\nconsole.log(supplierSummary);\n```",
  },
  {
    name: 'list',
    endpoint: '/api/Suppliers',
    httpMethod: 'get',
    summary: 'List suppliers (paginated)',
    description: 'Returns a paginated list of comic book suppliers. Supports optional name/reference search.',
    stainlessPath: '(resource) suppliers > (method) list',
    qualified: 'client.suppliers.list',
    params: ['page?: number;', 'pageSize?: number;', 'searchTerm?: string;'],
    response:
      '{ items?: { city?: string; contactEmail?: string; contactNumber?: string; name?: string; referenceNumber?: string; supplierId?: number; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }',
    markdown:
      "## list\n\n`client.suppliers.list(page?: number, pageSize?: number, searchTerm?: string): { items?: supplier_summary[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n\n**get** `/api/Suppliers`\n\nReturns a paginated list of comic book suppliers. Supports optional name/reference search.\n\n### Parameters\n\n- `page?: number`\n  1-based page number.\n\n- `pageSize?: number`\n  Records per page.\n\n- `searchTerm?: string`\n  Optional search matched against supplier name and reference number.\n\n### Returns\n\n- `{ items?: { city?: string; contactEmail?: string; contactNumber?: string; name?: string; referenceNumber?: string; supplierId?: number; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n  Paginated result wrapping SupplierSummaryDTO items.\n\n  - `items?: { city?: string; contactEmail?: string; contactNumber?: string; name?: string; referenceNumber?: string; supplierId?: number; }[]`\n  - `page?: number`\n  - `pageSize?: number`\n  - `totalCount?: number`\n  - `totalPages?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst suppliers = await client.suppliers.list();\n\nconsole.log(suppliers);\n```",
  },
  {
    name: 'create_quote_request',
    endpoint: '/api/Suppliers/quote-requests',
    httpMethod: 'post',
    summary: 'Create pending quote requests for a supplier',
    description:
      'Creates `SupplierQuotes` rows with `Price = null` (pending) for the specified issues and supplier. These placeholder rows signal that a quote has been requested but not yet received. Returns the number of rows created.',
    stainlessPath: '(resource) suppliers > (method) create_quote_request',
    qualified: 'client.suppliers.createQuoteRequest',
    params: ['comment?: string;', 'issueIds?: number[];', 'supplierId?: number;'],
    response: 'number',
    markdown:
      "## create_quote_request\n\n`client.suppliers.createQuoteRequest(comment?: string, issueIds?: number[], supplierId?: number): number`\n\n**post** `/api/Suppliers/quote-requests`\n\nCreates `SupplierQuotes` rows with `Price = null` (pending) for the specified issues and supplier. These placeholder rows signal that a quote has been requested but not yet received. Returns the number of rows created.\n\n### Parameters\n\n- `comment?: string`\n  Optional note to attach to the quote request.\n\n- `issueIds?: number[]`\n  List of issue IDs for which quotes are requested.\n\n- `supplierId?: number`\n  ID of the supplier to request quotes from.\n\n### Returns\n\n- `number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst response = await client.suppliers.createQuoteRequest();\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/api/Suppliers/quotes/{quoteId}',
    httpMethod: 'get',
    summary: 'Get a single supplier quote by ID',
    description: 'Get a single supplier quote by ID',
    stainlessPath: '(resource) suppliers.quotes > (method) retrieve',
    qualified: 'client.suppliers.quotes.retrieve',
    params: ['quoteId: number;'],
    response:
      '{ condition?: string; issueId?: number; issueTitle?: string; price?: number; quoteId?: number; status?: string; }',
    markdown:
      "## retrieve\n\n`client.suppliers.quotes.retrieve(quoteId: number): { condition?: string; issueId?: number; issueTitle?: string; price?: number; quoteId?: number; status?: string; }`\n\n**get** `/api/Suppliers/quotes/{quoteId}`\n\nGet a single supplier quote by ID\n\n### Parameters\n\n- `quoteId: number`\n\n### Returns\n\n- `{ condition?: string; issueId?: number; issueTitle?: string; price?: number; quoteId?: number; status?: string; }`\n  Summary of a supplier price quote for one stock item.\n\n  - `condition?: string`\n  - `issueId?: number`\n  - `issueTitle?: string`\n  - `price?: number`\n  - `quoteId?: number`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst supplierQuoteSummary = await client.suppliers.quotes.retrieve(0);\n\nconsole.log(supplierQuoteSummary);\n```",
  },
  {
    name: 'update',
    endpoint: '/api/Suppliers/quotes/{quoteId}',
    httpMethod: 'put',
    summary: 'Update a supplier quote',
    description:
      "Updates an existing quote's price, condition, or effective date. Used when correcting a quote that was uploaded via CSV.",
    stainlessPath: '(resource) suppliers.quotes > (method) update',
    qualified: 'client.suppliers.quotes.update',
    params: [
      'quoteId: number;',
      'condition?: string;',
      'effectiveDate?: string;',
      'issueTitle?: string;',
      'price?: number;',
      'stockItemId?: number;',
    ],
    response:
      '{ condition?: string; issueId?: number; issueTitle?: string; price?: number; quoteId?: number; status?: string; }',
    markdown:
      "## update\n\n`client.suppliers.quotes.update(quoteId: number, condition?: string, effectiveDate?: string, issueTitle?: string, price?: number, stockItemId?: number): { condition?: string; issueId?: number; issueTitle?: string; price?: number; quoteId?: number; status?: string; }`\n\n**put** `/api/Suppliers/quotes/{quoteId}`\n\nUpdates an existing quote's price, condition, or effective date. Used when correcting a quote that was uploaded via CSV.\n\n### Parameters\n\n- `quoteId: number`\n\n- `condition?: string`\n\n- `effectiveDate?: string`\n  Date from which this price is valid.\n\n- `issueTitle?: string`\n\n- `price?: number`\n  Quoted price per unit (ZAR).\n\n- `stockItemId?: number`\n\n### Returns\n\n- `{ condition?: string; issueId?: number; issueTitle?: string; price?: number; quoteId?: number; status?: string; }`\n  Summary of a supplier price quote for one stock item.\n\n  - `condition?: string`\n  - `issueId?: number`\n  - `issueTitle?: string`\n  - `price?: number`\n  - `quoteId?: number`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst supplierQuoteSummary = await client.suppliers.quotes.update(0);\n\nconsole.log(supplierQuoteSummary);\n```",
  },
  {
    name: 'list',
    endpoint: '/api/Suppliers/quotes',
    httpMethod: 'get',
    summary: 'List all supplier quotes (grouped by supplier, paginated)',
    description:
      "Returns quotes grouped by supplier. Each group contains the supplier's most-recent quote per stock item. Supports search by issue title.",
    stainlessPath: '(resource) suppliers.quotes > (method) list',
    qualified: 'client.suppliers.quotes.list',
    params: ['page?: number;', 'pageSize?: number;', 'search?: string;'],
    response:
      '{ items?: { effectiveDate?: string; quotes?: object[]; supplierId?: number; supplierName?: string; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }',
    markdown:
      "## list\n\n`client.suppliers.quotes.list(page?: number, pageSize?: number, search?: string): { items?: object[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n\n**get** `/api/Suppliers/quotes`\n\nReturns quotes grouped by supplier. Each group contains the supplier's most-recent quote per stock item. Supports search by issue title.\n\n### Parameters\n\n- `page?: number`\n  1-based page number.\n\n- `pageSize?: number`\n  Records per page.\n\n- `search?: string`\n  Optional search matched against issue title.\n\n### Returns\n\n- `{ items?: { effectiveDate?: string; quotes?: object[]; supplierId?: number; supplierName?: string; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n  Paginated result wrapping SupplierGroupedQuoteSummaryDTO items.\n\n  - `items?: { effectiveDate?: string; quotes?: { condition?: string; issueId?: number; issueTitle?: string; price?: number; quoteId?: number; status?: string; }[]; supplierId?: number; supplierName?: string; }[]`\n  - `page?: number`\n  - `pageSize?: number`\n  - `totalCount?: number`\n  - `totalPages?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst quotes = await client.suppliers.quotes.list();\n\nconsole.log(quotes);\n```",
  },
  {
    name: 'fulfill',
    endpoint: '/api/Suppliers/quotes/{quoteId}/fulfill',
    httpMethod: 'put',
    summary: 'Fulfill a pending quote request by setting its price',
    description:
      'Sets the price on a previously pending quote (one created via `POST /quote-requests` with `Price = null`). This represents the supplier responding with a price for a requested stock item.',
    stainlessPath: '(resource) suppliers.quotes > (method) fulfill',
    qualified: 'client.suppliers.quotes.fulfill',
    params: ['quoteId: number;', 'price?: number;'],
    response:
      '{ condition?: string; issueId?: number; issueTitle?: string; price?: number; quoteId?: number; status?: string; }',
    markdown:
      "## fulfill\n\n`client.suppliers.quotes.fulfill(quoteId: number, price?: number): { condition?: string; issueId?: number; issueTitle?: string; price?: number; quoteId?: number; status?: string; }`\n\n**put** `/api/Suppliers/quotes/{quoteId}/fulfill`\n\nSets the price on a previously pending quote (one created via `POST /quote-requests` with `Price = null`). This represents the supplier responding with a price for a requested stock item.\n\n### Parameters\n\n- `quoteId: number`\n\n- `price?: number`\n  The quoted price per unit (in ZAR).\n\n### Returns\n\n- `{ condition?: string; issueId?: number; issueTitle?: string; price?: number; quoteId?: number; status?: string; }`\n  Summary of a supplier price quote for one stock item.\n\n  - `condition?: string`\n  - `issueId?: number`\n  - `issueTitle?: string`\n  - `price?: number`\n  - `quoteId?: number`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst supplierQuoteSummary = await client.suppliers.quotes.fulfill(0);\n\nconsole.log(supplierQuoteSummary);\n```",
  },
  {
    name: 'list_by_supplier',
    endpoint: '/api/Suppliers/{supplierId}/quotes',
    httpMethod: 'get',
    summary: 'List quotes for a specific supplier (paginated)',
    description: 'List quotes for a specific supplier (paginated)',
    stainlessPath: '(resource) suppliers.quotes > (method) list_by_supplier',
    qualified: 'client.suppliers.quotes.listBySupplier',
    params: ['supplierId: number;', 'page?: number;', 'pageSize?: number;'],
    response:
      '{ items?: { condition?: string; issueId?: number; issueTitle?: string; price?: number; quoteId?: number; status?: string; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }',
    markdown:
      "## list_by_supplier\n\n`client.suppliers.quotes.listBySupplier(supplierId: number, page?: number, pageSize?: number): { items?: supplier_quote_summary[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n\n**get** `/api/Suppliers/{supplierId}/quotes`\n\nList quotes for a specific supplier (paginated)\n\n### Parameters\n\n- `supplierId: number`\n\n- `page?: number`\n  1-based page number.\n\n- `pageSize?: number`\n  Records per page.\n\n### Returns\n\n- `{ items?: { condition?: string; issueId?: number; issueTitle?: string; price?: number; quoteId?: number; status?: string; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n  Paginated result wrapping SupplierQuoteSummaryDTO items.\n\n  - `items?: { condition?: string; issueId?: number; issueTitle?: string; price?: number; quoteId?: number; status?: string; }[]`\n  - `page?: number`\n  - `pageSize?: number`\n  - `totalCount?: number`\n  - `totalPages?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst response = await client.suppliers.quotes.listBySupplier(0);\n\nconsole.log(response);\n```",
  },
  {
    name: 'pending_count',
    endpoint: '/api/Suppliers/quotes/pending-count',
    httpMethod: 'get',
    summary: 'Get count of pending (unfulfilled) quote requests',
    description:
      'Returns the number of `SupplierQuotes` rows where `Price IS NULL`. Used to display the pending-quotes badge in the admin portal.',
    stainlessPath: '(resource) suppliers.quotes > (method) pending_count',
    qualified: 'client.suppliers.quotes.pendingCount',
    response: 'number',
    markdown:
      "## pending_count\n\n`client.suppliers.quotes.pendingCount(): number`\n\n**get** `/api/Suppliers/quotes/pending-count`\n\nReturns the number of `SupplierQuotes` rows where `Price IS NULL`. Used to display the pending-quotes badge in the admin portal.\n\n### Returns\n\n- `number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst response = await client.suppliers.quotes.pendingCount();\n\nconsole.log(response);\n```",
  },
  {
    name: 'save',
    endpoint: '/api/Suppliers/{supplierId}/quotes',
    httpMethod: 'post',
    summary: 'Save (batch-upsert) quotes for a supplier',
    description:
      'Accepts a list of quote rows (typically parsed from a CSV file) and upserts them for the supplier. The `supplierId` in the URL must match the `supplierId` in the request body.',
    stainlessPath: '(resource) suppliers.quotes > (method) save',
    qualified: 'client.suppliers.quotes.save',
    params: [
      'supplierId: number;',
      'quotes?: { condition?: string; effectiveDate?: string; issueTitle?: string; price?: number; stockItemId?: number; }[];',
      'supplierId?: number;',
    ],
    markdown:
      "## save\n\n`client.suppliers.quotes.save(supplierId: number, quotes?: { condition?: string; effectiveDate?: string; issueTitle?: string; price?: number; stockItemId?: number; }[], supplierId?: number): void`\n\n**post** `/api/Suppliers/{supplierId}/quotes`\n\nAccepts a list of quote rows (typically parsed from a CSV file) and upserts them for the supplier. The `supplierId` in the URL must match the `supplierId` in the request body.\n\n### Parameters\n\n- `supplierId: number`\n\n- `quotes?: { condition?: string; effectiveDate?: string; issueTitle?: string; price?: number; stockItemId?: number; }[]`\n  Parsed quote rows to upsert.\n\n- `supplierId?: number`\n  Must match the supplierId path parameter.\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nawait client.suppliers.quotes.save(0)\n```",
  },
  {
    name: 'create',
    endpoint: '/api/Suppliers/orders',
    httpMethod: 'post',
    summary: 'Create a new supplier restock order (→ Drafted)',
    description:
      'Creates a supplier order with status `Drafted`. Called once per supplier from the order creation wizard (Step 2). The client groups selected quotes by `supplierId` and calls this endpoint in parallel via `forkJoin`.\n\n**State machine entry point:** Drafted → Ordered → In Transit → Delivered',
    stainlessPath: '(resource) suppliers.orders > (method) create',
    qualified: 'client.suppliers.orders.create',
    params: [
      'comment?: string;',
      'lineItems?: { quantity?: number; stockItemId?: number; unitPrice?: number; }[];',
      'orderDate?: string;',
      'supplierId?: number;',
    ],
    response:
      '{ items?: { condition?: string; issueTitle?: string; itemTotalPrice?: number; quantity?: number; stockItemId?: number; unitPrice?: number; }[]; payment?: { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }; supplierOrderSummary?: { comment?: string; deliveryStatus?: string; orderDate?: string; orderId?: number; shipmentDate?: string; shippedReference?: string; supplierId?: number; supplierName?: string; total?: number; }; }',
    markdown:
      "## create\n\n`client.suppliers.orders.create(comment?: string, lineItems?: { quantity?: number; stockItemId?: number; unitPrice?: number; }[], orderDate?: string, supplierId?: number): { items?: object[]; payment?: supplier_payment_summary; supplierOrderSummary?: object; }`\n\n**post** `/api/Suppliers/orders`\n\nCreates a supplier order with status `Drafted`. Called once per supplier from the order creation wizard (Step 2). The client groups selected quotes by `supplierId` and calls this endpoint in parallel via `forkJoin`.\n\n**State machine entry point:** Drafted → Ordered → In Transit → Delivered\n\n### Parameters\n\n- `comment?: string`\n  Optional order-level note.\n\n- `lineItems?: { quantity?: number; stockItemId?: number; unitPrice?: number; }[]`\n  One or more line items (stock item + quantity + unit price).\n\n- `orderDate?: string`\n  Date the order is raised (ISO 8601).\n\n- `supplierId?: number`\n  Supplier to place the order with.\n\n### Returns\n\n- `{ items?: { condition?: string; issueTitle?: string; itemTotalPrice?: number; quantity?: number; stockItemId?: number; unitPrice?: number; }[]; payment?: { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }; supplierOrderSummary?: { comment?: string; deliveryStatus?: string; orderDate?: string; orderId?: number; shipmentDate?: string; shippedReference?: string; supplierId?: number; supplierName?: string; total?: number; }; }`\n  Full detail for a supplier restock order including summary, payment, and line items.\n\n  - `items?: { condition?: string; issueTitle?: string; itemTotalPrice?: number; quantity?: number; stockItemId?: number; unitPrice?: number; }[]`\n  - `payment?: { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }`\n  - `supplierOrderSummary?: { comment?: string; deliveryStatus?: string; orderDate?: string; orderId?: number; shipmentDate?: string; shippedReference?: string; supplierId?: number; supplierName?: string; total?: number; }`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst supplierOrderDetail = await client.suppliers.orders.create();\n\nconsole.log(supplierOrderDetail);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/api/Suppliers/orders/{orderId}',
    httpMethod: 'get',
    summary: 'Get a single supplier order by ID',
    description: 'Get a single supplier order by ID',
    stainlessPath: '(resource) suppliers.orders > (method) retrieve',
    qualified: 'client.suppliers.orders.retrieve',
    params: ['orderId: number;'],
    response:
      '{ items?: { condition?: string; issueTitle?: string; itemTotalPrice?: number; quantity?: number; stockItemId?: number; unitPrice?: number; }[]; payment?: { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }; supplierOrderSummary?: { comment?: string; deliveryStatus?: string; orderDate?: string; orderId?: number; shipmentDate?: string; shippedReference?: string; supplierId?: number; supplierName?: string; total?: number; }; }',
    markdown:
      "## retrieve\n\n`client.suppliers.orders.retrieve(orderId: number): { items?: object[]; payment?: supplier_payment_summary; supplierOrderSummary?: object; }`\n\n**get** `/api/Suppliers/orders/{orderId}`\n\nGet a single supplier order by ID\n\n### Parameters\n\n- `orderId: number`\n\n### Returns\n\n- `{ items?: { condition?: string; issueTitle?: string; itemTotalPrice?: number; quantity?: number; stockItemId?: number; unitPrice?: number; }[]; payment?: { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }; supplierOrderSummary?: { comment?: string; deliveryStatus?: string; orderDate?: string; orderId?: number; shipmentDate?: string; shippedReference?: string; supplierId?: number; supplierName?: string; total?: number; }; }`\n  Full detail for a supplier restock order including summary, payment, and line items.\n\n  - `items?: { condition?: string; issueTitle?: string; itemTotalPrice?: number; quantity?: number; stockItemId?: number; unitPrice?: number; }[]`\n  - `payment?: { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }`\n  - `supplierOrderSummary?: { comment?: string; deliveryStatus?: string; orderDate?: string; orderId?: number; shipmentDate?: string; shippedReference?: string; supplierId?: number; supplierName?: string; total?: number; }`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst supplierOrderDetail = await client.suppliers.orders.retrieve(0);\n\nconsole.log(supplierOrderDetail);\n```",
  },
  {
    name: 'update',
    endpoint: '/api/Suppliers/orders/{orderId}',
    httpMethod: 'put',
    summary: 'Update supplier order status / shipment info',
    description:
      'Advances the order through the state machine or records shipment details.\n\n**Allowed transitions:**\n- `Ordered → In Transit` (requires `shippedReference` and `shipmentDate`)\n- `Ordered → Cancelled`\n- `In Transit → Delivered` (requires actual `shipmentDate`)\n- `In Transit → Damaged` (requires `damageComment`)',
    stainlessPath: '(resource) suppliers.orders > (method) update',
    qualified: 'client.suppliers.orders.update',
    params: [
      'orderId: number;',
      'damageComment?: string;',
      'deliveryStatus?: string;',
      'shipmentDate?: string;',
      'shippedReference?: string;',
    ],
    markdown:
      "## update\n\n`client.suppliers.orders.update(orderId: number, damageComment?: string, deliveryStatus?: string, shipmentDate?: string, shippedReference?: string): void`\n\n**put** `/api/Suppliers/orders/{orderId}`\n\nAdvances the order through the state machine or records shipment details.\n\n**Allowed transitions:**\n- `Ordered → In Transit` (requires `shippedReference` and `shipmentDate`)\n- `Ordered → Cancelled`\n- `In Transit → Delivered` (requires actual `shipmentDate`)\n- `In Transit → Damaged` (requires `damageComment`)\n\n### Parameters\n\n- `orderId: number`\n\n- `damageComment?: string`\n  Required when transitioning to Damaged.\n\n- `deliveryStatus?: string`\n  New delivery status. Allowed: In Transit | Delivered | Cancelled | Damaged.\n\n- `shipmentDate?: string`\n  Expected shipment date (In Transit) or actual delivery date (Delivered). Format: YYYY-MM-DD.\n\n- `shippedReference?: string`\n  Required when transitioning to In Transit.\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nawait client.suppliers.orders.update(0)\n```",
  },
  {
    name: 'list',
    endpoint: '/api/Suppliers/orders',
    httpMethod: 'get',
    summary: 'List supplier restock orders (paginated, filterable)',
    description:
      "Returns all supplier orders. Optionally filter by status string (e.g. 'Drafted', 'Ordered', 'In Transit', 'Delivered') and search by supplier name.",
    stainlessPath: '(resource) suppliers.orders > (method) list',
    qualified: 'client.suppliers.orders.list',
    params: ['page?: number;', 'pageSize?: number;', 'searchTerm?: string;', 'status?: string;'],
    response:
      '{ items?: { items?: object[]; payment?: supplier_payment_summary; supplierOrderSummary?: object; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }',
    markdown:
      "## list\n\n`client.suppliers.orders.list(page?: number, pageSize?: number, searchTerm?: string, status?: string): { items?: supplier_order_detail[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n\n**get** `/api/Suppliers/orders`\n\nReturns all supplier orders. Optionally filter by status string (e.g. 'Drafted', 'Ordered', 'In Transit', 'Delivered') and search by supplier name.\n\n### Parameters\n\n- `page?: number`\n  1-based page number.\n\n- `pageSize?: number`\n  Records per page.\n\n- `searchTerm?: string`\n  Search matched against supplier name.\n\n- `status?: string`\n  Filter by delivery status. Allowed values: `Drafted`, `Ordered`, `In Transit`, `Delivered`, `Cancelled`, `Damaged`.\n\n### Returns\n\n- `{ items?: { items?: object[]; payment?: supplier_payment_summary; supplierOrderSummary?: object; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n  Paginated result wrapping SupplierOrderDetailDto items.\n\n  - `items?: { items?: { condition?: string; issueTitle?: string; itemTotalPrice?: number; quantity?: number; stockItemId?: number; unitPrice?: number; }[]; payment?: { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }; supplierOrderSummary?: { comment?: string; deliveryStatus?: string; orderDate?: string; orderId?: number; shipmentDate?: string; shippedReference?: string; supplierId?: number; supplierName?: string; total?: number; }; }[]`\n  - `page?: number`\n  - `pageSize?: number`\n  - `totalCount?: number`\n  - `totalPages?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst orders = await client.suppliers.orders.list();\n\nconsole.log(orders);\n```",
  },
  {
    name: 'confirm',
    endpoint: '/api/Suppliers/orders/{orderId}/confirm',
    httpMethod: 'put',
    summary: 'Confirm a drafted supplier order (Drafted → Ordered)',
    description:
      'Transitions a supplier order from `Drafted` to `Ordered`, indicating that the purchase order has been sent to the supplier.',
    stainlessPath: '(resource) suppliers.orders > (method) confirm',
    qualified: 'client.suppliers.orders.confirm',
    params: ['orderId: number;'],
    markdown:
      "## confirm\n\n`client.suppliers.orders.confirm(orderId: number): void`\n\n**put** `/api/Suppliers/orders/{orderId}/confirm`\n\nTransitions a supplier order from `Drafted` to `Ordered`, indicating that the purchase order has been sent to the supplier.\n\n### Parameters\n\n- `orderId: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nawait client.suppliers.orders.confirm(0)\n```",
  },
  {
    name: 'record_payment',
    endpoint: '/api/Suppliers/orders/{orderId}/payment',
    httpMethod: 'post',
    summary: 'Record a payment for a supplier order',
    description:
      'Creates a payment record linked to a supplier order. One order can have at most one payment. Typically called after the supplier invoice is settled.',
    stainlessPath: '(resource) suppliers.orders > (method) record_payment',
    qualified: 'client.suppliers.orders.recordPayment',
    params: ['orderId: number;', 'paymentReference?: string;', 'processedDate?: string;', 'total?: number;'],
    response:
      '{ paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }',
    markdown:
      "## record_payment\n\n`client.suppliers.orders.recordPayment(orderId: number, paymentReference?: string, processedDate?: string, total?: number): { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }`\n\n**post** `/api/Suppliers/orders/{orderId}/payment`\n\nCreates a payment record linked to a supplier order. One order can have at most one payment. Typically called after the supplier invoice is settled.\n\n### Parameters\n\n- `orderId: number`\n\n- `paymentReference?: string`\n  Bank or EFT reference number.\n\n- `processedDate?: string`\n  Date the payment was processed (ISO 8601).\n\n- `total?: number`\n  Total amount paid.\n\n### Returns\n\n- `{ paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }`\n  Summary of a payment made to a supplier for a restock order.\n\n  - `paymentId?: number`\n  - `paymentReference?: string`\n  - `processedDate?: string`\n  - `status?: string`\n  - `supplierName?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst supplierPaymentSummary = await client.suppliers.orders.recordPayment(0);\n\nconsole.log(supplierPaymentSummary);\n```",
  },
  {
    name: 'status_counts',
    endpoint: '/api/Suppliers/orders/status-counts',
    httpMethod: 'get',
    summary: 'Get supplier order counts grouped by status',
    description:
      'Returns a map of `{ status: count }` for all supplier orders. Used by the Suppliers page tab badges.',
    stainlessPath: '(resource) suppliers.orders > (method) status_counts',
    qualified: 'client.suppliers.orders.statusCounts',
    response: 'object',
    markdown:
      "## status_counts\n\n`client.suppliers.orders.statusCounts(): object`\n\n**get** `/api/Suppliers/orders/status-counts`\n\nReturns a map of `{ status: count }` for all supplier orders. Used by the Suppliers page tab badges.\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst response = await client.suppliers.orders.statusCounts();\n\nconsole.log(response);\n```",
  },
  {
    name: 'list_issues',
    endpoint: '/api/Suppliers/orders/creation/issues',
    httpMethod: 'get',
    summary: 'Get issues with available supplier quotes (order creation wizard — Step 1)',
    description:
      'Returns all comic issues that have at least one supplier quote, paginated. Each issue includes its available stock per condition and the latest quote per supplier per condition.\n\nIf `issueIds` is provided (e.g. from the Dashboard Low Stock flow), those issues are returned first and pre-selected in the UI.',
    stainlessPath: '(resource) suppliers.orders.creation > (method) list_issues',
    qualified: 'client.suppliers.orders.creation.listIssues',
    params: ['issueIds?: number[];', 'page?: number;', 'pageSize?: number;'],
    response:
      '{ items?: { availableStockPerCondition?: object[]; hasRecentQuotes?: boolean; imageUrl?: string; issueId?: string; issueTitle?: string; itemQuotes?: object[]; seriesNumber?: string; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }',
    markdown:
      "## list_issues\n\n`client.suppliers.orders.creation.listIssues(issueIds?: number[], page?: number, pageSize?: number): { items?: supplier_create_order_items[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n\n**get** `/api/Suppliers/orders/creation/issues`\n\nReturns all comic issues that have at least one supplier quote, paginated. Each issue includes its available stock per condition and the latest quote per supplier per condition.\n\nIf `issueIds` is provided (e.g. from the Dashboard Low Stock flow), those issues are returned first and pre-selected in the UI.\n\n### Parameters\n\n- `issueIds?: number[]`\n  Optional list of issue IDs to pre-filter and pre-select. Passed as repeated query params: `?issueIds=1&issueIds=2`.\n\n- `page?: number`\n  1-based page number.\n\n- `pageSize?: number`\n  Records per page.\n\n### Returns\n\n- `{ items?: { availableStockPerCondition?: object[]; hasRecentQuotes?: boolean; imageUrl?: string; issueId?: string; issueTitle?: string; itemQuotes?: object[]; seriesNumber?: string; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n  Paginated result wrapping SupplierCreateOrderItemsDTO items.\n\n  - `items?: { availableStockPerCondition?: { condition?: string; quantity?: number; }[]; hasRecentQuotes?: boolean; imageUrl?: string; issueId?: string; issueTitle?: string; itemQuotes?: { condition?: string; effectiveDate?: string; quotedPrice?: number; quoteId?: number; stockReferenceId?: number; supplierId?: number; supplierName?: string; }[]; seriesNumber?: string; }[]`\n  - `page?: number`\n  - `pageSize?: number`\n  - `totalCount?: number`\n  - `totalPages?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst response = await client.suppliers.orders.creation.listIssues();\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve_issue',
    endpoint: '/api/Suppliers/orders/creation/issue/{issueId}',
    httpMethod: 'get',
    summary: 'Get a single issue with quotes for the order creation wizard',
    description: 'Get a single issue with quotes for the order creation wizard',
    stainlessPath: '(resource) suppliers.orders.creation > (method) retrieve_issue',
    qualified: 'client.suppliers.orders.creation.retrieveIssue',
    params: ['issueId: number;'],
    response:
      '{ availableStockPerCondition?: { condition?: string; quantity?: number; }[]; hasRecentQuotes?: boolean; imageUrl?: string; issueId?: string; issueTitle?: string; itemQuotes?: { condition?: string; effectiveDate?: string; quotedPrice?: number; quoteId?: number; stockReferenceId?: number; supplierId?: number; supplierName?: string; }[]; seriesNumber?: string; }',
    markdown:
      "## retrieve_issue\n\n`client.suppliers.orders.creation.retrieveIssue(issueId: number): { availableStockPerCondition?: object[]; hasRecentQuotes?: boolean; imageUrl?: string; issueId?: string; issueTitle?: string; itemQuotes?: object[]; seriesNumber?: string; }`\n\n**get** `/api/Suppliers/orders/creation/issue/{issueId}`\n\nGet a single issue with quotes for the order creation wizard\n\n### Parameters\n\n- `issueId: number`\n\n### Returns\n\n- `{ availableStockPerCondition?: { condition?: string; quantity?: number; }[]; hasRecentQuotes?: boolean; imageUrl?: string; issueId?: string; issueTitle?: string; itemQuotes?: { condition?: string; effectiveDate?: string; quotedPrice?: number; quoteId?: number; stockReferenceId?: number; supplierId?: number; supplierName?: string; }[]; seriesNumber?: string; }`\n  An issue with its available stock per condition and latest supplier quotes. Used in Step 1 of the order creation wizard.\n\n  - `availableStockPerCondition?: { condition?: string; quantity?: number; }[]`\n  - `hasRecentQuotes?: boolean`\n  - `imageUrl?: string`\n  - `issueId?: string`\n  - `issueTitle?: string`\n  - `itemQuotes?: { condition?: string; effectiveDate?: string; quotedPrice?: number; quoteId?: number; stockReferenceId?: number; supplierId?: number; supplierName?: string; }[]`\n  - `seriesNumber?: string`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst supplierCreateOrderItems = await client.suppliers.orders.creation.retrieveIssue(0);\n\nconsole.log(supplierCreateOrderItems);\n```",
  },
  {
    name: 'list_previous_suppliers',
    endpoint: '/api/Suppliers/issues/{issueId}/previous-suppliers',
    httpMethod: 'get',
    summary: 'Get suppliers who have previously quoted a specific issue',
    description:
      'Returns all suppliers that have at least one `SupplierQuote` row for the given issue. Useful for pre-populating the supplier selection when creating a new quote request.',
    stainlessPath: '(resource) suppliers.issues > (method) list_previous_suppliers',
    qualified: 'client.suppliers.issues.listPreviousSuppliers',
    params: ['issueId: number;'],
    response:
      '{ city?: string; contactEmail?: string; contactNumber?: string; name?: string; referenceNumber?: string; supplierId?: number; }[]',
    markdown:
      "## list_previous_suppliers\n\n`client.suppliers.issues.listPreviousSuppliers(issueId: number): object[]`\n\n**get** `/api/Suppliers/issues/{issueId}/previous-suppliers`\n\nReturns all suppliers that have at least one `SupplierQuote` row for the given issue. Useful for pre-populating the supplier selection when creating a new quote request.\n\n### Parameters\n\n- `issueId: number`\n\n### Returns\n\n- `{ city?: string; contactEmail?: string; contactNumber?: string; name?: string; referenceNumber?: string; supplierId?: number; }[]`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst supplierSummaries = await client.suppliers.issues.listPreviousSuppliers(0);\n\nconsole.log(supplierSummaries);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/api/Suppliers/payments/{id}',
    httpMethod: 'get',
    summary: 'Get a single supplier payment by ID',
    description: 'Get a single supplier payment by ID',
    stainlessPath: '(resource) suppliers.payments > (method) retrieve',
    qualified: 'client.suppliers.payments.retrieve',
    params: ['id: number;'],
    response:
      '{ paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }',
    markdown:
      "## retrieve\n\n`client.suppliers.payments.retrieve(id: number): { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }`\n\n**get** `/api/Suppliers/payments/{id}`\n\nGet a single supplier payment by ID\n\n### Parameters\n\n- `id: number`\n\n### Returns\n\n- `{ paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }`\n  Summary of a payment made to a supplier for a restock order.\n\n  - `paymentId?: number`\n  - `paymentReference?: string`\n  - `processedDate?: string`\n  - `status?: string`\n  - `supplierName?: string`\n  - `total?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst supplierPaymentSummary = await client.suppliers.payments.retrieve(0);\n\nconsole.log(supplierPaymentSummary);\n```",
  },
  {
    name: 'list',
    endpoint: '/api/Suppliers/payments',
    httpMethod: 'get',
    summary: 'List all supplier payments (paginated)',
    description: 'List all supplier payments (paginated)',
    stainlessPath: '(resource) suppliers.payments > (method) list',
    qualified: 'client.suppliers.payments.list',
    params: ['page?: number;', 'pageSize?: number;'],
    response:
      '{ items?: { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }',
    markdown:
      "## list\n\n`client.suppliers.payments.list(page?: number, pageSize?: number): { items?: supplier_payment_summary[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n\n**get** `/api/Suppliers/payments`\n\nList all supplier payments (paginated)\n\n### Parameters\n\n- `page?: number`\n  1-based page number.\n\n- `pageSize?: number`\n  Records per page.\n\n### Returns\n\n- `{ items?: { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n  Paginated result wrapping SupplierPaymentSummaryDTO items.\n\n  - `items?: { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }[]`\n  - `page?: number`\n  - `pageSize?: number`\n  - `totalCount?: number`\n  - `totalPages?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst supplierPaymentSummaryPagedResult = await client.suppliers.payments.list();\n\nconsole.log(supplierPaymentSummaryPagedResult);\n```",
  },
  {
    name: 'list_by_order',
    endpoint: '/api/Suppliers/payments/order/{orderId}',
    httpMethod: 'get',
    summary: 'List payments for a specific supplier order (paginated)',
    description: 'List payments for a specific supplier order (paginated)',
    stainlessPath: '(resource) suppliers.payments > (method) list_by_order',
    qualified: 'client.suppliers.payments.listByOrder',
    params: ['orderId: number;', 'page?: number;', 'pageSize?: number;'],
    response:
      '{ items?: { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }',
    markdown:
      "## list_by_order\n\n`client.suppliers.payments.listByOrder(orderId: number, page?: number, pageSize?: number): { items?: supplier_payment_summary[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n\n**get** `/api/Suppliers/payments/order/{orderId}`\n\nList payments for a specific supplier order (paginated)\n\n### Parameters\n\n- `orderId: number`\n\n- `page?: number`\n  1-based page number.\n\n- `pageSize?: number`\n  Records per page.\n\n### Returns\n\n- `{ items?: { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n  Paginated result wrapping SupplierPaymentSummaryDTO items.\n\n  - `items?: { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }[]`\n  - `page?: number`\n  - `pageSize?: number`\n  - `totalCount?: number`\n  - `totalPages?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst supplierPaymentSummaryPagedResult = await client.suppliers.payments.listByOrder(0);\n\nconsole.log(supplierPaymentSummaryPagedResult);\n```",
  },
  {
    name: 'list_by_supplier',
    endpoint: '/api/Suppliers/payments/supplier/{supplierId}',
    httpMethod: 'get',
    summary: 'List payments for a specific supplier (paginated)',
    description: 'List payments for a specific supplier (paginated)',
    stainlessPath: '(resource) suppliers.payments > (method) list_by_supplier',
    qualified: 'client.suppliers.payments.listBySupplier',
    params: ['supplierId: number;', 'page?: number;', 'pageSize?: number;'],
    response:
      '{ items?: { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }',
    markdown:
      "## list_by_supplier\n\n`client.suppliers.payments.listBySupplier(supplierId: number, page?: number, pageSize?: number): { items?: supplier_payment_summary[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n\n**get** `/api/Suppliers/payments/supplier/{supplierId}`\n\nList payments for a specific supplier (paginated)\n\n### Parameters\n\n- `supplierId: number`\n\n- `page?: number`\n  1-based page number.\n\n- `pageSize?: number`\n  Records per page.\n\n### Returns\n\n- `{ items?: { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n  Paginated result wrapping SupplierPaymentSummaryDTO items.\n\n  - `items?: { paymentId?: number; paymentReference?: string; processedDate?: string; status?: string; supplierName?: string; total?: number; }[]`\n  - `page?: number`\n  - `pageSize?: number`\n  - `totalCount?: number`\n  - `totalPages?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst supplierPaymentSummaryPagedResult = await client.suppliers.payments.listBySupplier(0);\n\nconsole.log(supplierPaymentSummaryPagedResult);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/api/Vouchers/{id}',
    httpMethod: 'get',
    summary: 'Get a single voucher by ID',
    description: 'Get a single voucher by ID',
    stainlessPath: '(resource) vouchers > (method) retrieve',
    qualified: 'client.vouchers.retrieve',
    params: ['id: number;'],
    response:
      '{ customerOrderId?: number; dateIssued?: string; dateRedeemed?: string; value?: number; voucherId?: number; voucherNumber?: string; }',
    markdown:
      "## retrieve\n\n`client.vouchers.retrieve(id: number): { customerOrderId?: number; dateIssued?: string; dateRedeemed?: string; value?: number; voucherId?: number; voucherNumber?: string; }`\n\n**get** `/api/Vouchers/{id}`\n\nGet a single voucher by ID\n\n### Parameters\n\n- `id: number`\n\n### Returns\n\n- `{ customerOrderId?: number; dateIssued?: string; dateRedeemed?: string; value?: number; voucherId?: number; voucherNumber?: string; }`\n  Discount voucher details.\n\n  - `customerOrderId?: number`\n  - `dateIssued?: string`\n  - `dateRedeemed?: string`\n  - `value?: number`\n  - `voucherId?: number`\n  - `voucherNumber?: string`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst voucher = await client.vouchers.retrieve(0);\n\nconsole.log(voucher);\n```",
  },
  {
    name: 'list',
    endpoint: '/api/Vouchers',
    httpMethod: 'get',
    summary: 'List vouchers (paginated)',
    description:
      'Returns a paginated list of discount vouchers. Supports optional search by voucher number or customer name.',
    stainlessPath: '(resource) vouchers > (method) list',
    qualified: 'client.vouchers.list',
    params: ['page?: number;', 'pageSize?: number;', 'searchTerm?: string;'],
    response:
      '{ items?: { email?: string; firstName?: string; lastName?: string; title?: string; userId?: number; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }',
    markdown:
      "## list\n\n`client.vouchers.list(page?: number, pageSize?: number, searchTerm?: string): { items?: user_details[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n\n**get** `/api/Vouchers`\n\nReturns a paginated list of discount vouchers. Supports optional search by voucher number or customer name.\n\n### Parameters\n\n- `page?: number`\n  1-based page number.\n\n- `pageSize?: number`\n  Records per page.\n\n- `searchTerm?: string`\n  Optional search matched against voucher number or customer details.\n\n### Returns\n\n- `{ items?: { email?: string; firstName?: string; lastName?: string; title?: string; userId?: number; }[]; page?: number; pageSize?: number; totalCount?: number; totalPages?: number; }`\n  Paginated result wrapping UserDetailsDTO items.\n\n  - `items?: { email?: string; firstName?: string; lastName?: string; title?: string; userId?: number; }[]`\n  - `page?: number`\n  - `pageSize?: number`\n  - `totalCount?: number`\n  - `totalPages?: number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst userDetailsPagedResult = await client.vouchers.list();\n\nconsole.log(userDetailsPagedResult);\n```",
  },
  {
    name: 'expired',
    endpoint: '/api/Vouchers/expired',
    httpMethod: 'get',
    summary: 'Get total number of expired vouchers',
    description: 'Get total number of expired vouchers',
    stainlessPath: '(resource) vouchers > (method) expired',
    qualified: 'client.vouchers.expired',
    response: 'number',
    markdown:
      "## expired\n\n`client.vouchers.expired(): number`\n\n**get** `/api/Vouchers/expired`\n\nGet total number of expired vouchers\n\n### Returns\n\n- `number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst response = await client.vouchers.expired();\n\nconsole.log(response);\n```",
  },
  {
    name: 'total_issued',
    endpoint: '/api/Vouchers/total-issued',
    httpMethod: 'get',
    summary: 'Get total number of vouchers ever issued',
    description: 'Get total number of vouchers ever issued',
    stainlessPath: '(resource) vouchers > (method) total_issued',
    qualified: 'client.vouchers.totalIssued',
    response: 'number',
    markdown:
      "## total_issued\n\n`client.vouchers.totalIssued(): number`\n\n**get** `/api/Vouchers/total-issued`\n\nGet total number of vouchers ever issued\n\n### Returns\n\n- `number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst response = await client.vouchers.totalIssued();\n\nconsole.log(response);\n```",
  },
  {
    name: 'total_redeemed',
    endpoint: '/api/Vouchers/total-redeemed',
    httpMethod: 'get',
    summary: 'Get total number of redeemed vouchers',
    description: 'Get total number of redeemed vouchers',
    stainlessPath: '(resource) vouchers > (method) total_redeemed',
    qualified: 'client.vouchers.totalRedeemed',
    response: 'number',
    markdown:
      "## total_redeemed\n\n`client.vouchers.totalRedeemed(): number`\n\n**get** `/api/Vouchers/total-redeemed`\n\nGet total number of redeemed vouchers\n\n### Returns\n\n- `number`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst response = await client.vouchers.totalRedeemed();\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/api/WeatherForecast',
    httpMethod: 'get',
    summary: 'Scaffolding weather forecast endpoint (not used)',
    description: 'Scaffolding weather forecast endpoint (not used)',
    stainlessPath: '(resource) weather_forecast > (method) retrieve',
    qualified: 'client.weatherForecast.retrieve',
    response: '{ date?: string; summary?: string; temperatureC?: number; temperatureF?: number; }[]',
    markdown:
      "## retrieve\n\n`client.weatherForecast.retrieve(): { date?: string; summary?: string; temperatureC?: number; temperatureF?: number; }[]`\n\n**get** `/api/WeatherForecast`\n\nScaffolding weather forecast endpoint (not used)\n\n### Returns\n\n- `{ date?: string; summary?: string; temperatureC?: number; temperatureF?: number; }[]`\n\n### Example\n\n```typescript\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock();\n\nconst weatherForecasts = await client.weatherForecast.retrieve();\n\nconsole.log(weatherForecasts);\n```",
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
