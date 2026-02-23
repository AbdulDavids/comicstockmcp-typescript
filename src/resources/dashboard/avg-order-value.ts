// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DashboardAPI from './dashboard';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class AvgOrderValue extends APIResource {
  /**
   * Get average order value (all customers)
   */
  get(options?: RequestOptions): APIPromise<DashboardAPI.OrderTrend> {
    return this._client.get('/api/Dashboard/avg-order-value', options);
  }

  /**
   * Get average order value for a specific customer
   */
  getByCustomer(id: number, options?: RequestOptions): APIPromise<DashboardAPI.OrderTrend> {
    return this._client.get(path`/api/Dashboard/avg-order-value/${id}`, options);
  }
}
