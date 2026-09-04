// ============================================================
// Site-wide constants for fergus-mccormack.github.io
//
// This is the ONE place to change the name, role, email, public
// profile links and the paper list that feed the navigation bar,
// the footer and the SEO metadata (JSON-LD structured data that
// Google reads). Page text itself lives in content/*.md.
// ============================================================

export interface SitePaper {
  /** Full title as it appears on the paper */
  name: string
  /** Authors in order, using the exact site name for Fergus */
  authors: string[]
  /** Absolute URL of the PDF, or undefined if no public draft */
  url?: string
  /** ISO date of the current version (YYYY-MM-DD) */
  date?: string
  /** One-paragraph abstract (plain text, no HTML) */
  description: string
  /** Free-text status shown to search engines, e.g. "Job market paper" */
  genre: string
}

export const site = {
  name: "Fergus McCormack",
  givenName: "Fergus",
  familyName: "McCormack",
  jobTitle: "PhD Candidate in Economics",
  affiliation: "University of Cambridge",
  affiliationUrl: "https://www.cam.ac.uk/",
  department: "Faculty of Economics",
  departmentUrl: "https://www.econ.cam.ac.uk/",
  email: "fm527@cam.ac.uk",

  // Canonical site address (no trailing slash). GitHub *user* site => root domain.
  url: "https://fergus-mccormack.github.io",
  image: "https://fergus-mccormack.github.io/images/fergus-mccormack.jpg",
  ogImage: "https://fergus-mccormack.github.io/static/og-image.jpg",

  // Default description used when a page has none in its frontmatter.
  description:
    "Fergus McCormack is a PhD candidate in Economics at the University of Cambridge " +
    "working on health economics, labor economics and genoeconomics. " +
    "On the 2026-27 academic job market.",

  // Public profiles. These become schema.org "sameAs" links, which help Google
  // connect this site to the same person elsewhere. Add Google Scholar, ORCID,
  // RePEc/IDEAS or SSRN URLs here as soon as those profiles exist.
  sameAs: [
    "https://www.econ.cam.ac.uk/people/postgraduates/fergus-mccormack",
    "https://www.linkedin.com/in/fergus-mccormack",
    "https://github.com/Fergus-McCormack",
  ],
  linkedin: "https://www.linkedin.com/in/fergus-mccormack",
  github: "https://github.com/Fergus-McCormack",

  knowsAbout: [
    "Health Economics",
    "Labor Economics",
    "Genoeconomics",
    "Behavioral Genetics",
    "Mental Health",
    "Mendelian Randomization",
    "Structural Life-Cycle Models",
    "Applied Microeconomics",
  ],

  // Google Search Console: choose the "HTML tag" verification method and paste
  // the content="..." value here, then commit. Leave empty until then.
  googleSiteVerification: "",

  // Top navigation (slug "" is the home page).
  nav: [
    { text: "Home", slug: "" },
    { text: "Research", slug: "research" },
    { text: "Teaching", slug: "teaching" },
    { text: "CV", slug: "cv" },
  ],

  // Stable file names: these URLs are cited in the CV and applications, so do
  // not rename the PDFs; overwrite them in content/papers/ instead.
  cvPdf: "papers/McCormack_CV.pdf",
  jmpPdf: "papers/McCormack_JMP_The_Depression_Trap.pdf",

  papers: [
    {
      name: "The “Depression Trap”: Genetic Risk, Labor Supply, and the Case for Precision Psychiatry",
      authors: ["Fergus McCormack", "Qianyu Yang"],
      url: "https://fergus-mccormack.github.io/papers/McCormack_JMP_The_Depression_Trap.pdf",
      date: "2026-08-31",
      genre: "Job market paper",
      description:
        "We analyze how genetic risk for depression influences the joint dynamics of labor supply, health, and treatment decisions using a life-cycle model and longitudinal data. We find that a one standard deviation increase in genetic risk for depression substantially reduces earnings and employment and worsens health. We identify the “depression trap”, a self-reinforcing cycle of depression and non-employment, as the central mechanism linking genetic risk to persistent labor market exit. As publicly funded psychotherapy is free at the point of use and supply-constrained, we evaluate prioritizing access to high-risk individuals, and find that this raises employment and lowers severe depression, resulting in a net fiscal surplus. We also simulate the economic and health consequences associated with recent declines in mental health and explore potential policy solutions.",
    },
    {
      name: "The Economic Cost of Depression: Triangulation Using Panel and Mendelian Randomization Analyses",
      authors: ["Fergus McCormack", "Robert Campbell", "Benjamin Woolf"],
      url: "https://fergus-mccormack.github.io/papers/McCormack_Campbell_Woolf_Economic_Cost_of_Depression.pdf",
      date: "2026-08-31",
      genre: "Working paper",
      description:
        "Depression, poor educational attainment, poor health, and unemployment form a correlated web that reduces human flourishing, but the causal links between them are unclear. We estimate the causal effect of depressive symptoms on educational and labour market outcomes by triangulating four research designs across economic, clinical, and genomic data. In UK longitudinal data (305,686 person-wave observations), a one standard-deviation (s.d.) rise in depressive symptoms lowers income in the following wave by 0.036 s.d. and employment by 0.044 s.d.; instrumenting symptoms with bereavement gives larger but less precise short-run estimates. Two genetic designs capture lifetime liability: two-sample Mendelian randomization on summary statistics from up to 2.1 million individuals, and a polygenic index instrument in the genotyped UKHLS subsample. In these designs, genetic liability to depression lowers income by 0.24–0.49 s.d., educational attainment by 0.14–0.46 s.d., and occupational status by 0.36–0.65 s.d. The education and occupation penalties fall almost entirely on women, while most of the income penalty for both sexes runs through employment rather than pay. The economic cost of depression accumulates over the life course, so treatment before labour-market entry may yield the largest economic returns.",
    },
    {
      name: "Not All Made Equal? Genetics, Ageing and Wellbeing: Evidence from the UK",
      authors: ["Fergus McCormack", "Alan Piper"],
      genre: "Working paper (draft available upon request)",
      description:
        "Life satisfaction is U-shaped over the life cycle, and roughly 40% of the variation in wellbeing is heritable. We ask how genetic predispositions for wellbeing interact with ageing. Matching a wellbeing polygenic index (PGI) to panel data from the British Household Panel Survey and the UK Household Longitudinal Study, we establish three results. First, the PGI predicts substantial and statistically significant differences in life satisfaction at every point in the life cycle. Second, the U-shaped age profile of wellbeing holds within both high- and low-PGI groups. Third, individuals with a lower PGI face a more pronounced U-shape, so the genetic wellbeing gap is widest in middle age and narrower at the tails. The first two findings are robust to a within-family design that controls for parental PGIs, while the third fails to replicate in the within-family sample. A mediation analysis shows that declining physical health accounts for roughly one-third of the age variation in the gap.",
    },
    {
      name: "The Genetic Child Penalty: Evidence from the UK and Norway",
      authors: ["Fergus McCormack", "Emil Sørensen", "Stephanie von Hinke", "Eivind Ystrøm"],
      genre: "Work in progress",
      description:
        "Does the child penalty reinforce genetic inequality? Using Norwegian administrative data linked to molecular genetic information, we estimate gene–environment (G×E) event studies around first birth. Women below the median polygenic index for educational attainment experience an employment penalty 1.5 percentage points larger initially, widening to 4 percentage points after ten years. The gap persists controlling for education, implying mechanisms beyond schooling. UK household panel data corroborate the pattern. Policies reducing the child penalty generate a double dividend: improving gender equality and attenuating the economic consequences of the genetic lottery.",
    },
    {
      name: "Genetic and Economic Interaction in Health Formation: The Case of Obesity",
      authors: ["Pietro Biroli", "Fergus McCormack", "Qianyu Yang"],
      genre: "Work in progress",
      description:
        "We develop a structural model of health and human capital formation in which genetic endowments shape both the utility cost of health investments and the technology of health production, and hence the incentives to invest in healthy habits. Taking body mass index as the measure of health and physical activity and food intake as the investments, we study how these choices interact with variants in FTO and other loci associated with BMI in genome-wide association studies, using cohort data on British adolescents and US adults.",
    },
  ] as SitePaper[],
}
