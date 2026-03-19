/** Syllable data for common lab terms */
const syllableData: Record<string, string> = {
  compressive: "Com·pres·sive",
  strength: "Strength",
  cylinder: "Cyl·in·der",
  concrete: "Con·crete",
  aggregate: "Ag·gre·gate",
  bitumen: "Bi·tu·men",
  asphalt: "As·phalt",
  specimen: "Spec·i·men",
  laboratory: "Lab·o·ra·to·ry",
  calibration: "Cal·i·bra·tion",
  specification: "Spec·i·fi·ca·tion",
  compaction: "Com·pac·tion",
  penetration: "Pen·e·tra·tion",
  moisture: "Mois·ture",
  density: "Den·si·ty",
  permeability: "Per·me·a·bil·i·ty",
  consolidation: "Con·sol·i·da·tion",
  settlement: "Set·tle·ment",
  excavation: "Ex·ca·va·tion",
  reinforcement: "Re·in·force·ment",
  workability: "Work·a·bil·i·ty",
  segregation: "Seg·re·ga·tion",
  plasticizer: "Plas·ti·ciz·er",
  admixture: "Ad·mix·ture",
  formwork: "Form·work",
  viscosity: "Vis·cos·i·ty",
  ductility: "Duc·til·i·ty",
  emulsion: "E·mul·sion",
  gradation: "Gra·da·tion",
  stability: "Sta·bil·i·ty",
  temperature: "Tem·per·a·ture",
  equipment: "E·quip·ment",
  hydraulic: "Hy·drau·lic",
  absorption: "Ab·sorp·tion",
  saturation: "Sat·u·ra·tion",
  procedure: "Pro·ce·dure",
  requirement: "Re·quire·ment",
  acceptable: "Ac·cept·a·ble",
  satisfactory: "Sat·is·fac·to·ry",
  percentage: "Per·cent·age",
  calculation: "Cal·cu·la·tion",
  measurement: "Meas·ure·ment",
  preparation: "Prep·a·ra·tion",
  observation: "Ob·ser·va·tion",
  documentation: "Doc·u·men·ta·tion",
  verification: "Ver·i·fi·ca·tion",
  supervisor: "Su·per·vi·sor",
  technician: "Tech·ni·cian",
  engineer: "En·gi·neer",
  centimeter: "Cen·ti·me·ter",
  millimeter: "Mil·li·me·ter",
  kilogram: "Kil·o·gram",
  megapascal: "Meg·a·pas·cal",
  hydrometer: "Hy·drom·e·ter",
  microscope: "Mi·cro·scope",
  pycnometer: "Pyc·nom·e·ter",
  oedometer: "Oe·dom·e·ter",
  bearing: "Bear·ing",
  capacity: "Ca·pac·i·ty",
  optimum: "Op·ti·mum",
  maximum: "Max·i·mum",
  minimum: "Min·i·mum",
  standard: "Stan·dard",
  modified: "Mod·i·fied",
  sample: "Sam·ple",
  result: "Re·sult",
  report: "Re·port",
  approved: "Ap·proved",
  rejected: "Re·ject·ed",
  safety: "Safe·ty",
  surface: "Sur·face",
  analysis: "A·nal·y·sis",
  material: "Ma·te·ri·al",
  horizontal: "Hor·i·zon·tal",
  vertical: "Ver·ti·cal",
  diameter: "Di·am·e·ter",
  revolution: "Rev·o·lu·tion",
  weathering: "Weath·er·ing",
};

export function getSyllables(word: string): string | null {
  const lower = word.toLowerCase().replace(/[^a-z]/g, "");
  return syllableData[lower] || null;
}

/** Settings storage */
const SYLLABLE_KEY = "lab-english-show-syllables";

export function getShowSyllables(): boolean {
  return localStorage.getItem(SYLLABLE_KEY) !== "false";
}

export function setShowSyllables(show: boolean): void {
  localStorage.setItem(SYLLABLE_KEY, show ? "true" : "false");
}
