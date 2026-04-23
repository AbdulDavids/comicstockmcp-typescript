// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Scaffolding endpoint — not used in production. Safe to ignore.
 */
export class WeatherForecast extends APIResource {
  /**
   * Scaffolding weather forecast endpoint (not used)
   */
  retrieve(options?: RequestOptions): APIPromise<WeatherForecastRetrieveResponse> {
    return this._client.get('/api/WeatherForecast', options);
  }
}

export type WeatherForecastRetrieveResponse =
  Array<WeatherForecastRetrieveResponse.WeatherForecastRetrieveResponseItem>;

export namespace WeatherForecastRetrieveResponse {
  /**
   * Scaffolding type — not used in production.
   */
  export interface WeatherForecastRetrieveResponseItem {
    date?: string;

    summary?: string | null;

    temperatureC?: number;

    temperatureF?: number;
  }
}

export declare namespace WeatherForecast {
  export { type WeatherForecastRetrieveResponse as WeatherForecastRetrieveResponse };
}
