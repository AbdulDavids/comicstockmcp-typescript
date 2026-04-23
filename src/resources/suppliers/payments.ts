// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as OrdersAPI from './orders/orders';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Full supplier lifecycle: directory CRUD, price-quote management (batch CSV upload or individual update), restock order creation wizard, order state-machine transitions, payment recording, and quote-request workflows.
 */
export class Payments extends APIResource {
  /**
   * Get a single supplier payment by ID
   *
   * @example
   * ```ts
   * const supplierPaymentSummary =
   *   await client.suppliers.payments.retrieve(0);
   * ```
   */
  retrieve(id: number, options?: RequestOptions): APIPromise<OrdersAPI.SupplierPaymentSummary> {
    return this._client.get(path`/api/Suppliers/payments/${id}`, options);
  }

  /**
   * List all supplier payments (paginated)
   *
   * @example
   * ```ts
   * const supplierPaymentSummaryPagedResult =
   *   await client.suppliers.payments.list();
   * ```
   */
  list(
    query: PaymentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SupplierPaymentSummaryPagedResult> {
    return this._client.get('/api/Suppliers/payments', { query, ...options });
  }

  /**
   * List payments for a specific supplier order (paginated)
   *
   * @example
   * ```ts
   * const supplierPaymentSummaryPagedResult =
   *   await client.suppliers.payments.listByOrder(0);
   * ```
   */
  listByOrder(
    orderID: number,
    query: PaymentListByOrderParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SupplierPaymentSummaryPagedResult> {
    return this._client.get(path`/api/Suppliers/payments/order/${orderID}`, { query, ...options });
  }

  /**
   * List payments for a specific supplier (paginated)
   *
   * @example
   * ```ts
   * const supplierPaymentSummaryPagedResult =
   *   await client.suppliers.payments.listBySupplier(0);
   * ```
   */
  listBySupplier(
    supplierID: number,
    query: PaymentListBySupplierParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SupplierPaymentSummaryPagedResult> {
    return this._client.get(path`/api/Suppliers/payments/supplier/${supplierID}`, { query, ...options });
  }
}

/**
 * Paginated result wrapping SupplierPaymentSummaryDTO items.
 */
export interface SupplierPaymentSummaryPagedResult {
  items?: Array<OrdersAPI.SupplierPaymentSummary> | null;

  page?: number;

  pageSize?: number;

  totalCount?: number;

  totalPages?: number;
}

export interface PaymentListParams {
  /**
   * 1-based page number.
   */
  page?: number;

  /**
   * Records per page.
   */
  pageSize?: number;
}

export interface PaymentListByOrderParams {
  /**
   * 1-based page number.
   */
  page?: number;

  /**
   * Records per page.
   */
  pageSize?: number;
}

export interface PaymentListBySupplierParams {
  /**
   * 1-based page number.
   */
  page?: number;

  /**
   * Records per page.
   */
  pageSize?: number;
}

export declare namespace Payments {
  export {
    type SupplierPaymentSummaryPagedResult as SupplierPaymentSummaryPagedResult,
    type PaymentListParams as PaymentListParams,
    type PaymentListByOrderParams as PaymentListByOrderParams,
    type PaymentListBySupplierParams as PaymentListBySupplierParams,
  };
}
