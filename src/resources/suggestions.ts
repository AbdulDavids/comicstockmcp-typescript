// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

/**
 * Smart reorder suggestions. Low-stock identifies issues near the reorder threshold weighted by recent sales velocity. Bestsellers ranks top-selling issues.
 */
export class Suggestions extends APIResource {
  /**
   * Returns the top N issues by units sold over the specified historical window.
   * Useful for deciding which titles to restock proactively.
   */
  getBestsellers(
    query: SuggestionGetBestsellersParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.get('/api/Suggestions/bestsellers', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Returns issues whose total available quantity is at or below `threshold`, ranked
   * by recent sales velocity over the past `months`. Used by the Dashboard Low Stock
   * tab to drive the supplier order creation flow.
   */
  getLowStock(
    query: SuggestionGetLowStockParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.get('/api/Suggestions/low-stock', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface SuggestionGetBestsellersParams {
  /**
   * Number of months of sales history to use.
   */
  months?: number;

  /**
   * Number of bestsellers to return.
   */
  topN?: number;
}

export interface SuggestionGetLowStockParams {
  /**
   * Number of months of sales history to weight the suggestion ranking.
   */
  months?: number;

  /**
   * Maximum stock quantity to qualify as low-stock. Issues at or below this value
   * are included.
   */
  threshold?: number;
}

export declare namespace Suggestions {
  export {
    type SuggestionGetBestsellersParams as SuggestionGetBestsellersParams,
    type SuggestionGetLowStockParams as SuggestionGetLowStockParams,
  };
}
