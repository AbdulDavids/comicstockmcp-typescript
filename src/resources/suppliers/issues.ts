// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SuppliersAPI from './suppliers';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Full supplier lifecycle: directory CRUD, price-quote management (batch CSV upload or individual update), restock order creation wizard, order state-machine transitions, payment recording, and quote-request workflows.
 */
export class Issues extends APIResource {
  /**
   * Returns all suppliers that have at least one `SupplierQuote` row for the given
   * issue. Useful for pre-populating the supplier selection when creating a new
   * quote request.
   *
   * @example
   * ```ts
   * const supplierSummaries =
   *   await client.suppliers.issues.listPreviousSuppliers(0);
   * ```
   */
  listPreviousSuppliers(
    issueID: number,
    options?: RequestOptions,
  ): APIPromise<IssueListPreviousSuppliersResponse> {
    return this._client.get(path`/api/Suppliers/issues/${issueID}/previous-suppliers`, options);
  }
}

export type IssueListPreviousSuppliersResponse = Array<SuppliersAPI.SupplierSummary>;

export declare namespace Issues {
  export { type IssueListPreviousSuppliersResponse as IssueListPreviousSuppliersResponse };
}
