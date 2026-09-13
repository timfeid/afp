import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

const env = import.meta.env;
const TO = env.FORM_TO_EMAIL || 'linda@allanfeidplumbing.com';
const SMTP_HOST = env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(env.SMTP_PORT || 465);
const SMTP_USER = env.SMTP_USER;
const SMTP_PASS = env.SMTP_PASS;
const FROM = env.FORM_FROM_EMAIL || (SMTP_USER ? `Website <${SMTP_USER}>` : undefined);

const MAX = { name: 120, email: 200, phone: 40, details: 4000 };

function clean(v: FormDataEntryValue | null, max: number) {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function redirect(path: string) {
  return new Response(null, { status: 303, headers: { Location: path } });
}

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirect('/contact/?error=invalid');
  }

  if (clean(form.get('company'), 100)) return redirect('/contact/thanks/');

  const name = clean(form.get('name'), MAX.name);
  const email = clean(form.get('email'), MAX.email);
  const phone = clean(form.get('phone'), MAX.phone);
  const details = clean(form.get('details'), MAX.details);

  if (!name) return redirect('/contact/?error=name');
  if (!email && !phone) return redirect('/contact/?error=contact');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return redirect('/contact/?error=email');

  if (!SMTP_USER || !SMTP_PASS || !FROM) {
    console.error('SMTP_USER / SMTP_PASS not set; contact form submission dropped', { name, email, phone });
    return redirect('/contact/?error=send');
  }

  const rows = [
    ['Name', name],
    ['Email', email || '—'],
    ['Phone', phone || '—'],
    ['Details', details || '—'],
  ];
  const html = `<h2>New website inquiry</h2><table>${rows
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">${k}</td><td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
    .join('')}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transport.sendMail({
      from: FROM,
      to: TO,
      replyTo: email || undefined,
      subject: `Website inquiry from ${name}${phone ? ` (${phone})` : ''}`,
      text,
      html,
    });
  } catch (err) {
    console.error('SMTP send failed', err);
    return redirect('/contact/?error=send');
  }
  return redirect('/contact/thanks/');
};

export const GET: APIRoute = () => redirect('/contact/');
