// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as QuotesAPI from './quotes';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Quotes extends APIResource {
  /**
   * Get a single supplier quote by ID
   *
   * @example
   * ```ts
   * const supplierQuoteSummary =
   *   await client.suppliers.quotes.retrieve(0);
   * ```
   */
  retrieve(quoteID: number, options?: RequestOptions): APIPromise<SupplierQuoteSummary> {
    return this._client.get(path`/api/Suppliers/quotes/${quoteID}`, options);
  }

  /**
   * Updates an existing quote's price, condition, or effective date. Used when
   * correcting a quote that was uploaded via CSV.
   *
   * @example
   * ```ts
   * const supplierQuoteSummary =
   *   await client.suppliers.quotes.update(0);
   * ```
   */
  update(
    quoteID: number,
    body: QuoteUpdateParams,
    options?: RequestOptions,
  ): APIPromise<SupplierQuoteSummary> {
    return this._client.put(path`/api/Suppliers/quotes/${quoteID}`, { body, ...options });
  }

  /**
   * Returns quotes grouped by supplier. Each group contains the supplier's
   * most-recent quote per stock item. Supports search by issue title.
   *
   * @example
   * ```ts
   * const quotes = await client.suppliers.quotes.list();
   * ```
   */
  list(
    query: QuoteListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<QuoteListResponse> {
    return this._client.get('/api/Suppliers/quotes', { query, ...options });
  }

  /**
   * Sets the price on a previously pending quote (one created via
   * `POST /quote-requests` with `Price = null`). This represents the supplier
   * responding with a price for a requested stock item.
   *
   * @example
   * ```ts
   * const supplierQuoteSummary =
   *   await client.suppliers.quotes.fulfill(0);
   * ```
   */
  fulfill(
    quoteID: number,
    body: QuoteFulfillParams,
    options?: RequestOptions,
  ): APIPromise<SupplierQuoteSummary> {
    return this._client.put(path`/api/Suppliers/quotes/${quoteID}/fulfill`, { body, ...options });
  }

  /**
   * List quotes for a specific supplier (paginated)
   *
   * @example
   * ```ts
   * const response =
   *   await client.suppliers.quotes.listBySupplier(0);
   * ```
   */
  listBySupplier(
    supplierID: number,
    query: QuoteListBySupplierParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<QuoteListBySupplierResponse> {
    return this._client.get(path`/api/Suppliers/${supplierID}/quotes`, { query, ...options });
  }

  /**
   * Returns the number of `SupplierQuotes` rows where `Price IS NULL`. Used to
   * display the pending-quotes badge in the admin portal.
   *
   * @example
   * ```ts
   * const response =
   *   await client.suppliers.quotes.pendingCount();
   * ```
   */
  pendingCount(options?: RequestOptions): APIPromise<QuotePendingCountResponse> {
    return this._client.get('/api/Suppliers/quotes/pending-count', options);
  }

  /**
   * Accepts a list of quote rows (typically parsed from a CSV file) and upserts them
   * for the supplier. The `supplierId` in the URL must match the `supplierId` in the
   * request body.
   *
   * @example
   * ```ts
   * await client.suppliers.quotes.save(0);
   * ```
   */
  save(supplierID: number, body: QuoteSaveParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/api/Suppliers/${supplierID}/quotes`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * A single row from a supplier quote CSV, representing one stock item's price.
 */
export interface SupplierQuoteCsvRow {
  condition?: string | null;

  /**
   * Date from which this price is valid.
   */
  effectiveDate?: string;

  issueTitle?: string | null;

  /**
   * Quoted price per unit (ZAR).
   */
  price?: number;

  stockItemId?: number;
}

/**
 * Summary of a supplier price quote for one stock item.
 */
export interface SupplierQuoteSummary {
  condition?: string | null;

  issueId?: number;

  issueTitle?: string | null;

  /**
   * Null for pending quote requests.
   */
  price?: number | null;

  quoteId?: number;

  /**
   * E.g. 'Active', 'Pending', 'Superseded'.
   */
  status?: string | null;
}

/**
 * Paginated result wrapping SupplierGroupedQuoteSummaryDTO items.
 */
export interface QuoteListResponse {
  items?: Array<QuoteListResponse.Item> | null;

  page?: number;

  pageSize?: number;

  totalCount?: number;

  totalPages?: number;
}

export namespace QuoteListResponse {
  /**
   * Quotes from a single supplier grouped together, with the most recent effective
   * date.
   */
  export interface Item {
    /**
     * Date the latest quote in this group became effective.
     */
    effectiveDate?: string;

    quotes?: Array<QuotesAPI.SupplierQuoteSummary> | null;

    supplierId?: number;

    supplierName?: string | null;
  }
}

/**
 * Paginated result wrapping SupplierQuoteSummaryDTO items.
 */
export interface QuoteListBySupplierResponse {
  items?: Array<SupplierQuoteSummary> | null;

  page?: number;

  pageSize?: number;

  totalCount?: number;

  totalPages?: number;
}

export type QuotePendingCountResponse = number;

export interface QuoteUpdateParams {
  condition?: string | null;

  /**
   * Date from which this price is valid.
   */
  effectiveDate?: string;

  issueTitle?: string | null;

  /**
   * Quoted price per unit (ZAR).
   */
  price?: number;

  stockItemId?: number;
}

export interface QuoteListParams {
  /**
   * 1-based page number.
   */
  page?: number;

  /**
   * Records per page.
   */
  pageSize?: number;

  /**
   * Optional search matched against issue title.
   */
  search?: string;
}

export interface QuoteFulfillParams {
  /**
   * The quoted price per unit (in ZAR).
   */
  price?: number;
}

export interface QuoteListBySupplierParams {
  /**
   * 1-based page number.
   */
  page?: number;

  /**
   * Records per page.
   */
  pageSize?: number;
}

export interface QuoteSaveParams {
  /**
   * Parsed quote rows to upsert.
   */
  quotes?: Array<SupplierQuoteCsvRow> | null;

  /**
   * Must match the supplierId path parameter.
   */
  body_supplierId?: number;
}

export declare namespace Quotes {
  export {
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
}
