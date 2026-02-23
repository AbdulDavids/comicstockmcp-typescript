// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CustomersAPI from './customers';
import * as DashboardAPI from './dashboard/dashboard';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Orders extends APIResource {
  /**
   * Get customer order detail by ID
   */
  retrieve(id: number, options?: RequestOptions): APIPromise<OrderRetrieveResponse> {
    return this._client.get(path`/api/Orders/${id}`, options);
  }

  /**
   * Returns a paginated list of customer purchase orders. Supports search, status
   * filter, sort field, and customer filter.
   */
  list(
    query: OrderListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrderListResponse> {
    return this._client.get('/api/Orders', { query, ...options });
  }

  /**
   * Replaces the line items on an existing order. Used to correct quantities or
   * pricing before fulfillment.
   */
  updateItems(id: number, body: OrderUpdateItemsParams, options?: RequestOptions): APIPromise<void> {
    return this._client.put(path`/api/Orders/${id}/items`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Update the status of a customer order
   */
  updateStatus(id: number, body: OrderUpdateStatusParams, options?: RequestOptions): APIPromise<void> {
    return this._client.put(path`/api/Orders/${id}/status`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Full customer order detail including line items, delivery, and payment.
 */
export interface OrderRetrieveResponse {
  /**
   * Customer profile detail.
   */
  customer?: CustomersAPI.UserDetails;

  customerOrderId?: number;

  /**
   * Delivery record for a customer order including waybill and dates.
   */
  delivery?: OrderRetrieveResponse.Delivery;

  items?: Array<OrderRetrieveResponse.Item> | null;

  orderDate?: string;

  orderNumber?: string | null;

  /**
   * Payment record for a customer order.
   */
  payment?: OrderRetrieveResponse.Payment;

  /**
   * E.g. 'Pending', 'Shipped', 'Delivered', 'Cancelled'.
   */
  status?: string | null;

  total?: number;

  totalPaid?: number;

  vatPaid?: number;
}

export namespace OrderRetrieveResponse {
  /**
   * Delivery record for a customer order including waybill and dates.
   */
  export interface Delivery {
    /**
     * Delivery address for a customer order.
     */
    address?: Delivery.Address;

    dateDelivered?: string | null;

    dateShipped?: string | null;

    /**
     * E.g. 'courier', 'pickup'.
     */
    deliveryType?: string | null;

    orderDeliveryId?: number;

    specialInstructions?: string | null;

    waybillNumber?: string | null;
  }

  export namespace Delivery {
    /**
     * Delivery address for a customer order.
     */
    export interface Address {
      addressLineOne?: string | null;

      addressLineTwo?: string | null;

      city?: string | null;

      postalCode?: string | null;
    }
  }

  /**
   * A single line item in a customer order.
   */
  export interface Item {
    /**
     * Stock condition (New, Good, Poor, etc.).
     */
    condition?: string | null;

    issueTitle?: string | null;

    publisher?: string | null;

    quantity?: number;

    sellingPrice?: number;

    seriesNumber?: number;

    stockItemId?: number;
  }

  /**
   * Payment record for a customer order.
   */
  export interface Payment {
    amount?: number;

    orderPaymentId?: number;

    processedDate?: string | null;

    /**
     * Payment gateway response code.
     */
    returnedCode?: string | null;

    /**
     * Payment gateway response message.
     */
    returnedMessage?: string | null;

    status?: string | null;

    transactionReference?: string | null;
  }
}

/**
 * Paginated result for customer orders (uses `orders` instead of `items` for the
 * array field).
 */
export interface OrderListResponse {
  orders?: Array<DashboardAPI.OrderSummary> | null;

  page?: number;

  pageSize?: number;

  totalCount?: number;

  totalPages?: number;
}

export interface OrderListParams {
  /**
   * Filter orders belonging to a specific customer.
   */
  CustomerId?: number;

  /**
   * 1-based page number.
   */
  Page?: number;

  /**
   * Number of records per page.
   */
  PageSize?: number;

  /**
   * Full-text search across order number and customer name.
   */
  SearchTerm?: string;

  /**
   * Field name to sort by (e.g. 'orderDate', 'total').
   */
  SortBy?: string;

  /**
   * Sort in descending order when true.
   */
  SortDescending?: boolean;

  /**
   * Filter by order status string (e.g. 'Pending', 'Shipped', 'Delivered').
   */
  StatusFilter?: string;
}

export interface OrderUpdateItemsParams {
  items?: Array<OrderUpdateItemsParams.Item> | null;
}

export namespace OrderUpdateItemsParams {
  /**
   * Update payload for a customer order line item.
   */
  export interface Item {
    condition?: string | null;

    customerOrderItemsId?: number;

    price?: number;

    quantity?: number;

    seriesNumber?: number;

    title?: string | null;
  }
}

export interface OrderUpdateStatusParams {
  /**
   * Target status string (e.g. 'Shipped', 'Delivered', 'Cancelled').
   */
  newStatus?: string | null;

  /**
   * Courier waybill number (required when transitioning to Shipped).
   */
  waybillNumber?: string | null;
}

export declare namespace Orders {
  export {
    type OrderRetrieveResponse as OrderRetrieveResponse,
    type OrderListResponse as OrderListResponse,
    type OrderListParams as OrderListParams,
    type OrderUpdateItemsParams as OrderUpdateItemsParams,
    type OrderUpdateStatusParams as OrderUpdateStatusParams,
  };
}
