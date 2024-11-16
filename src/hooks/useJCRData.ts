import { Journal, JournalSearchFilter } from "@/types";
import journalsJson from "../assets/jcr.json";

const allJournals = journalsJson as Journal[];
const keys = Object.keys(allJournals[0]);

export default function useJCRData({
  name,
  issn,
  eissn,
}: JournalSearchFilter = {}): {
  journals: Journal[];
  keys: string[];
} {
  const journals = allJournals
    .filter((journal) => {
      let res = true;
      if (name)
        res = res && journal.name.toLowerCase().includes(name.toLowerCase());
      if (issn) res = res && journal.ISSN.includes(issn);
      if (eissn) res = res && journal.eISSN.includes(eissn);
      return res;
    })
    .sort(
      (a, b) =>
        parseInt(a.quartile.replace("Q", "")) -
        parseInt(b.quartile.replace("Q", ""))
    );

  return { journals, keys };
}
