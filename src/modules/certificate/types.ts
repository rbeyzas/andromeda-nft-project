export interface ICertificateAttribute {
  display_type?: string;
  trait_type: string;
  value: string;
}

export interface ICertificateMetadata {
  institution_name?: string;
  certificate_name?: string;
  recipient_name?: string;
  issue_date?: string;
  image?: string;
  description?: string;
  verification_url?: string;
  attributes?: ICertificateAttribute[];
}

export interface ICertificate {
  id: string;
  owner: string;
  token_uri?: string;
  extension: ICertificateMetadata;
}

export interface ICertificateForm {
  institution_name: string;
  certificate_name: string;
  recipient_name: string;
  recipient_address: string;
  description: string;
  issue_date: string;
  image: string;
  verification_url?: string;
  attributes: ICertificateAttribute[];
}

export interface ICertificateCollection {
  name: string;
  symbol: string;
  cw721: string;
  marketplace?: string;
  certificates: ICertificate[];
}

export interface IEducationInstitution {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  collections: ICertificateCollection[];
}
