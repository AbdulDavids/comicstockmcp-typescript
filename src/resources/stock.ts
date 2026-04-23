// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Comic book inventory. An Issue represents a comic title/edition; each Issue has one or more StockItems keyed by condition (e.g. New, Good, Poor).
 */
export class Stock extends APIResource {
  /**
   * Creates an issue record along with its initial stock items. Each stock item
   * specifies a condition, quantity, and selling price.
   */
  create(body: StockCreateParams, options?: RequestOptions): APIPromise<IssueDetail> {
    return this._client.post('/api/Stock', { body, ...options });
  }

  /**
   * Get a single comic issue by ID
   */
  retrieve(id: number, options?: RequestOptions): APIPromise<IssueDetail> {
    return this._client.get(path`/api/Stock/${id}`, options);
  }

  /**
   * Update a comic issue and its stock items
   */
  update(id: number, body: StockUpdateParams, options?: RequestOptions): APIPromise<IssueDetail> {
    return this._client.put(path`/api/Stock/${id}`, { body, ...options });
  }

  /**
   * Returns a paginated list of comic issues, each with their associated stock items
   * (condition, quantity, price). Supports search by title or publisher.
   */
  list(
    query: StockListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<StockListResponse> {
    return this._client.get('/api/Stock', { query, ...options });
  }

  /**
   * Removes the issue and all its associated stock items. Irreversible.
   */
  delete(id: number, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/Stock/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Full detail for a comic issue including all associated stock items.
 */
export interface IssueDetail {
  /**
   * URL or base64 of the cover image.
   */
  coverImage?: string | null;

  /**
   * Synopsis or notes about this issue.
   */
  description?: string | null;

  /**
   * Unique issue identifier.
   */
  issueId?: number;

  /**
   * Original publication date (YYYY-MM-DD).
   */
  publicationDate?: string;

  /**
   * Publisher name (e.g. 'Marvel Comics').
   */
  publisher?: string | null;

  /**
   * Issue number within the series.
   */
  seriesNumber?: number;

  /**
   * Stock items grouped by condition (New, Good, Poor, etc.).
   */
  stock?: Array<IssueDetail.Stock> | null;

  /**
   * Comic series title (e.g. 'The Amazing Spider-Man').
   */
  title?: string | null;
}

export namespace IssueDetail {
  /**
   * Summary of a stock item (one condition bucket for an issue).
   */
  export interface Stock {
    availableQuantity?: number;

    condition?: string | null;

    price?: number;

    stockItemId?: number;
  }
}

/**
 * Create or update a comic issue with its stock items.
 */
export interface IssueRequest {
  coverImage?: string | null;

  description?: string | null;

  publicationDate?: string | null;

  publisher?: string | null;

  seriesNumber?: number | null;

  /**
   * Stock items to create / update.
   */
  stock?: Array<StockItemRequestDto> | null;

  /**
   * Series title.
   */
  title?: string | null;
}

/**
 * Create or update a stock item (condition bucket) for an issue.
 */
export interface StockItemRequestDto {
  availableQuantity?: number | null;

  /**
   * Condition grade, e.g. 'New', 'Good', 'Poor'.
   */
  condition?: string | null;

  /**
   * Selling price per unit (ZAR).
   */
  price?: number | null;
}

/**
 * Paginated result wrapping IssueDetailDTO items.
 */
export interface StockListResponse {
  items?: Array<IssueDetail> | null;

  /**
   * Current page (1-based).
   */
  page?: number;

  pageSize?: number;

  /**
   * Total matching records.
   */
  totalCount?: number;

  totalPages?: number;
}

export interface StockCreateParams {
  coverImage?: string | null;

  description?: string | null;

  publicationDate?: string | null;

  publisher?: string | null;

  seriesNumber?: number | null;

  /**
   * Stock items to create / update.
   */
  stock?: Array<StockItemRequestDto> | null;

  /**
   * Series title.
   */
  title?: string | null;
}

export interface StockUpdateParams {
  coverImage?: string | null;

  description?: string | null;

  publicationDate?: string | null;

  publisher?: string | null;

  seriesNumber?: number | null;

  /**
   * Stock items to create / update.
   */
  stock?: Array<StockItemRequestDto> | null;

  /**
   * Series title.
   */
  title?: string | null;
}

export interface StockListParams {
  /**
   * 1-based page number.
   */
  page?: number;

  /**
   * Number of issues per page.
   */
  pageSize?: number;

  /**
   * Optional search term matched against issue title and publisher.
   */
  searchTerm?: string;
}

export declare namespace Stock {
  export {
    type IssueDetail as IssueDetail,
    type IssueRequest as IssueRequest,
    type StockItemRequestDto as StockItemRequestDto,
    type StockListResponse as StockListResponse,
    type StockCreateParams as StockCreateParams,
    type StockUpdateParams as StockUpdateParams,
    type StockListParams as StockListParams,
  };
}
