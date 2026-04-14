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
    perLanguage: {
      cli: {
        method: 'analysis retrieve',
        example: "comicstockmcp analysis retrieve \\\n  --api-key 'My API Key' \\\n  --issue-id 0",
      },
      go: {
        method: 'client.Analysis.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Analysis.Get(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tcomicstockmcp.AnalysisGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/analysis/$ISSUE_ID \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.analysis.retrieve',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.analysis.retrieve(0);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'comics_scraper fetch',
        example: "comicstockmcp comics-scraper fetch \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.ComicsScraper.Fetch',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.ComicsScraper.Fetch(context.TODO(), comicstockmcp.ComicsScraperFetchParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/comics-scraper \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.comicsScraper.fetch',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.comicsScraper.fetch();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'customers list',
        example: "comicstockmcp customers list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Customers.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tuserDetailsPagedResult, err := client.Customers.List(context.TODO(), comicstockmcp.CustomerListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", userDetailsPagedResult.Items)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Customers \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.customers.list',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst userDetailsPagedResult = await client.customers.list();\n\nconsole.log(userDetailsPagedResult.items);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'customers retrieve',
        example: "comicstockmcp customers retrieve \\\n  --api-key 'My API Key' \\\n  --id 0",
      },
      go: {
        method: 'client.Customers.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tuserDetails, err := client.Customers.Get(context.TODO(), 0)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", userDetails.Email)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Customers/$ID \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.customers.retrieve',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst userDetails = await client.customers.retrieve(0);\n\nconsole.log(userDetails.email);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'dashboard get_recent_orders',
        example: "comicstockmcp dashboard get-recent-orders \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Dashboard.GetRecentOrders',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\torderSummaries, err := client.Dashboard.GetRecentOrders(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", orderSummaries)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Dashboard/orders \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.dashboard.getRecentOrders',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst orderSummaries = await client.dashboard.getRecentOrders();\n\nconsole.log(orderSummaries);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'dashboard get_recent_users',
        example: "comicstockmcp dashboard get-recent-users \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Dashboard.GetRecentUsers',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Dashboard.GetRecentUsers(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Dashboard/users \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.dashboard.getRecentUsers',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.dashboard.getRecentUsers();\n\nconsole.log(response);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'dashboard get_stock_snapshot',
        example: "comicstockmcp dashboard get-stock-snapshot \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Dashboard.GetStockSnapshot',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tissueDetails, err := client.Dashboard.GetStockSnapshot(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", issueDetails)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Dashboard/stock \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.dashboard.getStockSnapshot',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst issueDetails = await client.dashboard.getStockSnapshot();\n\nconsole.log(issueDetails);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'dashboard get_order_trends',
        example: "comicstockmcp dashboard get-order-trends \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Dashboard.GetOrderTrends',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\torderTrend, err := client.Dashboard.GetOrderTrends(context.TODO(), comicstockmcp.DashboardGetOrderTrendsParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", orderTrend.DataPoints)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Dashboard/order-trends \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.dashboard.getOrderTrends',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst orderTrend = await client.dashboard.getOrderTrends();\n\nconsole.log(orderTrend.dataPoints);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'dashboard get_unfulfilled_orders_count',
        example: "comicstockmcp dashboard get-unfulfilled-orders-count \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Dashboard.GetUnfulfilledOrdersCount',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\torderTrend, err := client.Dashboard.GetUnfulfilledOrdersCount(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", orderTrend.DataPoints)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Dashboard/unfulfilled-orders \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.dashboard.getUnfulfilledOrdersCount',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst orderTrend = await client.dashboard.getUnfulfilledOrdersCount();\n\nconsole.log(orderTrend.dataPoints);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'dashboard get_pending_payments_count',
        example: "comicstockmcp dashboard get-pending-payments-count \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Dashboard.GetPendingPaymentsCount',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\torderTrend, err := client.Dashboard.GetPendingPaymentsCount(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", orderTrend.DataPoints)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Dashboard/pending-payments \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.dashboard.getPendingPaymentsCount',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst orderTrend = await client.dashboard.getPendingPaymentsCount();\n\nconsole.log(orderTrend.dataPoints);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'dashboard get_older_orders_count',
        example: "comicstockmcp dashboard get-older-orders-count \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Dashboard.GetOlderOrdersCount',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\torderTrend, err := client.Dashboard.GetOlderOrdersCount(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", orderTrend.DataPoints)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Dashboard/older-orders \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.dashboard.getOlderOrdersCount',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst orderTrend = await client.dashboard.getOlderOrdersCount();\n\nconsole.log(orderTrend.dataPoints);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'dashboard get_orders_expected_today_count',
        example: "comicstockmcp dashboard get-orders-expected-today-count \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Dashboard.GetOrdersExpectedTodayCount',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\torderTrend, err := client.Dashboard.GetOrdersExpectedTodayCount(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", orderTrend.DataPoints)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Dashboard/orders-expected-today \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.dashboard.getOrdersExpectedTodayCount',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst orderTrend = await client.dashboard.getOrdersExpectedTodayCount();\n\nconsole.log(orderTrend.dataPoints);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'dashboard get_overdue_orders_count',
        example: "comicstockmcp dashboard get-overdue-orders-count \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Dashboard.GetOverdueOrdersCount',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\torderTrend, err := client.Dashboard.GetOverdueOrdersCount(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", orderTrend.DataPoints)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Dashboard/orders-overdue \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.dashboard.getOverdueOrdersCount',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst orderTrend = await client.dashboard.getOverdueOrdersCount();\n\nconsole.log(orderTrend.dataPoints);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'avg_order_value get',
        example: "comicstockmcp dashboard:avg-order-value get \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Dashboard.AvgOrderValue.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\torderTrend, err := client.Dashboard.AvgOrderValue.Get(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", orderTrend.DataPoints)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Dashboard/avg-order-value \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.dashboard.avgOrderValue.get',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst orderTrend = await client.dashboard.avgOrderValue.get();\n\nconsole.log(orderTrend.dataPoints);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'avg_order_value get_by_customer',
        example:
          "comicstockmcp dashboard:avg-order-value get-by-customer \\\n  --api-key 'My API Key' \\\n  --id 0",
      },
      go: {
        method: 'client.Dashboard.AvgOrderValue.GetByCustomer',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\torderTrend, err := client.Dashboard.AvgOrderValue.GetByCustomer(context.TODO(), 0)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", orderTrend.DataPoints)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Dashboard/avg-order-value/$ID \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.dashboard.avgOrderValue.getByCustomer',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst orderTrend = await client.dashboard.avgOrderValue.getByCustomer(0);\n\nconsole.log(orderTrend.dataPoints);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'email send',
        example: "comicstockmcp email send \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Email.Send',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Email.Send(context.TODO(), comicstockmcp.EmailSendParams{\n\t\tSendEmail: comicstockmcp.SendEmailParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          "curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Email/send \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $COMICSTOCKMCP_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.email.send',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.email.send();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'email send_newsletter',
        example: "comicstockmcp email send-newsletter \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Email.SendNewsletter',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Email.SendNewsletter(context.TODO(), comicstockmcp.EmailSendNewsletterParams{\n\t\tSendEmail: comicstockmcp.SendEmailParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          "curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Email/send-newsletter \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $COMICSTOCKMCP_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.email.sendNewsletter',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.email.sendNewsletter();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'fulfillment update_status',
        example: "comicstockmcp fulfillment update-status \\\n  --api-key 'My API Key' \\\n  --id 0",
      },
      go: {
        method: 'client.Fulfillment.UpdateStatus',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Fulfillment.UpdateStatus(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tcomicstockmcp.FulfillmentUpdateStatusParams{\n\t\t\tUpdateOrderStatus: comicstockmcp.UpdateOrderStatusParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          "curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Fulfillment/$ID/status \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $COMICSTOCKMCP_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.fulfillment.updateStatus',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.fulfillment.updateStatus(0);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'issue_analysis retrieve',
        example: "comicstockmcp issue-analysis retrieve \\\n  --api-key 'My API Key' \\\n  --issue-id 0",
      },
      go: {
        method: 'client.IssueAnalysis.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.IssueAnalysis.Get(context.TODO(), 0)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/issue-analysis/$ISSUE_ID \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.issueAnalysis.retrieve',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.issueAnalysis.retrieve(0);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'issue_search search',
        example: "comicstockmcp issue-search search \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.IssueSearch.Search',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.IssueSearch.Search(context.TODO(), comicstockmcp.IssueSearchSearchParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/issue-search \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.issueSearch.search',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.issueSearch.search();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'orders list',
        example: "comicstockmcp orders list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Orders.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\torders, err := client.Orders.List(context.TODO(), comicstockmcp.OrderListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", orders.Orders)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Orders \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.orders.list',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst orders = await client.orders.list();\n\nconsole.log(orders.orders);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'orders retrieve',
        example: "comicstockmcp orders retrieve \\\n  --api-key 'My API Key' \\\n  --id 0",
      },
      go: {
        method: 'client.Orders.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\torder, err := client.Orders.Get(context.TODO(), 0)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", order.TotalPaid)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Orders/$ID \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.orders.retrieve',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst order = await client.orders.retrieve(0);\n\nconsole.log(order.totalPaid);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'orders update_status',
        example: "comicstockmcp orders update-status \\\n  --api-key 'My API Key' \\\n  --id 0",
      },
      go: {
        method: 'client.Orders.UpdateStatus',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Orders.UpdateStatus(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tcomicstockmcp.OrderUpdateStatusParams{\n\t\t\tUpdateOrderStatus: comicstockmcp.UpdateOrderStatusParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          "curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Orders/$ID/status \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $COMICSTOCKMCP_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.orders.updateStatus',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.orders.updateStatus(0);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'orders update_items',
        example: "comicstockmcp orders update-items \\\n  --api-key 'My API Key' \\\n  --id 0",
      },
      go: {
        method: 'client.Orders.UpdateItems',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Orders.UpdateItems(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tcomicstockmcp.OrderUpdateItemsParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          "curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Orders/$ID/items \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $COMICSTOCKMCP_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.orders.updateItems',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.orders.updateItems(0);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'stock list',
        example: "comicstockmcp stock list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Stock.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tstocks, err := client.Stock.List(context.TODO(), comicstockmcp.StockListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", stocks.Items)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Stock \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.stock.list',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst stocks = await client.stock.list();\n\nconsole.log(stocks.items);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'stock create',
        example: "comicstockmcp stock create \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Stock.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tissueDetail, err := client.Stock.New(context.TODO(), comicstockmcp.StockNewParams{\n\t\tIssueRequest: comicstockmcp.IssueRequestParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", issueDetail.CoverImage)\n}\n',
      },
      http: {
        example:
          "curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Stock \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $COMICSTOCKMCP_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.stock.create',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst issueDetail = await client.stock.create();\n\nconsole.log(issueDetail.coverImage);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'stock retrieve',
        example: "comicstockmcp stock retrieve \\\n  --api-key 'My API Key' \\\n  --id 0",
      },
      go: {
        method: 'client.Stock.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tissueDetail, err := client.Stock.Get(context.TODO(), 0)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", issueDetail.CoverImage)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Stock/$ID \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.stock.retrieve',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst issueDetail = await client.stock.retrieve(0);\n\nconsole.log(issueDetail.coverImage);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'stock update',
        example: "comicstockmcp stock update \\\n  --api-key 'My API Key' \\\n  --id 0",
      },
      go: {
        method: 'client.Stock.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tissueDetail, err := client.Stock.Update(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tcomicstockmcp.StockUpdateParams{\n\t\t\tIssueRequest: comicstockmcp.IssueRequestParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", issueDetail.CoverImage)\n}\n',
      },
      http: {
        example:
          "curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Stock/$ID \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $COMICSTOCKMCP_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.stock.update',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst issueDetail = await client.stock.update(0);\n\nconsole.log(issueDetail.coverImage);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'stock delete',
        example: "comicstockmcp stock delete \\\n  --api-key 'My API Key' \\\n  --id 0",
      },
      go: {
        method: 'client.Stock.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Stock.Delete(context.TODO(), 0)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Stock/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.stock.delete',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.stock.delete(0);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'suggestions get_low_stock',
        example: "comicstockmcp suggestions get-low-stock \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Suggestions.GetLowStock',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Suggestions.GetLowStock(context.TODO(), comicstockmcp.SuggestionGetLowStockParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suggestions/low-stock \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suggestions.getLowStock',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.suggestions.getLowStock();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'suggestions get_bestsellers',
        example: "comicstockmcp suggestions get-bestsellers \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Suggestions.GetBestsellers',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Suggestions.GetBestsellers(context.TODO(), comicstockmcp.SuggestionGetBestsellersParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suggestions/bestsellers \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suggestions.getBestsellers',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.suggestions.getBestsellers();",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'summary get_order_status_counts',
        example: "comicstockmcp summary get-order-status-counts \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Summary.GetOrderStatusCounts',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Summary.GetOrderStatusCounts(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Counts)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Summary/order-status-counts \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.summary.getOrderStatusCounts',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.summary.getOrderStatusCounts();\n\nconsole.log(response.counts);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'summary get_supplier_counts',
        example: "comicstockmcp summary get-supplier-counts \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Summary.GetSupplierCounts',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Summary.GetSupplierCounts(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Orders)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Summary/supplier-counts \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.summary.getSupplierCounts',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.summary.getSupplierCounts();\n\nconsole.log(response.orders);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'suppliers list',
        example: "comicstockmcp suppliers list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Suppliers.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsuppliers, err := client.Suppliers.List(context.TODO(), comicstockmcp.SupplierListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", suppliers.Items)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.list',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst suppliers = await client.suppliers.list();\n\nconsole.log(suppliers.items);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'suppliers create',
        example: "comicstockmcp suppliers create \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Suppliers.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsupplierSummary, err := client.Suppliers.New(context.TODO(), comicstockmcp.SupplierNewParams{\n\t\tSupplierRequest: comicstockmcp.SupplierRequestParam{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", supplierSummary.City)\n}\n',
      },
      http: {
        example:
          "curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $COMICSTOCKMCP_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.suppliers.create',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst supplierSummary = await client.suppliers.create();\n\nconsole.log(supplierSummary.city);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'suppliers retrieve',
        example: "comicstockmcp suppliers retrieve \\\n  --api-key 'My API Key' \\\n  --id 0",
      },
      go: {
        method: 'client.Suppliers.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsupplierSummary, err := client.Suppliers.Get(context.TODO(), 0)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", supplierSummary.City)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/$ID \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.retrieve',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst supplierSummary = await client.suppliers.retrieve(0);\n\nconsole.log(supplierSummary.city);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'suppliers update',
        example: "comicstockmcp suppliers update \\\n  --api-key 'My API Key' \\\n  --id 0",
      },
      go: {
        method: 'client.Suppliers.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsupplierSummary, err := client.Suppliers.Update(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tcomicstockmcp.SupplierUpdateParams{\n\t\t\tSupplierRequest: comicstockmcp.SupplierRequestParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", supplierSummary.City)\n}\n',
      },
      http: {
        example:
          "curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/$ID \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $COMICSTOCKMCP_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.suppliers.update',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst supplierSummary = await client.suppliers.update(0);\n\nconsole.log(supplierSummary.city);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'suppliers create_quote_request',
        example: "comicstockmcp suppliers create-quote-request \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Suppliers.NewQuoteRequest',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Suppliers.NewQuoteRequest(context.TODO(), comicstockmcp.SupplierNewQuoteRequestParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          "curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/quote-requests \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $COMICSTOCKMCP_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.suppliers.createQuoteRequest',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.suppliers.createQuoteRequest();\n\nconsole.log(response);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'quotes list',
        example: "comicstockmcp suppliers:quotes list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Suppliers.Quotes.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tquotes, err := client.Suppliers.Quotes.List(context.TODO(), comicstockmcp.SupplierQuoteListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", quotes.Items)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/quotes \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.quotes.list',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst quotes = await client.suppliers.quotes.list();\n\nconsole.log(quotes.items);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'quotes retrieve',
        example: "comicstockmcp suppliers:quotes retrieve \\\n  --api-key 'My API Key' \\\n  --quote-id 0",
      },
      go: {
        method: 'client.Suppliers.Quotes.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsupplierQuoteSummary, err := client.Suppliers.Quotes.Get(context.TODO(), 0)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", supplierQuoteSummary.Condition)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/quotes/$QUOTE_ID \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.quotes.retrieve',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst supplierQuoteSummary = await client.suppliers.quotes.retrieve(0);\n\nconsole.log(supplierQuoteSummary.condition);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'quotes update',
        example: "comicstockmcp suppliers:quotes update \\\n  --api-key 'My API Key' \\\n  --quote-id 0",
      },
      go: {
        method: 'client.Suppliers.Quotes.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsupplierQuoteSummary, err := client.Suppliers.Quotes.Update(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tcomicstockmcp.SupplierQuoteUpdateParams{\n\t\t\tSupplierQuoteCsvRow: comicstockmcp.SupplierQuoteCsvRowParam{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", supplierQuoteSummary.Condition)\n}\n',
      },
      http: {
        example:
          "curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/quotes/$QUOTE_ID \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $COMICSTOCKMCP_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.suppliers.quotes.update',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst supplierQuoteSummary = await client.suppliers.quotes.update(0);\n\nconsole.log(supplierQuoteSummary.condition);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'quotes list_by_supplier',
        example:
          "comicstockmcp suppliers:quotes list-by-supplier \\\n  --api-key 'My API Key' \\\n  --supplier-id 0",
      },
      go: {
        method: 'client.Suppliers.Quotes.ListBySupplier',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Suppliers.Quotes.ListBySupplier(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tcomicstockmcp.SupplierQuoteListBySupplierParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Items)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/$SUPPLIER_ID/quotes \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.quotes.listBySupplier',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.suppliers.quotes.listBySupplier(0);\n\nconsole.log(response.items);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'quotes save',
        example: "comicstockmcp suppliers:quotes save \\\n  --api-key 'My API Key' \\\n  --supplier-id 0",
      },
      go: {
        method: 'client.Suppliers.Quotes.Save',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Suppliers.Quotes.Save(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tcomicstockmcp.SupplierQuoteSaveParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          "curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/$SUPPLIER_ID/quotes \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $COMICSTOCKMCP_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.suppliers.quotes.save',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.suppliers.quotes.save(0);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'quotes fulfill',
        example: "comicstockmcp suppliers:quotes fulfill \\\n  --api-key 'My API Key' \\\n  --quote-id 0",
      },
      go: {
        method: 'client.Suppliers.Quotes.Fulfill',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsupplierQuoteSummary, err := client.Suppliers.Quotes.Fulfill(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tcomicstockmcp.SupplierQuoteFulfillParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", supplierQuoteSummary.Condition)\n}\n',
      },
      http: {
        example:
          "curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/quotes/$QUOTE_ID/fulfill \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $COMICSTOCKMCP_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.suppliers.quotes.fulfill',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst supplierQuoteSummary = await client.suppliers.quotes.fulfill(0);\n\nconsole.log(supplierQuoteSummary.condition);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'quotes pending_count',
        example: "comicstockmcp suppliers:quotes pending-count \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Suppliers.Quotes.PendingCount',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Suppliers.Quotes.PendingCount(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/quotes/pending-count \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.quotes.pendingCount',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.suppliers.quotes.pendingCount();\n\nconsole.log(response);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'orders create',
        example: "comicstockmcp suppliers:orders create \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Suppliers.Orders.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsupplierOrderDetail, err := client.Suppliers.Orders.New(context.TODO(), comicstockmcp.SupplierOrderNewParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", supplierOrderDetail.Items)\n}\n',
      },
      http: {
        example:
          "curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/orders \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $COMICSTOCKMCP_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.suppliers.orders.create',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst supplierOrderDetail = await client.suppliers.orders.create();\n\nconsole.log(supplierOrderDetail.items);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'orders list',
        example: "comicstockmcp suppliers:orders list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Suppliers.Orders.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\torders, err := client.Suppliers.Orders.List(context.TODO(), comicstockmcp.SupplierOrderListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", orders.Items)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/orders \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.orders.list',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst orders = await client.suppliers.orders.list();\n\nconsole.log(orders.items);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'orders status_counts',
        example: "comicstockmcp suppliers:orders status-counts \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Suppliers.Orders.StatusCounts',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Suppliers.Orders.StatusCounts(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/orders/status-counts \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.orders.statusCounts',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.suppliers.orders.statusCounts();\n\nconsole.log(response);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'orders retrieve',
        example: "comicstockmcp suppliers:orders retrieve \\\n  --api-key 'My API Key' \\\n  --order-id 0",
      },
      go: {
        method: 'client.Suppliers.Orders.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsupplierOrderDetail, err := client.Suppliers.Orders.Get(context.TODO(), 0)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", supplierOrderDetail.Items)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/orders/$ORDER_ID \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.orders.retrieve',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst supplierOrderDetail = await client.suppliers.orders.retrieve(0);\n\nconsole.log(supplierOrderDetail.items);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'orders update',
        example: "comicstockmcp suppliers:orders update \\\n  --api-key 'My API Key' \\\n  --order-id 0",
      },
      go: {
        method: 'client.Suppliers.Orders.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Suppliers.Orders.Update(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tcomicstockmcp.SupplierOrderUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          "curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/orders/$ORDER_ID \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $COMICSTOCKMCP_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.suppliers.orders.update',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.suppliers.orders.update(0);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'orders confirm',
        example: "comicstockmcp suppliers:orders confirm \\\n  --api-key 'My API Key' \\\n  --order-id 0",
      },
      go: {
        method: 'client.Suppliers.Orders.Confirm',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Suppliers.Orders.Confirm(context.TODO(), 0)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/orders/$ORDER_ID/confirm \\\n    -X PUT \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.orders.confirm',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.suppliers.orders.confirm(0);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'orders record_payment',
        example:
          "comicstockmcp suppliers:orders record-payment \\\n  --api-key 'My API Key' \\\n  --order-id 0",
      },
      go: {
        method: 'client.Suppliers.Orders.RecordPayment',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsupplierPaymentSummary, err := client.Suppliers.Orders.RecordPayment(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tcomicstockmcp.SupplierOrderRecordPaymentParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", supplierPaymentSummary.PaymentID)\n}\n',
      },
      http: {
        example:
          "curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/orders/$ORDER_ID/payment \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $COMICSTOCKMCP_API_KEY\" \\\n    -d '{}'",
      },
      typescript: {
        method: 'client.suppliers.orders.recordPayment',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst supplierPaymentSummary = await client.suppliers.orders.recordPayment(0);\n\nconsole.log(supplierPaymentSummary.paymentId);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'creation list_issues',
        example: "comicstockmcp suppliers:orders:creation list-issues \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Suppliers.Orders.Creation.ListIssues',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Suppliers.Orders.Creation.ListIssues(context.TODO(), comicstockmcp.SupplierOrderCreationListIssuesParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Items)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/orders/creation/issues \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.orders.creation.listIssues',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.suppliers.orders.creation.listIssues();\n\nconsole.log(response.items);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'creation retrieve_issue',
        example:
          "comicstockmcp suppliers:orders:creation retrieve-issue \\\n  --api-key 'My API Key' \\\n  --issue-id 0",
      },
      go: {
        method: 'client.Suppliers.Orders.Creation.GetIssue',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsupplierCreateOrderItems, err := client.Suppliers.Orders.Creation.GetIssue(context.TODO(), 0)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", supplierCreateOrderItems.AvailableStockPerCondition)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/orders/creation/issue/$ISSUE_ID \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.orders.creation.retrieveIssue',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst supplierCreateOrderItems = await client.suppliers.orders.creation.retrieveIssue(0);\n\nconsole.log(supplierCreateOrderItems.availableStockPerCondition);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'issues list_previous_suppliers',
        example:
          "comicstockmcp suppliers:issues list-previous-suppliers \\\n  --api-key 'My API Key' \\\n  --issue-id 0",
      },
      go: {
        method: 'client.Suppliers.Issues.ListPreviousSuppliers',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsupplierSummaries, err := client.Suppliers.Issues.ListPreviousSuppliers(context.TODO(), 0)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", supplierSummaries)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/issues/$ISSUE_ID/previous-suppliers \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.issues.listPreviousSuppliers',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst supplierSummaries = await client.suppliers.issues.listPreviousSuppliers(0);\n\nconsole.log(supplierSummaries);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'payments list',
        example: "comicstockmcp suppliers:payments list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Suppliers.Payments.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsupplierPaymentSummaryPagedResult, err := client.Suppliers.Payments.List(context.TODO(), comicstockmcp.SupplierPaymentListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", supplierPaymentSummaryPagedResult.Items)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/payments \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.payments.list',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst supplierPaymentSummaryPagedResult = await client.suppliers.payments.list();\n\nconsole.log(supplierPaymentSummaryPagedResult.items);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'payments retrieve',
        example: "comicstockmcp suppliers:payments retrieve \\\n  --api-key 'My API Key' \\\n  --id 0",
      },
      go: {
        method: 'client.Suppliers.Payments.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsupplierPaymentSummary, err := client.Suppliers.Payments.Get(context.TODO(), 0)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", supplierPaymentSummary.PaymentID)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/payments/$ID \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.payments.retrieve',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst supplierPaymentSummary = await client.suppliers.payments.retrieve(0);\n\nconsole.log(supplierPaymentSummary.paymentId);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'payments list_by_supplier',
        example:
          "comicstockmcp suppliers:payments list-by-supplier \\\n  --api-key 'My API Key' \\\n  --supplier-id 0",
      },
      go: {
        method: 'client.Suppliers.Payments.ListBySupplier',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsupplierPaymentSummaryPagedResult, err := client.Suppliers.Payments.ListBySupplier(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tcomicstockmcp.SupplierPaymentListBySupplierParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", supplierPaymentSummaryPagedResult.Items)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/payments/supplier/$SUPPLIER_ID \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.payments.listBySupplier',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst supplierPaymentSummaryPagedResult = await client.suppliers.payments.listBySupplier(0);\n\nconsole.log(supplierPaymentSummaryPagedResult.items);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'payments list_by_order',
        example:
          "comicstockmcp suppliers:payments list-by-order \\\n  --api-key 'My API Key' \\\n  --order-id 0",
      },
      go: {
        method: 'client.Suppliers.Payments.ListByOrder',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsupplierPaymentSummaryPagedResult, err := client.Suppliers.Payments.ListByOrder(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tcomicstockmcp.SupplierPaymentListByOrderParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", supplierPaymentSummaryPagedResult.Items)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Suppliers/payments/order/$ORDER_ID \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.suppliers.payments.listByOrder',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst supplierPaymentSummaryPagedResult = await client.suppliers.payments.listByOrder(0);\n\nconsole.log(supplierPaymentSummaryPagedResult.items);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'vouchers retrieve',
        example: "comicstockmcp vouchers retrieve \\\n  --api-key 'My API Key' \\\n  --id 0",
      },
      go: {
        method: 'client.Vouchers.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tvoucher, err := client.Vouchers.Get(context.TODO(), 0)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", voucher.CustomerOrderID)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Vouchers/$ID \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.vouchers.retrieve',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst voucher = await client.vouchers.retrieve(0);\n\nconsole.log(voucher.customerOrderId);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'vouchers list',
        example: "comicstockmcp vouchers list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Vouchers.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tuserDetailsPagedResult, err := client.Vouchers.List(context.TODO(), comicstockmcp.VoucherListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", userDetailsPagedResult.Items)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Vouchers \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.vouchers.list',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst userDetailsPagedResult = await client.vouchers.list();\n\nconsole.log(userDetailsPagedResult.items);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'vouchers total_issued',
        example: "comicstockmcp vouchers total-issued \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Vouchers.TotalIssued',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Vouchers.TotalIssued(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Vouchers/total-issued \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.vouchers.totalIssued',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.vouchers.totalIssued();\n\nconsole.log(response);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'vouchers total_redeemed',
        example: "comicstockmcp vouchers total-redeemed \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Vouchers.TotalRedeemed',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Vouchers.TotalRedeemed(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Vouchers/total-redeemed \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.vouchers.totalRedeemed',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.vouchers.totalRedeemed();\n\nconsole.log(response);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'vouchers expired',
        example: "comicstockmcp vouchers expired \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Vouchers.Expired',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Vouchers.Expired(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/Vouchers/expired \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.vouchers.expired',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.vouchers.expired();\n\nconsole.log(response);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'weather_forecast retrieve',
        example: "comicstockmcp weather-forecast retrieve \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.WeatherForecast.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tweatherForecasts, err := client.WeatherForecast.Get(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", weatherForecasts)\n}\n',
      },
      http: {
        example:
          'curl https://zacasandboxlokia001.ashysky-3e644c9a.southafricanorth.azurecontainerapps.io/api/WeatherForecast \\\n    -H "Authorization: Bearer $COMICSTOCKMCP_API_KEY"',
      },
      typescript: {
        method: 'client.weatherForecast.retrieve',
        example:
          "import ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nconst weatherForecasts = await client.weatherForecast.retrieve();\n\nconsole.log(weatherForecasts);",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'go',
    content:
      '# Comic Stock Go API Library\n\n<a href="https://pkg.go.dev/github.com/stainless-sdks/comicstockmcp-go"><img src="https://pkg.go.dev/badge/github.com/stainless-sdks/comicstockmcp-go.svg" alt="Go Reference"></a>\n\nThe Comic Stock Go library provides convenient access to the Comic Stock REST API\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Comic Stock MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=comicstockmcp-mcp&config=eyJuYW1lIjoiY29taWNzdG9ja21jcC1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9jb21pY3N0b2NrbWNwLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7IngtY29taWNzdG9ja21jcC1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22comicstockmcp-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fcomicstockmcp.stlmcp.com%22%2C%22headers%22%3A%7B%22x-comicstockmcp-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n\n\n```go\nimport (\n\t"github.com/stainless-sdks/comicstockmcp-go" // imported as SDK_PackageName\n)\n```\n\n\n\nOr to pin the version:\n\n\n\n```sh\ngo get -u \'github.com/stainless-sdks/comicstockmcp-go@v0.0.1\'\n```\n\n\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\n\t"github.com/stainless-sdks/comicstockmcp-go"\n\t"github.com/stainless-sdks/comicstockmcp-go/option"\n)\n\nfunc main() {\n\tclient := comicstockmcp.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("COMICSTOCKMCP_API_KEY")\n\t)\n\terr := client.Analysis.Get(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tcomicstockmcp.AnalysisGetParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Analysis.Get(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/stainless-sdks/comicstockmcp-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\nerr := client.Analysis.Get(\n\tcontext.TODO(),\n\t0,\n\tcomicstockmcp.AnalysisGetParams{},\n)\nif err != nil {\n\tvar apierr *comicstockmcp.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/api/analysis/{issueId}": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Analysis.Get(\n\tctx,\n\t0,\n\tcomicstockmcp.AnalysisGetParams{},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := comicstockmcp.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Analysis.Get(\n\tcontext.TODO(),\n\t0,\n\tcomicstockmcp.AnalysisGetParams{},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nerr := client.Analysis.Get(\n\tcontext.TODO(),\n\t0,\n\tcomicstockmcp.AnalysisGetParams{},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nnull\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/stainless-sdks/comicstockmcp-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Comic Stock TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/comicstockmcp.svg?label=npm%20(stable))](https://npmjs.org/package/comicstockmcp) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/comicstockmcp)\n\nThis library provides convenient access to the Comic Stock REST API from server-side TypeScript or JavaScript.\n\n\n\nThe full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Comic Stock MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=comicstockmcp-mcp&config=eyJuYW1lIjoiY29taWNzdG9ja21jcC1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly9jb21pY3N0b2NrbWNwLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7IngtY29taWNzdG9ja21jcC1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22comicstockmcp-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fcomicstockmcp.stlmcp.com%22%2C%22headers%22%3A%7B%22x-comicstockmcp-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install comicstockmcp\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.analysis.retrieve(0);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  apiKey: process.env['COMICSTOCKMCP_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.analysis.retrieve(0);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst response = await client.analysis.retrieve(0).catch(async (err) => {\n  if (err instanceof ComicStock.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new ComicStock({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.analysis.retrieve(0, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new ComicStock({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.analysis.retrieve(0, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new ComicStock();\n\nconst response = await client.analysis.retrieve(0).asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: result, response: raw } = await client.analysis.retrieve(0).withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(result);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `COMIC_STOCK_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport ComicStock from 'comicstockmcp';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new ComicStock({\n  logger: logger.child({ name: 'ComicStock' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.analysis.retrieve({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport ComicStock from 'comicstockmcp';\nimport fetch from 'my-fetch';\n\nconst client = new ComicStock({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport ComicStock from 'comicstockmcp';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new ComicStock({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport ComicStock from 'comicstockmcp';\n\nconst client = new ComicStock({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport ComicStock from 'npm:comicstockmcp';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new ComicStock({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/AbdulDavids/comicstockmcp-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
  {
    language: 'cli',
    content:
      "# Comic Stock CLI\n\nThe official CLI for the Comic Stock REST API.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## Installation\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/stainless-sdks/comicstockmcp-cli/cmd/comicstockmcp@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\ncomicstockmcp [resource] <command> [flags...]\n~~~\n\n~~~sh\ncomicstockmcp analysis retrieve \\\n  --api-key 'My API Key' \\\n  --issue-id 0\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable    | Required | Default value |\n| ----------------------- | -------- | ------------- |\n| `COMICSTOCKMCP_API_KEY` | no       | `null`        |\n\n### Global flags\n\n- `--api-key` (can also be set with `COMICSTOCKMCP_API_KEY` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\ncomicstockmcp <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\ncomicstockmcp <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\ncomicstockmcp <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\ncomicstockmcp <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\ncomicstockmcp <command> --arg @data://file.txt\n~~~\n\n## Linking different Go SDK versions\n\nYou can link the CLI against a different version of the Comic Stock Go SDK\nfor development purposes using the `./scripts/link` script.\n\nTo link to a specific version from a repository (version can be a branch,\ngit tag, or commit hash):\n\n~~~bash\n./scripts/link github.com/org/repo@version\n~~~\n\nTo link to a local copy of the SDK:\n\n~~~bash\n./scripts/link ../path/to/comicstockmcp-go\n~~~\n\nIf you run the link script without any arguments, it will default to `../comicstockmcp-go`.\n",
  },
];

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
