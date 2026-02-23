// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Customers extends APIResource {
  /**
   * Get a single customer by ID
   */
  retrieve(id: number, options?: RequestOptions): APIPromise<UserDetails> {
    return this._client.get(path`/api/Customers/${id}`, options);
  }

  /**
   * Returns a paginated list of registered customers. Supports optional full-text
   * search across name and email.
   */
  list(
    query: CustomerListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UserDetailsPagedResult> {
    return this._client.get('/api/Customers', { query, ...options });
  }
}

/**
 * Customer profile detail.
 */
export interface UserDetails {
  email?: string | null;

  firstName?: string | null;

  lastName?: string | null;

  /**
   * Salutation (Mr, Mrs, Dr, etc.).
   */
  title?: string | null;

  userId?: number;
}

/**
 * Paginated result wrapping UserDetailsDTO items.
 */
export interface UserDetailsPagedResult {
  items?: Array<UserDetails> | null;

  page?: number;

  pageSize?: number;

  totalCount?: number;

  totalPages?: number;
}

export interface CustomerListParams {
  /**
   * 1-based page number.
   */
  page?: number;

  /**
   * Number of records per page.
   */
  pageSize?: number;

  /**
   * Optional search string matched against customer name and email.
   */
  searchTerm?: string;
}

export declare namespace Customers {
  export {
    type UserDetails as UserDetails,
    type UserDetailsPagedResult as UserDetailsPagedResult,
    type CustomerListParams as CustomerListParams,
  };
}
