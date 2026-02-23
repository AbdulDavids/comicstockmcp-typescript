// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Email extends APIResource {
  /**
   * Send a transactional email
   */
  send(body: EmailSendParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/api/Email/send', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Sends an HTML email newsletter to the specified recipient. In a production setup
   * this is typically a mailing-list address.
   */
  sendNewsletter(body: EmailSendNewsletterParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/api/Email/send-newsletter', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Email send request used for both transactional emails and newsletters.
 */
export interface SendEmail {
  /**
   * HTML body of the email.
   */
  htmlBody?: string | null;

  /**
   * Email subject line.
   */
  subject?: string | null;

  /**
   * Recipient email address.
   */
  to?: string | null;
}

export interface EmailSendParams {
  /**
   * HTML body of the email.
   */
  htmlBody?: string | null;

  /**
   * Email subject line.
   */
  subject?: string | null;

  /**
   * Recipient email address.
   */
  to?: string | null;
}

export interface EmailSendNewsletterParams {
  /**
   * HTML body of the email.
   */
  htmlBody?: string | null;

  /**
   * Email subject line.
   */
  subject?: string | null;

  /**
   * Recipient email address.
   */
  to?: string | null;
}

export declare namespace Email {
  export {
    type SendEmail as SendEmail,
    type EmailSendParams as EmailSendParams,
    type EmailSendNewsletterParams as EmailSendNewsletterParams,
  };
}
