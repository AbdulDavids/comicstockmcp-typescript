// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CreationAPI from './creation';
import {
  Creation,
  CreationListIssuesParams,
  CreationListIssuesResponse,
  SupplierCreateOrderItems,
} from './creation';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Full supplier lifecycle: directory CRUD, price-quote management (batch CSV upload or individual update), restock order creation wizard, order state-machine transitions, payment recording, and quote-request workflows.
 */
export class Orders extends APIResource {
  creation: CreationAPI.Creation = new CreationAPI.Creation(this._client);

  /**
   * Creates a supplier order with status `Drafted`. Called once per supplier from
   * the order creation wizard (Step 2). The client groups selected quotes by
   * `supplierId` and calls this endpoint in parallel via `forkJoin`.
   *
   * **State machine entry point:** Drafted → Ordered → In Transit → Delivered
   *
   * @example
   * ```ts
   * const supplierOrderDetail =
   *   await client.suppliers.orders.create();
   * ```
   */
  create(body: OrderCreateParams, options?: RequestOptions): APIPromise<SupplierOrderDetail> {
    return this._client.post('/api/Suppliers/orders', { body, ...options });
  }

  /**
   * Get a single supplier order by ID
   *
   * @example
   * ```ts
   * const supplierOrderDetail =
   *   await client.suppliers.orders.retrieve(0);
   * ```
   */
  retrieve(orderID: number, options?: RequestOptions): APIPromise<SupplierOrderDetail> {
    return this._client.get(path`/api/Suppliers/orders/${orderID}`, options);
  }

