export interface SocialLink {
  name: string;
  handle: string;
  url: string;
  description: string;
  category: "Source Code" | "Research" | "Professional" | "Direct Access";
}

export const socials: SocialLink[] = [
  {
    name: "GitHub",
    handle: "@arjunjayesh",
    url: "https://github.com/arjun-jayesh",
    description: "Open-source cognitive architectures, simulation pipelines, and deterministic systems repositories.",
    category: "Source Code"
  },
  {
    name: "Zenodo",
    handle: "DOI / Arjun Jayesh",
    url: "https://doi.org/10.5281/zenodo.18181494",
    description: "Peer-reviewed research datasets, software artifacts, and DOI-indexed scientific publications.",
    category: "Research"
  },
  {
    name: "ORCID",
    handle: "0009-0001-8057-3225",
    url: "https://orcid.org/0009-0001-8057-3225",
    description: "Verified academic contributor profile for computer science and medical informatics research.",
    category: "Research"
  },
  {
    name: "LinkedIn",
    handle: "Arjun Jayesh",
    url: "https://linkedin.com/in/arjunjayesh",
    description: "Engineering leadership dispatches, enterprise architecture case studies, and systems updates.",
    category: "Professional"
  },
  {
    name: "WhatsApp Engineering Desk",
    handle: "+91 90748 11984",
    url: "https://wa.me/919074811984?text=Hello%20kinbo%20Engineer%2C%20I%20would%20like%20to%20discuss%20a%20software%20project.",
    description: "Direct real-time channel to the principal systems engineer from day one. Zero sales buffer.",
    category: "Direct Access"
  }
];
