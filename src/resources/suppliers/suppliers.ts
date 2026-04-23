// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as IssuesAPI from './issues';
import { IssueListPreviousSuppliersResponse, Issues } from './issues';
import * as PaymentsAPI from './payments';
import {
  PaymentListByOrderParams,
  PaymentListBySupplierParams,
  PaymentListParams,
  Payments,
  SupplierPaymentSummaryPagedResult,
} from './payments';
import * as QuotesAPI from './quotes';
import {
  QuoteFulfillParams,
  QuoteListBySupplierParams,
  QuoteListBySupplierResponse,
  QuoteListParams,
  QuoteListResponse,
  QuotePendingCountResponse,
  QuoteSaveParams,
  QuoteUpdateParams,
  Quotes,
  SupplierQuoteCsvRow,
  SupplierQuoteSummary,
} from './quotes';
import * as OrdersAPI from './orders/orders';
import {
  OrderCreateParams,
  OrderListParams,
  OrderListResponse,
  OrderRecordPaymentParams,
  OrderStatusCountsResponse,
  OrderUpdateParams,
  Orders,
  SupplierOrderDetail,
  SupplierPaymentSummary,
} from './orders/orders';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Full supplier lifecycle: directory CRUD, price-quote management (batch CSV upload or individual update), restock order creation wizard, order state-machine transitions, payment recording, and quote-request workflows.
 */
export class Suppliers extends APIResource {
  quotes: QuotesAPI.Quotes = new QuotesAPI.Quotes(this._client);
  orders: OrdersAPI.Orders = new OrdersAPI.Orders(this._client);
  issues: IssuesAPI.Issues = new IssuesAPI.Issues(this._client);
  payments: PaymentsAPI.Payments = new PaymentsAPI.Payments(this._client);

  /**
   * Create a new supplier
   *
   * @example
   * ```ts
   * const supplierSummary = await client.suppliers.create();
   * ```
   */
  create(body: SupplierCreateParams, options?: RequestOptions): APIPromise<SupplierSummary> {
    return this._client.post('/api/Suppliers', { body, ...options });
  }

  /**
   * Get a single supplier by ID
   *
   * @example
   * ```ts
   * const supplierSummary = await client.suppliers.retrieve(0);
   * ```
   */
  retrieve(id: number, options?: RequestOptions): APIPromise<SupplierSummary> {
    return this._client.get(path`/api/Suppliers/${id}`, options);
  }

  /**
   * Update a supplier's details
   *
   * @example
   * ```ts
   * const supplierSummary = await client.suppliers.update(0);
   * ```
   */
  update(id: number, body: SupplierUpdateParams, options?: RequestOptions): APIPromise<SupplierSummary> {
    return this._client.put(path`/api/Suppliers/${id}`, { body, ...options });
  }

  /**
   * Returns a paginated list of comic book suppliers. Supports optional
   * name/reference search.
   *
   * @example
   * ```ts
   * const suppliers = await client.suppliers.list();
   * ```
   */
  list(
    query: SupplierListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SupplierListResponse> {
    return this._client.get('/api/Suppliers', { query, ...options });
  }

  /**
   * Creates `SupplierQuotes` rows with `Price = null` (pending) for the specified
   * issues and supplier. These placeholder rows signal that a quote has been
   * requested but not yet received. Returns the number of rows created.
   *
   * @example
   * ```ts
   * const response =
   *   await client.suppliers.createQuoteRequest();
   * ```
   */
  createQuoteRequest(
    body: SupplierCreateQuoteRequestParams,
    options?: RequestOptions,
  ): APIPromise<SupplierCreateQuoteRequestResponse> {
    return this._client.post('/api/Suppliers/quote-requests', { body, ...options });
  }
}

/**
 * Create or update a supplier record.
 */
export interface SupplierRequest {
  city?: string | null;

  contactEmail?: string | null;

  contactNumber?: string | null;

  /**
   * Supplier company name.
   */
  name?: string | null;

  /**
   * Internal or external reference code.
   */
  referenceNumber?: string | null;
}

/**
 * Supplier profile summary.
 */
export interface SupplierSummary {
  city?: string | null;

