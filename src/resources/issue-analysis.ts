// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Returns raw issue + stock data for a given issue without AI enrichment. Lightweight alternative to the Analysis endpoint.
 */
export class IssueAnalysis extends APIResource {
  /**
   * Returns the issue record plus stock items and total order count. Faster and
   * cheaper than the full `/api/analysis/{issueId}` endpoint since it skips the GCD
   * scraper and OpenAI call.
   */
  retrieve(issueID: number, options?: RequestOptions): APIPromise<void> {
    return this._client.get(path`/api/issue-analysis/${issueID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}
