export interface PopupSettings {
  enabled: boolean;
  title: string;
  message: string;
  linkText: string;
  linkUrl: string;
}

export interface HomeHeroSettings {
  subtitle: string;
  titleHighlight: string;
  titleText: string;
  intro: string;
  logoImage: string;
  videoUrl: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
}

export interface HomeBannerSettings {
  image: string;
  subtitle: string;
  title: string;
  text: string;
  buttonText: string;
  buttonLink: string;
}

export interface HomeSettings {
  hero: HomeHeroSettings;
  banner: HomeBannerSettings;
  matinalesVideoUrl: string;
  emploiVideoUrl: string;
}

export interface AboutSettings {
  heroTitle: string;
  statsImage: string;
  statNumber: string;
  statText: string;
  title20Years: string;
  paragraph1: string;
  paragraph2: string;
  quote: string;
  pactePdf: string;
}

export interface PresidentSettings {
  image: string;
  title: string;
  quote1: string;
  paragraph1: string;
  paragraph2: string;
  quote2: string;
  name: string;
  role: string;
}

export interface ContactSettings {
  email: string;
  phone: string;
  address: string;
}

export interface JobOffer {
  id: string;
  title: string;
  type: string;
  sector: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  published: string;
}

export interface Company {
  name: string;
  sector: string;
  description: string;
  zone: string;
  logo: string;
  premium?: boolean;
  slug?: string;
  videoUrl?: string;
  websiteUrl?: string;
  phone?: string;
  email?: string;
  employees?: string;
  yearFounded?: string;
  coverImage?: string;
  jobOffers?: JobOffer[];
}

export interface DirectorySettings {
  guidePdf: string;
  companies: Company[];
}

export interface ActionDetail {
  title: string;
  subtitle: string;
  intro: string;
  mainImage: string;
}

export interface ActionsSettings {
  matinales: ActionDetail;
  forum: ActionDetail;
  insertion: ActionDetail;
  label: ActionDetail;
}

export interface AgendaEvent {
  date: string;
  title: string;
  description: string;
  type: string;
  image?: string;
  featured?: boolean;
}

export interface AgendaSettings {
  events: AgendaEvent[];
}

export interface AnniversaryEvent {
  month: string;
  title: string;
  description: string;
  type: string;
}

export interface AnniversaryTimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface AnniversarySettings {
  events: AnniversaryEvent[];
  timeline: AnniversaryTimelineEvent[];
}

export interface MediaGalleryItem {
  url: string;
  name: string;
  type: 'image' | 'video';
}

export interface CVProfile {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  sector: string;
  availability: string;
  contractTypes: string[];
  location: string;
  experience: string;
  diploma: string;
  skills: string[];
  languages: string[];
  summary: string;
  seeking: string;
  avatar: string;
  cvFile: string;
  published: string;
  featured: boolean;
}

export interface CVThequeSettings {
  title: string;
  subtitle: string;
  intro: string;
  profiles: CVProfile[];
}

export interface MembershipBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface MembershipSettings {
  title: string;
  subtitle: string;
  benefits: MembershipBenefit[];
}

export interface AppelAProjetCategory {
  id: string;
  label: string;
  color: string;
  description: string;
}

export interface AppelAProjetSettings {
  categories: AppelAProjetCategory[];
}

export interface Adherent {
  id: string;
  email: string;
  name: string;
  company: string;
  status: 'pending' | 'active' | 'suspended';
}

export interface OrganigramGroup {
  id: string;
  name: string;
  order: number;
}

export interface OrganigramMember {
  id: string;
  groupId: string;
  firstName: string;
  lastName: string;
  atpRole: string;
  companyRole: string;
  photo: string;
}

export interface LegalSettings {
  cgu: string;
  cgv: string;
  mentions: string;
}

export interface SiteContent {
  popup: PopupSettings;
  home: HomeSettings;
  about: AboutSettings;
  president: PresidentSettings;
  contact: ContactSettings;
  directory: DirectorySettings;
  actions: ActionsSettings;
  agenda: AgendaSettings;
  anniversary: AnniversarySettings;
  mediaGallery: MediaGalleryItem[];
  cvtheque: CVThequeSettings;
  membership: MembershipSettings;
  appelAProjet: AppelAProjetSettings;
  adherents: Adherent[];
  organigramGroups: OrganigramGroup[];
  organigram: OrganigramMember[];
  legal: LegalSettings;
}
