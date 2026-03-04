// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * AI-powered comic issue analysis. Combines stock data, Grand Comics Database (GCD) scraping, and Azure OpenAI to produce a market-analysis report for a given issue.
 */
export class Analysis extends APIResource {
  /**
   * Orchestrates three data sources into a single analysis report:
   *
   * 1. Stock + order history from the database
   * 2. Upcoming issues scraped from Grand Comics Database (GCD)
   * 3. OpenAI narrative summary and recommendations
   *
   * The `scraperQuery` defaults to the issue title if omitted. The scraper step is
   * fault-tolerant — if GCD is unavailable the report is still generated without
   * upcoming-issues context.
   */
  retrieve(
    issueID: number,
    query: AnalysisRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.get(path`/api/analysis/${issueID}`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface AnalysisRetrieveParams {
  /**
   * Character or series name to use for the GCD scrape. Defaults to the issue title
   * stored in the database.
   */
  scraperQuery?: string;
}

export declare namespace Analysis {
  export { type AnalysisRetrieveParams as AnalysisRetrieveParams };
}