  /**
   * Advances the order through the state machine or records shipment details.
   *
   * **Allowed transitions:**
   *
   * - `Ordered → In Transit` (requires `shippedReference` and `shipmentDate`)
   * - `Ordered → Cancelled`
   * - `In Transit → Delivered` (requires actual `shipmentDate`)
   * - `In Transit → Damaged` (requires `damageComment`)
   *
   * @example
   * ```ts
   * await client.suppliers.orders.update(0);
   * ```
   */
  update(orderID: number, body: OrderUpdateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.put(path`/api/Suppliers/orders/${orderID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Returns all supplier orders. Optionally filter by status string (e.g. 'Drafted',
   * 'Ordered', 'In Transit', 'Delivered') and search by supplier name.
   *
   * @example
   * ```ts
   * const orders = await client.suppliers.orders.list();
   * ```
   */
  list(
    query: OrderListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrderListResponse> {
    return this._client.get('/api/Suppliers/orders', { query, ...options });
  }

  /**
   * Transitions a supplier order from `Drafted` to `Ordered`, indicating that the
   * purchase order has been sent to the supplier.
   *
   * @example
   * ```ts
   * await client.suppliers.orders.confirm(0);
   * ```
   */
  confirm(orderID: number, options?: RequestOptions): APIPromise<void> {
    return this._client.put(path`/api/Suppliers/orders/${orderID}/confirm`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Creates a payment record linked to a supplier order. One order can have at most
   * one payment. Typically called after the supplier invoice is settled.
   *
   * @example
   * ```ts
   * const supplierPaymentSummary =
   *   await client.suppliers.orders.recordPayment(0);
   * ```
   */
  recordPayment(
    orderID: number,
    body: OrderRecordPaymentParams,
    options?: RequestOptions,
  ): APIPromise<SupplierPaymentSummary> {
    return this._client.post(path`/api/Suppliers/orders/${orderID}/payment`, { body, ...options });
  }

  /**
   * Returns a map of `{ status: count }` for all supplier orders. Used by the
   * Suppliers page tab badges.
   *
   * @example
   * ```ts
   * const response =
   *   await client.suppliers.orders.statusCounts();
   * ```
   */
  statusCounts(options?: RequestOptions): APIPromise<OrderStatusCountsResponse> {
    return this._client.get('/api/Suppliers/orders/status-counts', options);
  }
}

/**
 * Full detail for a supplier restock order including summary, payment, and line
 * items.
 */
export interface SupplierOrderDetail {
  items?: Array<SupplierOrderDetail.Item> | null;

  /**
   * Summary of a payment made to a supplier for a restock order.
   */
  payment?: SupplierPaymentSummary;

  /**
   * Summary fields for a supplier restock order.
   */
  supplierOrderSummary?: SupplierOrderDetail.SupplierOrderSummary;
}

export namespace SupplierOrderDetail {
  /**
   * A line item in a supplier restock order.
   */
  export interface Item {
    condition?: string | null;

    issueTitle?: string | null;

    /**
     * unitPrice × quantity.
     */
    itemTotalPrice?: number;

    quantity?: number;

    stockItemId?: number;

    /**
     * Price per unit from the supplier quote.
     */
    unitPrice?: number;
  }

  /**
   * Summary fields for a supplier restock order.
   */
  export interface SupplierOrderSummary {
    comment?: string | null;

    /**
     * Current status in the state machine: Drafted | Ordered | In Transit | Delivered
     * | Cancelled | Damaged.
     */
    deliveryStatus?: string | null;

    orderDate?: string;

    orderId?: number;

    /**
     * Expected or actual shipment date (YYYY-MM-DD).
     */
    shipmentDate?: string | null;

    /**
     * Supplier shipment tracking reference.
     */
    shippedReference?: string | null;

    supplierId?: number;

    supplierName?: string | null;

    total?: number;
  }
}

/**
 * Summary of a payment made to a supplier for a restock order.
 */
export interface SupplierPaymentSummary {
  paymentId?: number;

  paymentReference?: string | null;

  processedDate?: string | null;

  status?: string | null;

  supplierName?: string | null;

  total?: number;
}

/**
 * Paginated result wrapping SupplierOrderDetailDto items.
 */
export interface OrderListResponse {
  items?: Array<SupplierOrderDetail> | null;

  page?: number;

  pageSize?: number;

  totalCount?: number;

  totalPages?: number;
}

export type OrderStatusCountsResponse = { [key: string]: number };

export interface OrderCreateParams {
  /**
   * Optional order-level note.
   */
  comment?: string | null;

  /**
   * One or more line items (stock item + quantity + unit price).
   */
  lineItems?: Array<OrderCreateParams.LineItem> | null;

  /**
   * Date the order is raised (ISO 8601).
   */
  orderDate?: string;

  /**
   * Supplier to place the order with.
   */
  supplierId?: number;
}

export namespace OrderCreateParams {
  /**
   * A single line item in the CreateSupplierOrderDTO request.
   */
  export interface LineItem {
    quantity?: number;

    /**
     * StockItem (issue + condition) to order.
     */
    stockItemId?: number;

    /**
     * Agreed unit price from the supplier quote.
     */
    unitPrice?: number;
  }
}

export interface OrderUpdateParams {
  /**
   * Required when transitioning to Damaged.
   */
  damageComment?: string | null;

  /**
   * New delivery status. Allowed: In Transit | Delivered | Cancelled | Damaged.
   */
  deliveryStatus?: string | null;

  /**
   * Expected shipment date (In Transit) or actual delivery date (Delivered). Format:
   * YYYY-MM-DD.
   */
  shipmentDate?: string | null;

  /**
   * Required when transitioning to In Transit.
   */
  shippedReference?: string | null;
}

export interface OrderListParams {
  /**
   * 1-based page number.
   */
  page?: number;

  /**
   * Records per page.
   */
  pageSize?: number;

  /**
   * Search matched against supplier name.
   */
  searchTerm?: string;

  /**
   * Filter by delivery status. Allowed values: `Drafted`, `Ordered`, `In Transit`,
   * `Delivered`, `Cancelled`, `Damaged`.
   */
  status?: string;
}

export interface OrderRecordPaymentParams {
  /**
   * Bank or EFT reference number.
   */
  paymentReference?: string | null;

  /**
   * Date the payment was processed (ISO 8601).
   */
  processedDate?: string;

  /**
   * Total amount paid.
   */
  total?: number;
}

Orders.Creation = Creation;

export declare namespace Orders {
  export {
    type SupplierOrderDetail as SupplierOrderDetail,
    type SupplierPaymentSummary as SupplierPaymentSummary,
    type OrderListResponse as OrderListResponse,
    type OrderStatusCountsResponse as OrderStatusCountsResponse,
    type OrderCreateParams as OrderCreateParams,
    type OrderUpdateParams as OrderUpdateParams,
    type OrderListParams as OrderListParams,
    type OrderRecordPaymentParams as OrderRecordPaymentParams,
  };

  export {
    Creation as Creation,
    type SupplierCreateOrderItems as SupplierCreateOrderItems,
    type CreationListIssuesResponse as CreationListIssuesResponse,
    type CreationListIssuesParams as CreationListIssuesParams,
  };
}
