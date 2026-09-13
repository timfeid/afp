interface ImportMetaEnv {
  readonly SMTP_HOST?: string;
  readonly SMTP_PORT?: string;
  readonly SMTP_USER?: string;
  readonly SMTP_PASS?: string;
  readonly FORM_TO_EMAIL?: string;
  readonly FORM_FROM_EMAIL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
