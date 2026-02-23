// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class IssueSearch extends APIResource {
  /**
   * Returns matching comic issue titles for use in autocomplete/search inputs.
   */
  search(query: IssueSearchSearchParams | null | undefined = {}, options?: RequestOptions): APIPromise<void> {
    return this._client.get('/api/issue-search', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface IssueSearchSearchParams {
  /**
   * Partial title to search for.
   */
  query?: string;
}

export declare namespace IssueSearch {
  export { type IssueSearchSearchParams as IssueSearchSearchParams };
}
