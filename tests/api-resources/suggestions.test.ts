// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ComicStock from 'comicstockmcp';

const client = new ComicStock({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource suggestions', () => {
  // Mock server tests are disabled
  test.skip('getBestsellers', async () => {
    const responsePromise = client.suggestions.getBestsellers();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getBestsellers: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.suggestions.getBestsellers({ months: 0, topN: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(ComicStock.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('getLowStock', async () => {
    const responsePromise = client.suggestions.getLowStock();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getLowStock: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.suggestions.getLowStock({ months: 0, threshold: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(ComicStock.NotFoundError);
  });
});
