// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Full supplier lifecycle: directory CRUD, price-quote management (batch CSV upload or individual update), restock order creation wizard, order state-machine transitions, payment recording, and quote-request workflows.
 */
export class Creation extends APIResource {
  /**
   * Returns all comic issues that have at least one supplier quote, paginated. Each
   * issue includes its available stock per condition and the latest quote per
   * supplier per condition.
   *
   * If `issueIds` is provided (e.g. from the Dashboard Low Stock flow), those issues
   * are returned first and pre-selected in the UI.
   *
   * @example
   * ```ts
   * const response =
   *   await client.suppliers.orders.creation.listIssues();
   * ```
   */
  listIssues(
    query: CreationListIssuesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CreationListIssuesResponse> {
    return this._client.get('/api/Suppliers/orders/creation/issues', { query, ...options });
  }

  /**
   * Get a single issue with quotes for the order creation wizard
   *
   * @example
   * ```ts
   * const supplierCreateOrderItems =
   *   await client.suppliers.orders.creation.retrieveIssue(0);
   * ```
   */
  retrieveIssue(issueID: number, options?: RequestOptions): APIPromise<SupplierCreateOrderItems> {
    return this._client.get(path`/api/Suppliers/orders/creation/issue/${issueID}`, options);
  }
}

/**
 * An issue with its available stock per condition and latest supplier quotes. Used
 * in Step 1 of the order creation wizard.
 */
export interface SupplierCreateOrderItems {
  /**
   * Current stock on hand per condition grade.
   */
  availableStockPerCondition?: Array<SupplierCreateOrderItems.AvailableStockPerCondition> | null;

  /**
   * True if at least one active quote exists.
   */
  hasRecentQuotes?: boolean;

  imageUrl?: string | null;

  issueId?: string | null;

  issueTitle?: string | null;

  /**
   * Latest quote per supplier per condition (deduplicated by effectiveDate).
   */
  itemQuotes?: Array<SupplierCreateOrderItems.ItemQuote> | null;

  seriesNumber?: string | null;
}

export namespace SupplierCreateOrderItems {
  /**
   * Available stock quantity for a specific condition grade.
   */
  export interface AvailableStockPerCondition {
    condition?: string | null;

    quantity?: number;
  }

  /**
   * A specific supplier quote for one stock item (issue + condition combination).
   */
  export interface ItemQuote {
    condition?: string | null;

    effectiveDate?: string;

    /**
     * Null if this is a pending quote request awaiting a price.
     */
    quotedPrice?: number | null;

    quoteId?: number;

    /**
     * StockItem ID this quote refers to.
     */
    stockReferenceId?: number;

    supplierId?: number;

    supplierName?: string | null;
  }
}

/**
 * Paginated result wrapping SupplierCreateOrderItemsDTO items.
 */
export interface CreationListIssuesResponse {
  items?: Array<SupplierCreateOrderItems> | null;

  page?: number;

  pageSize?: number;

  totalCount?: number;

  totalPages?: number;
}

export interface CreationListIssuesParams {
  /**
   * Optional list of issue IDs to pre-filter and pre-select. Passed as repeated
   * query params: `?issueIds=1&issueIds=2`.
   */
  issueIds?: Array<number>;

  /**
   * 1-based page number.
   */
  page?: number;

  /**
   * Records per page.
   */
  pageSize?: number;
}

export declare namespace Creation {
  export {
    type SupplierCreateOrderItems as SupplierCreateOrderItems,
    type CreationListIssuesResponse as CreationListIssuesResponse,
    type CreationListIssuesParams as CreationListIssuesParams,
  };
}
