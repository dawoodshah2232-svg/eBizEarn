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
  {
    slug: 'how-escrow-protects-online-task-work',
    title: 'How Escrow Protects Both Sides of Online Task Work',
    dek: 'You do the work, they hold the money, nobody gets burned. Here is how escrow actually works on task platforms — and what to check before you accept a job.',
    metaDescription:
      'How escrow works on online task platforms: funds are held before work starts and released on approval. What earners and buyers should verify before accepting a task.',
    category: 'Guides',
    author: 'eBizEarn Insights',
    authorRole: 'Editorial Team',
    publishedAt: '2026-09-25',
    readMinutes: 6,
    coverImage: '/images/blog/escrow-protection-guide.webp',
    coverAlt: 'Two hands shaking over a signed contract with a golden shield symbolizing escrow protection',
    blocks: [
      {
        type: 'lead',
        text: 'The oldest problem in freelance work is also the simplest: the worker is afraid of not getting paid, and the buyer is afraid of paying for nothing. Escrow solves it with a third step between the two — the money is locked in before the work starts, and released only when the agreed result is delivered and approved.',
      },
      {
        type: 'paragraph',
        text: 'On a well-designed task platform, the flow looks like this. A buyer posts a task and funds it — the amount moves out of their balance into escrow, where neither party can touch it. The earner sees that the money is secured and starts work with confidence. When the work is submitted, the buyer reviews it against the task requirements. Approve, and the funds release to the earner. Dispute, and the platform reviews the evidence from both sides.',
      },
      { type: 'heading', text: 'Why funded-before-work matters' },
      {
        type: 'paragraph',
        text: 'The critical detail is timing. Escrow only protects you if the funds are locked before you lift a finger. A task that asks you to start work on a promise — "pay you after, trust me" — has no escrow at all, whatever the platform claims. Before accepting any task, confirm the funded status in the task details. If the money is not visibly secured, treat the task as unprotected.',
      },
      {
        type: 'paragraph',
        text: 'For buyers, the mirror rule applies: never pay outside the platform to "save fees." Off-platform payment removes every protection escrow gives you — no verified delivery, no dispute process, no record. The fee is the price of the guarantee.',
      },
      { type: 'heading', text: 'What happens in a dispute' },
      {
        type: 'paragraph',
        text: 'Disputes are where escrow earns its keep. When buyer and earner disagree, the platform examines the task brief, the submitted work, and the message history. This is why documentation matters on both sides: buyers should write precise requirements with examples of acceptable work, and earners should keep their submissions and communications inside the platform where they are timestamped.',
      },
      {
        type: 'list',
        items: [
          'Read the task brief twice before starting — most disputes come from misunderstood requirements, not bad faith.',
          'Submit exactly what was asked, in the format asked. Extras do not compensate for missing requirements.',
          'Keep all communication on the platform so there is a record if anything is disputed.',
          'Never start work on a task that is not visibly funded in escrow.',
          'If a buyer asks you to communicate or get paid off-platform, decline — it voids your protection.',
        ],
      },
      { type: 'heading', text: 'Escrow is a tool, not a guarantee' },
      {
        type: 'paragraph',
        text: 'An honest note to close with: escrow dramatically reduces risk, but it cannot eliminate it. Release windows, review periods, and dispute outcomes all depend on the platform operating fairly — which is why choosing a reputable platform matters as much as understanding the mechanism. Escrow protects honest people from dishonest situations. It works best when both sides act in good faith and document everything.',
      },
      {
        type: 'quote',
        text: 'The money moves first, the work moves second, and trust is what fills the gap in between.',
      },
    ],
    sources: [
      {
        label: 'U.S. Federal Trade Commission: tips for avoiding job scams',
        url: 'https://consumer.ftc.gov/articles/job-scams',
      },
    ],
  },
  {
    slug: 'spotting-scams-online-earning-offers',
    title: 'Spotting Scams: Red Flags in Online Earning Offers',
    dek: 'Real earning opportunities never ask you to pay to start, and never rush you. The red flags that separate legitimate task platforms from scams — and what to do when you spot one.',
    metaDescription:
      'How to spot scams in online earning offers: upfront fees, off-platform payments, guaranteed income claims, and pressure tactics. Red flags and what to do about them.',
    category: 'Safety',
    author: 'eBizEarn Insights',
    authorRole: 'Editorial Team',
    publishedAt: '2026-09-25',
    readMinutes: 7,
    coverImage: '/images/blog/spotting-earning-scams.webp',
    coverAlt: 'A magnifying glass over a laptop showing a suspicious job offer with warning signs',
    blocks: [
      {
        type: 'lead',
        text: 'Every legitimate way to earn online has an illegitimate twin designed to look exactly like it. The scams are not always obvious — the best ones borrow the language, design, and structure of real platforms. What gives them away is not how they look, but how they behave. Learn the behaviors, and you can spot a scam in under a minute.',
      },
      { type: 'heading', text: 'Red flag 1: you have to pay to start earning' },
      {
        type: 'paragraph',
        text: 'This is the single most reliable signal. Legitimate platforms earn money from completed work — from buyers, from commissions on transactions, from subscriptions for premium features. They do not need your "activation fee," "training deposit," or "starter kit" payment. Any offer that requires you to pay before you can earn is, at best, a terrible deal and, at worst, an outright scam. Real jobs pay you; they do not charge you for the privilege of working.',
      },
      { type: 'heading', text: 'Red flag 2: guaranteed income claims' },
      {
        type: 'paragraph',
        text: '"Earn $500 a day from your phone, guaranteed." Real earning depends on your skills, effort, task availability, and market demand — no honest platform can guarantee your income. Guarantees are marketing for scams. Treat any specific earnings promise, especially a large round number with no conditions attached, as a warning sign.',
      },
      { type: 'heading', text: 'Red flag 3: pressure to move off-platform' },
      {
        type: 'paragraph',
        text: 'Scammers want you off the platform because platforms have records, escrow, and dispute processes. "Let\u2019s continue on WhatsApp/Telegram" early in a conversation — especially combined with payment talk — is a classic maneuver. Legitimate buyers and platforms have no reason to dodge the system that protects you.',
      },
      { type: 'heading', text: 'Red flag 4: urgency and secrecy' },
      {
        type: 'paragraph',
        text: '"Only 3 spots left, decide in the next hour." "Don\u2019t tell anyone about this opportunity." Real work does not expire in 60 minutes, and real employers do not need your silence. Urgency is a tool to stop you thinking; secrecy is a tool to stop others warning you.',
      },
      { type: 'heading', text: 'Red flag 5: vague work, specific pay' },
      {
        type: 'paragraph',
        text: 'Honest task descriptions are specific about the work and realistic about the pay. Scams invert this: the work is described as "simple tasks anyone can do" while the pay is suspiciously precise and high. If you cannot tell exactly what you would be doing for the money, walk away.',
      },
      { type: 'heading', text: 'What to do when you spot one' },
      {
        type: 'list',
        items: [
          'Stop engaging immediately — do not send money, documents, or personal information.',
          'Report the account or listing on the platform where you found it.',
          'If you shared financial details, contact your bank; if you shared ID documents, watch for identity theft and consider a fraud alert.',
          'Warn others: a quick post in a community forum can save someone else.',
          'Remember the experience without shame — these schemes are professionally designed to deceive. Spotting the next one is the win.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The underlying principle is simple: legitimate earning is work. It requires effort, has variable rewards, operates in the open, and never asks you to pay for access. Anything that inverts that formula — money first, effort vague, pressure high — deserves your suspicion, not your trust.',
      },
    ],
    sources: [
      {
        label: 'U.S. Federal Trade Commission: job scams and how to avoid them',
        url: 'https://consumer.ftc.gov/articles/job-scams',
      },
      {
        label: 'UK Action Fraud: reporting fraud and cyber crime',
        url: 'https://www.actionfraud.police.uk/',
      },
    ],
  },
  {
    slug: 'building-reputation-better-task-work',
    title: 'Building a Reputation That Gets You Picked for Better Tasks',
    dek: 'On task platforms, your profile is your CV and your rating is your interview. How consistent, quality work compounds into access to higher-value tasks.',
    metaDescription:
      'How to build a strong reputation on task platforms: complete your profile, deliver consistently, communicate well, and let ratings compound into better task access.',
    category: 'Guides',
    author: 'eBizEarn Insights',
    authorRole: 'Editorial Team',
    publishedAt: '2026-09-25',
    readMinutes: 6,
    coverImage: '/images/blog/building-task-reputation.webp',
    coverAlt: 'A freelancer profile card with five gold stars and a rising chart representing growing reputation',
    blocks: [
      {
        type: 'lead',
        text: 'On a task platform, nobody interviews you. Your profile, your completion history, and your ratings do the talking — to buyers choosing who gets the work, and to the platform deciding who sees the best tasks first. Reputation is not a vanity metric here. It is the mechanism that sorts who gets access to what.',
      },
      { type: 'heading', text: 'Start with a complete, honest profile' },
      {
        type: 'paragraph',
        text: 'An empty profile is a risk signal. Fill in your skills truthfully, add a clear photo or avatar, and write a short description of what you do well. Do not claim skills you cannot demonstrate — the first task that tests them will expose the gap, and the resulting bad rating costs more than the honesty would have. Specificity beats breadth: "accurate data entry and spreadsheet cleanup" wins more trust than "I can do anything."',
      },
      { type: 'heading', text: 'Take smaller tasks seriously at first' },
      {
        type: 'paragraph',
        text: 'Everyone starts with zero history, which means your first ten tasks matter disproportionately. They are how you earn your first ratings, and ratings are what unlock everything else. Choose initial tasks you can complete excellently rather than impressively — reliability first, ambition second. A streak of on-time, correct completions is the fastest reputation builder there is.',
      },
      { type: 'heading', text: 'Communicate like a professional' },
      {
        type: 'paragraph',
        text: 'Most task disputes are communication failures wearing a quality costume. Confirm you understand the brief before starting. If something is ambiguous, ask — buyers would far rather answer a question than reject a submission. If you will be late, say so early. Professional communication turns an average delivery into a five-star experience, because buyers rate the whole interaction, not just the file you submit.',
      },
      { type: 'heading', text: 'Treat feedback as inventory' },
      {
        type: 'paragraph',
        text: 'Every rating and comment is data. A 4-star rating with a note about formatting tells you exactly what to fix. Thank buyers for feedback, adjust, and let the improvement show in your next submissions. Earners who visibly improve get something better than ratings — they get repeat buyers, and repeat buyers are the most valuable asset on any platform.',
      },
      {
        type: 'list',
        items: [
          'Complete your profile fully and honestly before applying to tasks.',
          'Start with tasks you can do excellently to build an early rating streak.',
          'Confirm requirements in writing before starting ambiguous tasks.',
          'Deliver on time, every time — reliability compounds faster than brilliance.',
          'Ask satisfied buyers for ratings; most will happily leave one if asked politely.',
          'Never dispute a fair rating — fix the underlying issue instead.',
        ],
      },
      { type: 'heading', text: 'The compound effect' },
      {
        type: 'paragraph',
        text: 'Reputation works like interest. Each good rating makes the next task slightly easier to win; each repeat buyer reduces the time you spend hunting for work; each month of consistent delivery raises the ceiling of what you can charge. There is no shortcut to this — which is exactly why it is valuable. The earners getting the best tasks are usually not the most talented. They are the most reliably good.',
      },
      {
        type: 'quote',
        text: 'On platforms, trust is the currency and consistency is how you mint it.',
      },
    ],
    sources: [
      {
        label: 'U.S. Federal Trade Commission: job scams and safe earning',
        url: 'https://consumer.ftc.gov/articles/job-scams',
      },
    ],
  },
  {
    slug: 'payout-schedules-escrow-holds-budgeting',
    title: 'Getting Paid on Platform Time: How Earners Budget Around Payout Cycles and Escrow Holds',
    dek: 'The task finishes on Tuesday. The money lands two weeks later. On earning platforms, the gap between done and paid is where most cash-flow trouble starts — here is how to plan around it.',
    metaDescription:
      'Task platforms hold earnings in clearance periods and escrow before payout. How Fiverr, Upwork and task marketplaces schedule payments — and how earners budget around the wait.',
    category: 'Guides',
    author: 'eBizEarn Insights',
    authorRole: 'Editorial Team',
    publishedAt: '2026-09-26',
    readMinutes: 7,
    coverImage: '/images/blog/payout-schedules-cashflow-guide.webp',
    coverAlt: 'A smartphone glowing on a dark desk with gold coins streaming toward a golden hourglass, symbolizing the wait between earning and payout',
    blocks: [
      {
        type: 'lead',
        text: 'You finish a task on Tuesday morning and watch your platform balance tick up. By Tuesday evening you have mentally spent half of it — groceries, a bill, a little left over. Then you learn the balance says "pending," and it will stay that way for two weeks. Nothing went wrong. That is simply how the money moves. Every platform between you and your earnings has a schedule, and learning to live on that schedule is one of the most practical skills an online earner can build.',
      },
      {
        type: 'paragraph',
        text: 'This is the part of platform work nobody explains at signup. Your earnings pass through stages — submitted, approved, cleared, withdrawable — and each stage has a clock attached. A payment shown in your dashboard is not money in your account. It is a promise moving through a pipeline, and the pipeline runs at the platform\u2019s pace, not yours.',
      },
      { type: 'heading', text: 'Why the wait exists at all' },
      {
        type: 'paragraph',
        text: 'The holds are not there to annoy you. They are the platform\u2019s seatbelt. A clearance period gives buyers time to review the work, flag problems, and start disputes before the money becomes untouchable. It also protects against chargebacks and fraud — a platform that released every payment instantly would bleed money to scammers and pass the cost to honest earners through higher fees. The wait is the price of the guarantee.',
      },
      { type: 'heading', text: 'How the big platforms actually schedule payments' },
      {
        type: 'paragraph',
        text: 'The timelines differ enough that it pays to know the one you work on. On Fiverr, completed order revenue sits in a 14-day clearance period for new sellers, dropping to 7 days once you reach higher seller tiers. On Upwork, hourly work runs on a strict weekly billing cycle — the week runs Monday to Sunday UTC, clients get Monday through Friday to review the logged hours, and the payment clears roughly ten days after the billing week ends. Fixed-price work on Upwork is released when the client approves it, or automatically after a set period if nothing is disputed, followed by a short security hold before you can withdraw.',
      },
      {
        type: 'paragraph',
        text: 'Task-style platforms add their own layer: escrow. The buyer\u2019s funds are locked before you start, which protects you — but the release still waits on approval, review windows, and dispute periods. One recent analysis of freelancer cash flow put it bluntly: for earners managing tight budgets, "every day of delay is a day of financial stress." The pipeline is working as designed. You just have to design your spending around it.',
      },
      { type: 'heading', text: 'The hidden tax between the platform and your wallet' },
      {
        type: 'paragraph',
        text: 'The clearance period is not the only delay — or the only cost. Withdrawing takes its own time: PayPal withdrawals typically take one to three days, bank wires two to five business days. And if you earn in dollars or euros and spend in another currency, the conversion quietly takes a cut. Bank conversions commonly cost a 2–4% spread, PayPal around 3–4%, while services like Wise typically run 0.5–1.5%. On a $2,000 month, the difference between a 4% conversion cost and a 0.5% one is roughly $84 a month — over a thousand dollars a year. That is real money earned through real work, and the choice of withdrawal method decides who keeps it.',
      },
      {
        type: 'paragraph',
        text: 'There is one more detail worth planning for: most platforms set a minimum withdrawal threshold and charge a flat fee per withdrawal. Withdrawing every small payout as it clears means paying that flat fee repeatedly — the same fee that is negligible on a $500 withdrawal eats a visible chunk of a $25 one. Earners who withdraw frequently in small amounts often lose more to fees than they realize. The smarter habit is to let cleared funds accumulate and withdraw on a schedule — weekly or twice-monthly — so each transfer carries its weight. The buffer you are building for timing gaps doubles as the pile that makes batching possible.',
      },
      { type: 'heading', text: 'Budget on your worst month, not your best week' },
      {
        type: 'paragraph',
        text: 'The standard advice for irregular income is simple and worth repeating: base your monthly budget on your lowest recent month, not your average and definitely not your best week. Look back over two or three months of completed, cleared income and find a conservative number you can repeat. Plan your fixed costs — housing, utilities, food, transport — against that number. Everything above it goes to savings, not lifestyle. Freelance finance guides have preached a version of this for years: pay yourself from what actually lands, and treat pending balances as if they do not exist yet — because until they clear, they effectively do not.',
      },
      {
        type: 'paragraph',
        text: 'Context helps too. India\u2019s Economic Survey 2025-26 puts the country\u2019s gig workforce at 12 million in FY25, up from 7.7 million in FY21 — 55% growth in four years, now more than 2% of the total workforce. Millions of earners are navigating this exact timing problem. The ones who last are the ones who build systems, not just skills.',
      },
      { type: 'heading', text: 'Build a one-cycle buffer' },
      {
        type: 'paragraph',
        text: 'The single most useful financial target for a platform earner is a buffer equal to one full payout cycle of expenses. If your platform clears money in fourteen days, save until you can cover fourteen days of essentials without touching new earnings. Once that buffer exists, the waiting periods stop being emergencies and become background noise. You are no longer living paycheck to payout — you are living one cycle ahead of your own money.',
      },
      {
        type: 'paragraph',
        text: 'Getting there does not require heroics. Set aside a fixed proportion of every cleared payout the moment it lands, before anything else. Small, automatic, every time. A 10% habit on every withdrawal quietly becomes the buffer in a few months, and from there it compounds into savings.',
      },
      {
        type: 'list',
        items: [
          'Learn your platform\u2019s exact timeline: clearance period, review window, withdrawal processing days. Write it down.',
          'Never budget against a pending balance. Count only cleared, withdrawable funds as income.',
          'Compare withdrawal methods on total cost — fees plus conversion spread plus speed — not just the fee line.',
          'Keep one month of essential expenses separate as a buffer before you upgrade your lifestyle.',
          'If taxes apply to your earnings, set that share aside when the money clears — freelancers in the U.S. are commonly advised to reserve 25–30% — so you are never raided by your own tax bill.',
          'Track everything. A simple spreadsheet of submitted, pending, cleared, and withdrawn beats memory every time.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The platforms will not change their pace for you. Clearance periods, review windows, and withdrawal queues are load-bearing parts of how trust works online. But once you stop expecting the money on your schedule and start planning on the platform\u2019s, the stress drains out of the system. Do the work, track the pipeline, keep a buffer — and let the money arrive when it arrives. You will already have spent it wisely: never.',
      },
      {
        type: 'paragraph',
        text: 'A buffer also protects against the rarest but nastiest surprise: a payment that gets reversed after you counted it. Disputes resolved against you, chargebacks, and fraud clawbacks can pull cleared money back. Platforms handle this with their own rules, but the practical defense is the same — keep your safety margin in cleared funds you do not need this week, so one reversal is an annoyance instead of a crisis. Platforms with visible escrow and documented dispute processes make this less likely, but "less likely" is not "impossible," and the cost of the protection is one extra week of expenses sitting in reserve.',
      },
      {
        type: 'quote',
        text: 'Treat pending balances as if they do not exist. Until the money clears, it is a promise, not a paycheck.',
      },
    ],
    sources: [
      {
        label: 'Upwork vs Fiverr vs Freelancer: payout cycles and fee comparison 2026 (Within Nigeria)',
        url: 'https://www.withinnigeria.com/piece/2025/11/14/upwork-vs-fiverr-vs-freelancer-where-to-make-most-money-in-2026/',
      },
      {
        label: 'Fiverr vs Upwork for beginners in 2026: fees, clearance periods, payouts (Medium)',
        url: 'https://medium.com/@gz1416288973/fiverr-vs-upwork-which-freelance-platform-is-better-for-beginners-in-2026-96b9e7b22d76',
      },
      {
        label: 'The freelancer economy: currency conversion costs and payout timing (Medium)',
        url: 'https://medium.com/@harrywil/the-freelancer-economy-has-1-5-d3411b02a71c',
      },
      {
        label: 'How gig workers can build wealth on irregular income (Kokthum / Business News, Sep 2026)',
        url: 'https://www.kokthum.com/business/how-to-build-wealth-on-irregular-income-business-news',
      },
      {
        label: 'Financial planning for gig workers: cash flow, taxes, and budgeting (Medium)',
        url: 'https://medium.com/@runjunhazarika512/financial-planning-for-gig-workers-in-expensive-cities-smart-money-habits-for-freelancers-in-nyc-69d39f4f6e47',
      },
    ],
  },
];

export const getArticle = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug);
