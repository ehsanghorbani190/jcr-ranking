export type Journal = {
  name: string;
  abbreviaton: string;
  ISSN: string;
  eISSN: string;
  category: string;
  eddition: string;
  citations: number;
  JIF: number;
  quartile: string;
};

export type JournalSearchFilter = {
  name?: string;
  issn?: string;
  eissn?: string;
};
