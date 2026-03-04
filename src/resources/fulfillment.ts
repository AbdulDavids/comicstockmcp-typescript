// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Updates the fulfillment (delivery) status of a customer order. Used by the Fulfillment page to progress orders through shipping stages.
 */
export class Fulfillment extends APIResource {
  /**
   * Advances or updates the delivery status of a customer order (e.g. Pending →
   * Shipped → Delivered). Optionally records a waybill number.
   */
  updateStatus(id: number, body: FulfillmentUpdateStatusParams, options?: RequestOptions): APIPromise<void> {
    return this._client.put(path`/api/Fulfillment/${id}/status`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Updates the status of a customer order. Used by both the Orders and Fulfillment
 * controllers.
 */
export interface UpdateOrderStatus {
  /**
   * Target status string (e.g. 'Shipped', 'Delivered', 'Cancelled').
   */
  newStatus?: string | null;

  /**
   * Courier waybill number (required when transitioning to Shipped).
   */
  waybillNumber?: string | null;
}

export interface FulfillmentUpdateStatusParams {
  /**
   * Target status string (e.g. 'Shipped', 'Delivered', 'Cancelled').
   */
  newStatus?: string | null;

  /**
   * Courier waybill number (required when transitioning to Shipped).
   */
  waybillNumber?: string | null;
}

export declare namespace Fulfillment {
  export {
    type UpdateOrderStatus as UpdateOrderStatus,
    type FulfillmentUpdateStatusParams as FulfillmentUpdateStatusParams,
  };
}
