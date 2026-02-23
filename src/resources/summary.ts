// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Summary extends APIResource {
  /**
   * Returns a breakdown of customer orders by status (e.g. Pending, Shipped,
   * Delivered, Cancelled). Used by the dashboard header status badges.
   */
  getOrderStatusCounts(options?: RequestOptions): APIPromise<SummaryGetOrderStatusCountsResponse> {
    return this._client.get('/api/Summary/order-status-counts', options);
  }

  /**
   * Returns aggregate counts for suppliers, quotes, orders, and payments. Used by
   * the Suppliers page header cards.
   */
  getSupplierCounts(options?: RequestOptions): APIPromise<SummaryGetSupplierCountsResponse> {
    return this._client.get('/api/Summary/supplier-counts', options);
  }
}

/**
 * Breakdown of customer order counts by status.
 */
export interface SummaryGetOrderStatusCountsResponse {
  counts?: Array<SummaryGetOrderStatusCountsResponse.Count> | null;
}

export namespace SummaryGetOrderStatusCountsResponse {
  /**
   * A single status-to-count mapping entry.
   */
  export interface Count {
    count?: number;

    status?: string | null;
  }
}

/**
 * Aggregate entity counts for the Suppliers section.
 */
export interface SummaryGetSupplierCountsResponse {
  /**
   * Total restock orders.
   */
  orders?: number;

  /**
   * Total payment records.
   */
  payments?: number;

  /**
   * Total quote records.
   */
  quotes?: number;

  /**
   * Total registered suppliers.
   */
  suppliers?: number;
}

export declare namespace Summary {
  export {
    type SummaryGetOrderStatusCountsResponse as SummaryGetOrderStatusCountsResponse,
    type SummaryGetSupplierCountsResponse as SummaryGetSupplierCountsResponse,
  };
}