  contactEmail?: string | null;

  contactNumber?: string | null;

  name?: string | null;

  referenceNumber?: string | null;

  supplierId?: number;
}

/**
 * Paginated result wrapping SupplierSummaryDTO items.
 */
export interface SupplierListResponse {
  items?: Array<SupplierSummary> | null;

  page?: number;

  pageSize?: number;

  totalCount?: number;

  totalPages?: number;
}

export type SupplierCreateQuoteRequestResponse = number;

export interface SupplierCreateParams {
  city?: string | null;

  contactEmail?: string | null;

  contactNumber?: string | null;

  /**
   * Supplier company name.
   */
  name?: string | null;

  /**
   * Internal or external reference code.
   */
  referenceNumber?: string | null;
}

export interface SupplierUpdateParams {
  city?: string | null;

  contactEmail?: string | null;

  contactNumber?: string | null;

  /**
   * Supplier company name.
   */
  name?: string | null;

  /**
   * Internal or external reference code.
   */
  referenceNumber?: string | null;
}

export interface SupplierListParams {
  /**
   * 1-based page number.
   */
  page?: number;

  /**
   * Records per page.
   */
  pageSize?: number;

  /**
   * Optional search matched against supplier name and reference number.
   */
  searchTerm?: string;
}

export interface SupplierCreateQuoteRequestParams {
  /**
   * Optional note to attach to the quote request.
   */
  comment?: string | null;

  /**
   * List of issue IDs for which quotes are requested.
   */
  issueIds?: Array<number> | null;

  /**
   * ID of the supplier to request quotes from.
   */
  supplierId?: number;
}

Suppliers.Quotes = Quotes;
Suppliers.Orders = Orders;
Suppliers.Issues = Issues;
Suppliers.Payments = Payments;

export declare namespace Suppliers {
  export {
    type SupplierRequest as SupplierRequest,
    type SupplierSummary as SupplierSummary,
    type SupplierListResponse as SupplierListResponse,
    type SupplierCreateQuoteRequestResponse as SupplierCreateQuoteRequestResponse,
    type SupplierCreateParams as SupplierCreateParams,
    type SupplierUpdateParams as SupplierUpdateParams,
    type SupplierListParams as SupplierListParams,
    type SupplierCreateQuoteRequestParams as SupplierCreateQuoteRequestParams,
  };

  export {
    Quotes as Quotes,
    type SupplierQuoteCsvRow as SupplierQuoteCsvRow,
    type SupplierQuoteSummary as SupplierQuoteSummary,
    type QuoteListResponse as QuoteListResponse,
    type QuoteListBySupplierResponse as QuoteListBySupplierResponse,
    type QuotePendingCountResponse as QuotePendingCountResponse,
    type QuoteUpdateParams as QuoteUpdateParams,
    type QuoteListParams as QuoteListParams,
    type QuoteFulfillParams as QuoteFulfillParams,
    type QuoteListBySupplierParams as QuoteListBySupplierParams,
    type QuoteSaveParams as QuoteSaveParams,
  };

  export {
    Orders as Orders,
    type SupplierOrderDetail as SupplierOrderDetail,
    type SupplierPaymentSummary as SupplierPaymentSummary,
    type OrderListResponse as OrderListResponse,
    type OrderStatusCountsResponse as OrderStatusCountsResponse,
    type OrderCreateParams as OrderCreateParams,
    type OrderUpdateParams as OrderUpdateParams,
    type OrderListParams as OrderListParams,
    type OrderRecordPaymentParams as OrderRecordPaymentParams,
  };

  export { Issues as Issues, type IssueListPreviousSuppliersResponse as IssueListPreviousSuppliersResponse };

  export {
    Payments as Payments,
    type SupplierPaymentSummaryPagedResult as SupplierPaymentSummaryPagedResult,
    type PaymentListParams as PaymentListParams,
    type PaymentListByOrderParams as PaymentListByOrderParams,
    type PaymentListBySupplierParams as PaymentListBySupplierParams,
  };
}
