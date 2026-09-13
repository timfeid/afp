export function serviceSchema(site: URL, opts: { name: string; description: string; path: string; type?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: opts.type ?? opts.name,
    name: opts.name,
    description: opts.description,
    url: new URL(opts.path, site).toString(),
    provider: { '@id': `${site}#business` },
    areaServed: ['Livingston', 'Millburn', 'Roseland', 'East Hanover'].map((n) => ({ '@type': 'City', name: `${n}, NJ` })),
  };
}

export function breadcrumbSchema(site: URL, crumbs: { label: string; href?: string }[], currentPath: string) {
  const all = [{ label: 'Home', href: '/' }, ...crumbs];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: new URL(c.href ?? currentPath, site).toString(),
    })),
  };
}
