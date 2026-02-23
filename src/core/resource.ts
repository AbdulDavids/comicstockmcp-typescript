// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { ComicStock } from '../client';

export abstract class APIResource {
  protected _client: ComicStock;

  constructor(client: ComicStock) {
    this._client = client;
  }
}
