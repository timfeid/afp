export const business = {
  name: 'Allan Feid Jr, LLC',
  shortName: 'Allan Feid Jr',
  tagline: 'Plumbing & Heating in Livingston, NJ',
  phoneDisplay: '(973) 992-2240',
  phoneTel: '+19739922240',
  email: 'allan@allanfeidplumbing.com',
  address: {
    street: '23 Maple Ave',
    city: 'Livingston',
    state: 'NJ',
    zip: '07039',
    showStreet: false,
  },
  hoursDisplay: 'Monday – Friday, 7:30 AM – 4:00 PM',
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '16:00' },
  ],
  license: 'NJ Master Plumber License #7052',
  licenseNumber: '7052',
  llcFormed: 2018,
  yearsExperience: 40,
  googlePlaceId: 'ChIJz15t62Kpw4kRGdTGE1gyXlI',
  get googleMapsUrl() {
    return `https://www.google.com/maps/place/?q=place_id:${this.googlePlaceId}`;
  },
  get googleReviewUrl() {
    return `https://search.google.com/local/writereview?placeid=${this.googlePlaceId}`;
  },
  rating: undefined as number | undefined,
  reviewCount: undefined as number | undefined,
  sameAs: [
    'https://www.yelp.com/biz/allan-feid-jr-livingston',
  ],
};

export type Town = {
  slug: string;
  name: string;
  county: string;
  blurb: string;
};

export const towns: Town[] = [
  {
    slug: 'livingston',
    name: 'Livingston',
    county: 'Essex',
    blurb:
      'Livingston is our home base. We have been replacing water heaters and boilers here for decades, and we know the split-levels, colonials and ranches on these streets better than anyone.',
  },
  {
    slug: 'millburn',
    name: 'Millburn',
    county: 'Essex',
    blurb:
      'Millburn is a short drive down South Orange Avenue from Livingston. We handle water heater and boiler replacements throughout the township, including older homes still running on their original heating systems.',
  },
  {
    slug: 'roseland',
    name: 'Roseland',
    county: 'Essex',
    blurb:
      'Roseland borders Livingston, so a service call is a quick trip for us. We replace water heaters and boilers and take care of everyday plumbing repairs for Roseland homeowners.',
  },
  {
    slug: 'east-hanover',
    name: 'East Hanover',
    county: 'Morris',
    blurb:
      'Just across the Passaic River from Livingston, East Hanover is the Morris County town we serve most often for water heater replacement, boiler work and plumbing repairs.',
  },
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  primary: boolean;
};

export const services: Service[] = [
  {
    slug: 'water-heater-replacement',
    name: 'Water Heater Replacement',
    short: 'Gas, electric and power-vent water heaters installed to code, with the old unit hauled away.',
    primary: true,
  },
  {
    slug: 'boiler-replacement',
    name: 'Boiler Replacement',
    short: 'Steam and hot water boiler replacement, properly sized and installed for your home.',
    primary: true,
  },
  {
    slug: 'repairs-service',
    name: 'Repairs & Service',
    short: 'Water heater, boiler and plumbing repairs, plus annual boiler service, from a licensed plumber who does the work himself.',
    primary: true,
  },
  {
    slug: 'water-heater-repair',
    name: 'Water Heater Repair',
    short: 'No hot water, pilot problems, leaks and noisy tanks diagnosed and fixed.',
    primary: false,
  },
  {
    slug: 'boiler-repair',
    name: 'Boiler & Heating Repair',
    short: 'No heat, banging pipes, cold radiators and pressure problems on steam and hot water systems.',
    primary: false,
  },
  {
    slug: 'plumbing-services',
    name: 'Plumbing Repairs & Installation',
    short: 'Drains, sewers, faucets, toilets, sump pumps, water lines, disposals and more.',
    primary: false,
  },
];

export const serviceAreaSummary = 'Livingston, Millburn, Roseland and East Hanover, NJ';
