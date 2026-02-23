// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as StockAPI from '../stock';
import * as AvgOrderValueAPI from './avg-order-value';
import { AvgOrderValue } from './avg-order-value';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Dashboard extends APIResource {
  avgOrderValue: AvgOrderValueAPI.AvgOrderValue = new AvgOrderValueAPI.AvgOrderValue(this._client);

  /**
   * Get count of orders older than a stale threshold
   */
  getOlderOrdersCount(options?: RequestOptions): APIPromise<OrderTrend> {
    return this._client.get('/api/Dashboard/older-orders', options);
  }

  /**
   * Returns time-series data points grouped by week or month (granularity chosen by
   * the API based on the requested window) for order count and revenue.
   */
  getOrderTrends(
    query: DashboardGetOrderTrendsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrderTrend> {
    return this._client.get('/api/Dashboard/order-trends', { query, ...options });
  }

  /**
   * Get count of supplier shipments expected to arrive today
   */
  getOrdersExpectedTodayCount(options?: RequestOptions): APIPromise<OrderTrend> {
    return this._client.get('/api/Dashboard/orders-expected-today', options);
  }

  /**
   * Get count of supplier orders past their expected delivery date
   */
  getOverdueOrdersCount(options?: RequestOptions): APIPromise<OrderTrend> {
    return this._client.get('/api/Dashboard/orders-overdue', options);
  }

  /**
   * Get count of orders with pending payments
   */
  getPendingPaymentsCount(options?: RequestOptions): APIPromise<OrderTrend> {
    return this._client.get('/api/Dashboard/pending-payments', options);
  }

  /**
   * Returns a short list of the most recent customer orders shown on the dashboard
   * home screen.
   */
  getRecentOrders(options?: RequestOptions): APIPromise<DashboardGetRecentOrdersResponse> {
    return this._client.get('/api/Dashboard/orders', options);
  }

  /**
   * Get recently active users for the dashboard
   */
  getRecentUsers(options?: RequestOptions): APIPromise<DashboardGetRecentUsersResponse> {
    return this._client.get('/api/Dashboard/users', options);
  }

  /**
   * Get stock snapshot for the dashboard
   */
  getStockSnapshot(options?: RequestOptions): APIPromise<DashboardGetStockSnapshotResponse> {
    return this._client.get('/api/Dashboard/stock', options);
  }

  /**
   * Get count of unfulfilled orders
   */
  getUnfulfilledOrdersCount(options?: RequestOptions): APIPromise<OrderTrend> {
    return this._client.get('/api/Dashboard/unfulfilled-orders', options);
  }
}

/**
 * Summary of a customer order for list views.
 */
export interface OrderSummary {
  customerEmail?: string | null;

  customerFullName?: string | null;

  customerOrderId?: number;

  dateDelivered?: string | null;

  dateShipped?: string | null;

  deliveryType?: string | null;

  orderDate?: string;

  orderNumber?: string | null;

  status?: string | null;

  total?: number;

  totalPaid?: number;

  waybillNumber?: string | null;
}

/**
 * Time-series metric result used by dashboard trend charts and KPI cards.
 */
export interface OrderTrend {
  dataPoints?: Array<OrderTrend.DataPoint> | null;

  /**
   * Time bucket granularity chosen by the API, e.g. 'week' or 'month'.
   */
  granularity?: string | null;

  /**
   * Aggregate order count across the window.
   */
  totalOrders?: number;

  /**
   * Aggregate revenue across the window.
   */
  totalRevenue?: number;
}

export namespace OrderTrend {
  /**
   * A single data point in a trend chart.
   */
  export interface DataPoint {
    /**
     * X-axis label (e.g. 'Jan 2025', 'Week 12').
     */
    label?: string | null;

    orderCount?: number;

    revenue?: number;
  }
}

export type DashboardGetRecentOrdersResponse = Array<OrderSummary>;

export type DashboardGetRecentUsersResponse =
  Array<DashboardGetRecentUsersResponse.DashboardGetRecentUsersResponseItem>;

export namespace DashboardGetRecentUsersResponse {
  /**
   * Customer summary with order totals, used on the dashboard.
   */
  export interface DashboardGetRecentUsersResponseItem {
    customerId?: number;

    email?: string | null;

    firstName?: string | null;

    lastName?: string | null;

    title?: string | null;

    totalOrders?: number;

    totalSpent?: number;
  }
}

export type DashboardGetStockSnapshotResponse = Array<StockAPI.IssueDetail>;

export interface DashboardGetOrderTrendsParams {
  /**
   * How many months of history to return. Defaults to 12.
   */
  months?: number;
}

Dashboard.AvgOrderValue = AvgOrderValue;

export declare namespace Dashboard {
  export {
    type OrderSummary as OrderSummary,
    type OrderTrend as OrderTrend,
    type DashboardGetRecentOrdersResponse as DashboardGetRecentOrdersResponse,
    type DashboardGetRecentUsersResponse as DashboardGetRecentUsersResponse,
    type DashboardGetStockSnapshotResponse as DashboardGetStockSnapshotResponse,
    type DashboardGetOrderTrendsParams as DashboardGetOrderTrendsParams,
  };

  export { AvgOrderValue as AvgOrderValue };
}
