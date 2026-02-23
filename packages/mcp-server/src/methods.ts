// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.analysis.retrieve',
    fullyQualifiedName: 'analysis.retrieve',
    httpMethod: 'get',
    httpPath: '/api/analysis/{issueId}',
  },
  {
    clientCallName: 'client.comicsScraper.fetch',
    fullyQualifiedName: 'comicsScraper.fetch',
    httpMethod: 'get',
    httpPath: '/api/comics-scraper',
  },
  {
    clientCallName: 'client.customers.retrieve',
    fullyQualifiedName: 'customers.retrieve',
    httpMethod: 'get',
    httpPath: '/api/Customers/{id}',
  },
  {
    clientCallName: 'client.customers.list',
    fullyQualifiedName: 'customers.list',
    httpMethod: 'get',
    httpPath: '/api/Customers',
  },
  {
    clientCallName: 'client.dashboard.getOlderOrdersCount',
    fullyQualifiedName: 'dashboard.getOlderOrdersCount',
    httpMethod: 'get',
    httpPath: '/api/Dashboard/older-orders',
  },
  {
    clientCallName: 'client.dashboard.getOrderTrends',
    fullyQualifiedName: 'dashboard.getOrderTrends',
    httpMethod: 'get',
    httpPath: '/api/Dashboard/order-trends',
  },
  {
    clientCallName: 'client.dashboard.getOrdersExpectedTodayCount',
    fullyQualifiedName: 'dashboard.getOrdersExpectedTodayCount',
    httpMethod: 'get',
    httpPath: '/api/Dashboard/orders-expected-today',
  },
  {
    clientCallName: 'client.dashboard.getOverdueOrdersCount',
    fullyQualifiedName: 'dashboard.getOverdueOrdersCount',
    httpMethod: 'get',
    httpPath: '/api/Dashboard/orders-overdue',
  },
  {
    clientCallName: 'client.dashboard.getPendingPaymentsCount',
    fullyQualifiedName: 'dashboard.getPendingPaymentsCount',
    httpMethod: 'get',
    httpPath: '/api/Dashboard/pending-payments',
  },
  {
    clientCallName: 'client.dashboard.getRecentOrders',
    fullyQualifiedName: 'dashboard.getRecentOrders',
    httpMethod: 'get',
    httpPath: '/api/Dashboard/orders',
  },
  {
    clientCallName: 'client.dashboard.getRecentUsers',
    fullyQualifiedName: 'dashboard.getRecentUsers',
    httpMethod: 'get',
    httpPath: '/api/Dashboard/users',
  },
  {
    clientCallName: 'client.dashboard.getStockSnapshot',
    fullyQualifiedName: 'dashboard.getStockSnapshot',
    httpMethod: 'get',
    httpPath: '/api/Dashboard/stock',
  },
  {
    clientCallName: 'client.dashboard.getUnfulfilledOrdersCount',
    fullyQualifiedName: 'dashboard.getUnfulfilledOrdersCount',
    httpMethod: 'get',
    httpPath: '/api/Dashboard/unfulfilled-orders',
  },
  {
    clientCallName: 'client.dashboard.avgOrderValue.get',
    fullyQualifiedName: 'dashboard.avgOrderValue.get',
    httpMethod: 'get',
    httpPath: '/api/Dashboard/avg-order-value',
  },
  {
    clientCallName: 'client.dashboard.avgOrderValue.getByCustomer',
    fullyQualifiedName: 'dashboard.avgOrderValue.getByCustomer',
    httpMethod: 'get',
    httpPath: '/api/Dashboard/avg-order-value/{id}',
  },
  {
    clientCallName: 'client.email.send',
    fullyQualifiedName: 'email.send',
    httpMethod: 'post',
    httpPath: '/api/Email/send',
  },
  {
    clientCallName: 'client.email.sendNewsletter',
    fullyQualifiedName: 'email.sendNewsletter',
    httpMethod: 'post',
    httpPath: '/api/Email/send-newsletter',
  },
  {
    clientCallName: 'client.fulfillment.updateStatus',
    fullyQualifiedName: 'fulfillment.updateStatus',
    httpMethod: 'put',
    httpPath: '/api/Fulfillment/{id}/status',
  },
  {
    clientCallName: 'client.issueAnalysis.retrieve',
    fullyQualifiedName: 'issueAnalysis.retrieve',
    httpMethod: 'get',
    httpPath: '/api/issue-analysis/{issueId}',
  },
  {
    clientCallName: 'client.issueSearch.search',
    fullyQualifiedName: 'issueSearch.search',
    httpMethod: 'get',
    httpPath: '/api/issue-search',
  },
  {
    clientCallName: 'client.orders.retrieve',
    fullyQualifiedName: 'orders.retrieve',
    httpMethod: 'get',
    httpPath: '/api/Orders/{id}',
  },
  {
    clientCallName: 'client.orders.list',
    fullyQualifiedName: 'orders.list',
    httpMethod: 'get',
    httpPath: '/api/Orders',
  },
  {
    clientCallName: 'client.orders.updateItems',
    fullyQualifiedName: 'orders.updateItems',
    httpMethod: 'put',
    httpPath: '/api/Orders/{id}/items',
  },
  {
    clientCallName: 'client.orders.updateStatus',
    fullyQualifiedName: 'orders.updateStatus',
    httpMethod: 'put',
    httpPath: '/api/Orders/{id}/status',
  },
  {
    clientCallName: 'client.stock.create',
    fullyQualifiedName: 'stock.create',
    httpMethod: 'post',
    httpPath: '/api/Stock',
  },
  {
    clientCallName: 'client.stock.retrieve',
    fullyQualifiedName: 'stock.retrieve',
    httpMethod: 'get',
    httpPath: '/api/Stock/{id}',
  },
  {
    clientCallName: 'client.stock.update',
    fullyQualifiedName: 'stock.update',
    httpMethod: 'put',
    httpPath: '/api/Stock/{id}',
  },
  {
    clientCallName: 'client.stock.list',
    fullyQualifiedName: 'stock.list',
    httpMethod: 'get',
    httpPath: '/api/Stock',
  },
  {
    clientCallName: 'client.stock.delete',
    fullyQualifiedName: 'stock.delete',
    httpMethod: 'delete',
    httpPath: '/api/Stock/{id}',
  },
  {
    clientCallName: 'client.suggestions.getBestsellers',
    fullyQualifiedName: 'suggestions.getBestsellers',
    httpMethod: 'get',
    httpPath: '/api/Suggestions/bestsellers',
  },
  {
    clientCallName: 'client.suggestions.getLowStock',
    fullyQualifiedName: 'suggestions.getLowStock',
    httpMethod: 'get',
    httpPath: '/api/Suggestions/low-stock',
  },
  {
    clientCallName: 'client.summary.getOrderStatusCounts',
    fullyQualifiedName: 'summary.getOrderStatusCounts',
    httpMethod: 'get',
    httpPath: '/api/Summary/order-status-counts',
  },
  {
    clientCallName: 'client.summary.getSupplierCounts',
    fullyQualifiedName: 'summary.getSupplierCounts',
    httpMethod: 'get',
    httpPath: '/api/Summary/supplier-counts',
  },
  {
    clientCallName: 'client.suppliers.create',
    fullyQualifiedName: 'suppliers.create',
    httpMethod: 'post',
    httpPath: '/api/Suppliers',
  },
  {
    clientCallName: 'client.suppliers.retrieve',
    fullyQualifiedName: 'suppliers.retrieve',
    httpMethod: 'get',
    httpPath: '/api/Suppliers/{id}',
  },
  {
    clientCallName: 'client.suppliers.update',
    fullyQualifiedName: 'suppliers.update',
    httpMethod: 'put',
    httpPath: '/api/Suppliers/{id}',
  },
  {
    clientCallName: 'client.suppliers.list',
    fullyQualifiedName: 'suppliers.list',
    httpMethod: 'get',
    httpPath: '/api/Suppliers',
  },
  {
    clientCallName: 'client.suppliers.createQuoteRequest',
    fullyQualifiedName: 'suppliers.createQuoteRequest',
    httpMethod: 'post',
    httpPath: '/api/Suppliers/quote-requests',
  },
  {
    clientCallName: 'client.suppliers.quotes.retrieve',
    fullyQualifiedName: 'suppliers.quotes.retrieve',
    httpMethod: 'get',
    httpPath: '/api/Suppliers/quotes/{quoteId}',
  },
  {
    clientCallName: 'client.suppliers.quotes.update',
    fullyQualifiedName: 'suppliers.quotes.update',
    httpMethod: 'put',
    httpPath: '/api/Suppliers/quotes/{quoteId}',
  },
  {
    clientCallName: 'client.suppliers.quotes.list',
    fullyQualifiedName: 'suppliers.quotes.list',
    httpMethod: 'get',
    httpPath: '/api/Suppliers/quotes',
  },
  {
    clientCallName: 'client.suppliers.quotes.fulfill',
    fullyQualifiedName: 'suppliers.quotes.fulfill',
    httpMethod: 'put',
    httpPath: '/api/Suppliers/quotes/{quoteId}/fulfill',
  },
  {
    clientCallName: 'client.suppliers.quotes.listBySupplier',
    fullyQualifiedName: 'suppliers.quotes.listBySupplier',
    httpMethod: 'get',
    httpPath: '/api/Suppliers/{supplierId}/quotes',
  },
  {
    clientCallName: 'client.suppliers.quotes.pendingCount',
    fullyQualifiedName: 'suppliers.quotes.pendingCount',
    httpMethod: 'get',
    httpPath: '/api/Suppliers/quotes/pending-count',
  },
  {
    clientCallName: 'client.suppliers.quotes.save',
    fullyQualifiedName: 'suppliers.quotes.save',
    httpMethod: 'post',
    httpPath: '/api/Suppliers/{supplierId}/quotes',
  },
  {
    clientCallName: 'client.suppliers.orders.create',
    fullyQualifiedName: 'suppliers.orders.create',
    httpMethod: 'post',
    httpPath: '/api/Suppliers/orders',
  },
  {
    clientCallName: 'client.suppliers.orders.retrieve',
    fullyQualifiedName: 'suppliers.orders.retrieve',
    httpMethod: 'get',
    httpPath: '/api/Suppliers/orders/{orderId}',
  },
  {
    clientCallName: 'client.suppliers.orders.update',
    fullyQualifiedName: 'suppliers.orders.update',
    httpMethod: 'put',
    httpPath: '/api/Suppliers/orders/{orderId}',
  },
  {
    clientCallName: 'client.suppliers.orders.list',
    fullyQualifiedName: 'suppliers.orders.list',
    httpMethod: 'get',
    httpPath: '/api/Suppliers/orders',
  },
  {
    clientCallName: 'client.suppliers.orders.confirm',
    fullyQualifiedName: 'suppliers.orders.confirm',
    httpMethod: 'put',
    httpPath: '/api/Suppliers/orders/{orderId}/confirm',
  },
  {
    clientCallName: 'client.suppliers.orders.recordPayment',
    fullyQualifiedName: 'suppliers.orders.recordPayment',
    httpMethod: 'post',
    httpPath: '/api/Suppliers/orders/{orderId}/payment',
  },
  {
    clientCallName: 'client.suppliers.orders.statusCounts',
    fullyQualifiedName: 'suppliers.orders.statusCounts',
    httpMethod: 'get',
    httpPath: '/api/Suppliers/orders/status-counts',
  },
  {
    clientCallName: 'client.suppliers.orders.creation.listIssues',
    fullyQualifiedName: 'suppliers.orders.creation.listIssues',
    httpMethod: 'get',
    httpPath: '/api/Suppliers/orders/creation/issues',
  },
  {
    clientCallName: 'client.suppliers.orders.creation.retrieveIssue',
    fullyQualifiedName: 'suppliers.orders.creation.retrieveIssue',
    httpMethod: 'get',
    httpPath: '/api/Suppliers/orders/creation/issue/{issueId}',
  },
  {
    clientCallName: 'client.suppliers.issues.listPreviousSuppliers',
    fullyQualifiedName: 'suppliers.issues.listPreviousSuppliers',
    httpMethod: 'get',
    httpPath: '/api/Suppliers/issues/{issueId}/previous-suppliers',
  },
  {
    clientCallName: 'client.suppliers.payments.retrieve',
    fullyQualifiedName: 'suppliers.payments.retrieve',
    httpMethod: 'get',
    httpPath: '/api/Suppliers/payments/{id}',
  },
  {
    clientCallName: 'client.suppliers.payments.list',
    fullyQualifiedName: 'suppliers.payments.list',
    httpMethod: 'get',
    httpPath: '/api/Suppliers/payments',
  },
  {
    clientCallName: 'client.suppliers.payments.listByOrder',
    fullyQualifiedName: 'suppliers.payments.listByOrder',
    httpMethod: 'get',
    httpPath: '/api/Suppliers/payments/order/{orderId}',
  },
  {
    clientCallName: 'client.suppliers.payments.listBySupplier',
    fullyQualifiedName: 'suppliers.payments.listBySupplier',
    httpMethod: 'get',
    httpPath: '/api/Suppliers/payments/supplier/{supplierId}',
  },
  {
    clientCallName: 'client.vouchers.retrieve',
    fullyQualifiedName: 'vouchers.retrieve',
    httpMethod: 'get',
    httpPath: '/api/Vouchers/{id}',
  },
  {
    clientCallName: 'client.vouchers.list',
    fullyQualifiedName: 'vouchers.list',
    httpMethod: 'get',
    httpPath: '/api/Vouchers',
  },
  {
    clientCallName: 'client.vouchers.expired',
    fullyQualifiedName: 'vouchers.expired',
    httpMethod: 'get',
    httpPath: '/api/Vouchers/expired',
  },
  {
    clientCallName: 'client.vouchers.totalIssued',
    fullyQualifiedName: 'vouchers.totalIssued',
    httpMethod: 'get',
    httpPath: '/api/Vouchers/total-issued',
  },
  {
    clientCallName: 'client.vouchers.totalRedeemed',
    fullyQualifiedName: 'vouchers.totalRedeemed',
    httpMethod: 'get',
    httpPath: '/api/Vouchers/total-redeemed',
  },
  {
    clientCallName: 'client.weatherForecast.retrieve',
    fullyQualifiedName: 'weatherForecast.retrieve',
    httpMethod: 'get',
    httpPath: '/api/WeatherForecast',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
