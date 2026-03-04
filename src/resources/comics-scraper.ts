// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

/**
 * Scrapes upcoming comic issue data from the Grand Comics Database (GCD). Used as an enrichment source by the Analysis endpoint.
 */
export class ComicsScraper extends APIResource {
  /**
   * Fetches a list of upcoming comic releases matching the query from the Grand
   * Comics Database website. Results are used to enrich the Analysis report.
   */
  fetch(query: ComicsScraperFetchParams | null | undefined = {}, options?: RequestOptions): APIPromise<void> {
    return this._client.get('/api/comics-scraper', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface ComicsScraperFetchParams {
  /**
   * Character or series name to search for (e.g. 'Spider-Man', 'Batman').
   */
  query?: string;

  /**
   * Publication year filter. Defaults to the current year.
   */
  year?: number;
}

export declare namespace ComicsScraper {
  export { type ComicsScraperFetchParams as ComicsScraperFetchParams };
}
