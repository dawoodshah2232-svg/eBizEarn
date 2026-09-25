/**
 * eBizEarn Insights — article catalog.
 *
 * Articles are authored content stored as typed blocks (no CMS round-trip).
 * Each entry powers the /blog index and the /blog/:slug article page.
 */

export type ArticleBlock =
  | { type: 'lead'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'list'; items: string[] };

export interface ArticleSource {
  label: string;
  url: string;
}

export interface Article {
  slug: string;
  title: string;
  dek: string;
  metaDescription: string;
  category: string;
  author: string;
  authorRole: string;
  publishedAt: string; // ISO date
  readMinutes: number;
  coverImage: string;
  coverAlt: string;
  blocks: ArticleBlock[];
  sources: ArticleSource[];
}

export const articles: Article[] = [
  {
    slug: 'microtask-growing-up-ai-2026',
    title: 'The Micro-Task Is Growing Up: Why AI Made Small Verified Jobs More Valuable in 2026',
    dek: 'DoorDash started paying drivers to film themselves doing laundry. It sounded absurd. It was actually the clearest signal yet of where gig work is headed — and why the smallest verified jobs are getting more valuable, not less.',
    metaDescription:
      'In March 2026 DoorDash started paying drivers to film their laundry. Why the gig economy\u2019s smallest verified jobs became AI\u2019s most valuable raw material \u2014 and what earners should do about it.',
    category: 'Gig Economy',
    author: 'eBizEarn Insights',
    authorRole: 'Editorial Team',
    publishedAt: '2026-09-25',
    readMinutes: 6,
    coverImage: '/images/blog/microtask-shift-2026.jpg',
    coverAlt: 'Hands holding a glowing smartphone over a dark desk, gold circuit traces over a night city skyline',
    blocks: [
      {
        type: 'lead',
        text: 'In March 2026, Bloomberg reported that DoorDash had started paying some of its delivery drivers to film themselves doing household chores. Not delivering food. Filming laundry, tidying rooms, photographing store shelves. The program was called \u201cTasks,\u201d and the footage \u2014 according to the reporting \u2014 fed the company\u2019s internal AI models, with the possibility of it being shared with third-party partners. DoorDash had looked at its millions of workers, its app, its incentive system, and seen something new: a data pipeline.',
      },
      {
        type: 'paragraph',
        text: 'It isn\u2019t alone. Uber has built comparable programs through its Uber AI Solutions arm. Across the industry, gig platforms are quietly converting on-demand labor into the thing the AI industry is most desperate for: real-world human behavior, captured at scale, labeled and verified. The gig economy is being repurposed as AI\u2019s physical sensing layer.',
      },
      { type: 'heading', text: 'From penny clicks to expert traces' },
      {
        type: 'paragraph',
        text: 'This is a long way from where micro-work started. A decade ago, the model was Amazon Mechanical Turk: fractions of a cent for tagging an image or transcribing a sentence. The work was deliberately deskilled \u2014 anyone could do it, which meant it paid like anyone could do it.',
      },
      {
        type: 'paragraph',
        text: 'That era is ending, and the reason is agentic AI. The 2026 generation of AI doesn\u2019t just answer questions; it takes actions \u2014 logging into systems, rerouting shipments, completing transactions. Training that kind of model doesn\u2019t need more labeled photos. It needs what the industry calls action-chain datasets: step-by-step recordings of human experts solving real problems. One logistics firm assembled 50,000 \u201cexpert action traces\u201d of managers rerouting ships during storms, and cut human intervention for mid-level disruptions by 30%.',
      },
      { type: 'heading', text: 'The pay ladder flipped' },
      {
        type: 'paragraph',
        text: 'When the work gets harder, the pay follows. A new class of annotation platforms \u2014 Mindrift, Surge AI, Alignerr \u2014 doesn\u2019t hire clickworkers; it hires for judgment. Annotators evaluate reasoning coherence, ethical alignment, and bias in AI responses. And at the top of the market, firms like Mercor now pay white-collar professionals serious rates to teach AI their own jobs: mathematicians annotating proofs, lawyers marking up briefs, professors grading essays. The New York Times flagged it as one of Silicon Valley\u2019s fastest-growing niches.',
      },
      {
        type: 'quote',
        text: 'The micro-task isn\u2019t dying. It\u2019s getting a promotion.',
        cite: 'On BCG\u2019s April 2026 finding that 50\u201355% of U.S. jobs will be reshaped by AI \u2014 with augmentation, not replacement, dominating',
      },
      {
        type: 'paragraph',
        text: 'This is the part most \u201cAI will kill gig work\u201d takes get wrong. BCG\u2019s April 2026 analysis estimates that 50\u201355% of U.S. jobs will be reshaped by AI in the next two to three years \u2014 but it expects augmentation to dominate outright replacement. When AI does more, it needs more human verification, not less.',
      },
      { type: 'heading', text: 'Proof of human is the product now' },
      {
        type: 'paragraph',
        text: 'Here\u2019s the deeper shift. AI can now generate text, images, video, and reviews at effectively zero cost. That makes one thing scarce: credible evidence that a real human did a real thing. Brands buying engagement, researchers training models, platforms fighting fraud \u2014 they all have the same problem. Anyone can fake a click. Nobody can fake a verified human.',
      },
      {
        type: 'paragraph',
        text: 'That\u2019s why the verification layer has become the valuable part of the stack. Computer-vision checks on screenshots. Fraud telemetry that spots bots. Escrow that only releases payment on verified proof of work. The task itself might take five minutes; the proof that a human did it honestly is what buyers are actually paying for.',
      },
      { type: 'heading', text: 'The scale of the shift' },
      {
        type: 'paragraph',
        text: 'The numbers frame how big this is getting. Upwork\u2019s research puts the number of Americans who freelanced in the past year above 70 million. Intuit has forecast that 43% of the U.S. workforce could be freelance by 2026. The World Bank expects digital gig workers worldwide to pass 350 million by 2027. This is no longer a side-hustle economy \u2014 it\u2019s infrastructure.',
      },
      { type: 'heading', text: 'What smart earners do about it' },
      {
        type: 'list',
        items: [
          'Pick platforms that verify, not just list. Where every submission is checked, quality workers win and race-to-the-bottom pricing loses.',
          'Treat your rating like a credit score. On verified task platforms, a strong completion record unlocks better tasks \u2014 guard it.',
          'Specialize upward. Basic image labeling is a commodity; domain expertise in legal, medical, or technical review is where rates climb.',
          'Watch the fee cut. Typical platform fees run 15\u201325% \u2014 factor it into every hour you commit.',
          'Learn the AI-training task formats. RLHF-style evaluation and action-trace tasks are the fastest-growing category; familiarity is an edge.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Ten years ago, the micro-task was the bottom rung of the internet economy \u2014 the job you did when nothing else was available. In 2026, the smallest verified unit of human work has become the raw material of the AI economy. DoorDash paying drivers to film their laundry isn\u2019t a punchline. It\u2019s a preview. The earners who win this round won\u2019t be the ones doing the most tasks. They\u2019ll be the ones whose work can be trusted.',
      },
    ],
    sources: [
      {
        label: 'Bloomberg reporting on DoorDash \u201cTasks\u201d (via Medium, March 2026)',
        url: 'https://medium.com/activated-thinker/you-built-the-ai-the-ai-replaced-you-now-someone-in-lagos-is-finishing-the-job-17a7849c98d7',
      },
      {
        label: 'AI training data trends 2026: action-chain datasets (Medium)',
        url: 'https://medium.com/@zara.abraham.111/ai-training-data-trends-you-cant-ignore-in-2026-51e8df464e90',
      },
      {
        label: 'The evolving landscape of AI training and data annotation companies in 2026',
        url: 'https://aihaberleri.org/en/news/the-evolving-landscape-of-ai-training-and-data-annotation-companies-in-2026',
      },
      {
        label: 'AI agents, Mercor, and BCG\u2019s 2026 workforce forecast (WebProNews)',
        url: 'https://www.webpronews.com/ai-agents-and-enterprise-tools-surge-as-companies-race-to-boost-output-in-2026/',
      },
      {
        label: 'Gig economy statistics 2026: 70M+ U.S. freelancers, 350M global gig workers by 2027',
        url: 'https://mewayz.space/mni/blog/60-gig-economy-platform-statistics-earnings-growth-and-challenges-2026',
      },
      {
        label: 'Gig economy platform statistics: fees, earnings, challenges',
        url: 'http://rickyspears.com/blogging/gig-economy-statistics/',
      },
    ],
  },
];

export const getArticle = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug);
