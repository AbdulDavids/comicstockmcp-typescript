// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CustomersAPI from './customers';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Discount voucher management. Browse vouchers, view individual detail, and retrieve aggregate stats (total issued / redeemed / expired).
 */
export class Vouchers extends APIResource {
  /**
   * Get a single voucher by ID
   */
  retrieve(id: number, options?: RequestOptions): APIPromise<VoucherRetrieveResponse> {
    return this._client.get(path`/api/Vouchers/${id}`, options);
  }

  /**
   * Returns a paginated list of discount vouchers. Supports optional search by
   * voucher number or customer name.
   */
  list(
    query: VoucherListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CustomersAPI.UserDetailsPagedResult> {
    return this._client.get('/api/Vouchers', { query, ...options });
  }

  /**
   * Get total number of expired vouchers
   */
  expired(options?: RequestOptions): APIPromise<VoucherExpiredResponse> {
    return this._client.get('/api/Vouchers/expired', options);
  }

  /**
   * Get total number of vouchers ever issued
   */
  totalIssued(options?: RequestOptions): APIPromise<VoucherTotalIssuedResponse> {
    return this._client.get('/api/Vouchers/total-issued', options);
  }

  /**
   * Get total number of redeemed vouchers
   */
  totalRedeemed(options?: RequestOptions): APIPromise<VoucherTotalRedeemedResponse> {
    return this._client.get('/api/Vouchers/total-redeemed', options);
  }
}

/**
 * Discount voucher details.
 */
export interface VoucherRetrieveResponse {
  /**
   * Order the voucher was applied to, if redeemed.
   */
  customerOrderId?: number | null;

  dateIssued?: string;

  /**
   * Null if the voucher has not been redeemed.
   */
  dateRedeemed?: string | null;

  /**
   * Monetary value of the voucher (ZAR).
   */
  value?: number;

  voucherId?: number;

  /**
   * Human-readable voucher code.
   */
  voucherNumber?: string | null;
}

export type VoucherExpiredResponse = number;

export type VoucherTotalIssuedResponse = number;

export type VoucherTotalRedeemedResponse = number;

export interface VoucherListParams {
  /**
   * 1-based page number.
   */
  page?: number;

  /**
   * Records per page.
   */
  pageSize?: number;

  /**
   * Optional search matched against voucher number or customer details.
   */
  searchTerm?: string;
}

export declare namespace Vouchers {
  export {
    type VoucherRetrieveResponse as VoucherRetrieveResponse,
    type VoucherExpiredResponse as VoucherExpiredResponse,
    type VoucherTotalIssuedResponse as VoucherTotalIssuedResponse,
    type VoucherTotalRedeemedResponse as VoucherTotalRedeemedResponse,
    type VoucherListParams as VoucherListParams,
  };
}
