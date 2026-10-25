import { FaqItem } from '@/types/systemly';

export const FAQS: FaqItem[] = [
  {
    q: 'Are the animations scripted videos?',
    a: 'No. Concept flows are step definitions played by a shared engine, so you can pause, step and scrub. Algorithm pages execute the real algorithm on your input and animate the recorded trace.'
  },
  {
    q: 'Do the company pages show real internal architecture?',
    a: 'They are simplified educational models based on public talks and engineering blogs. They illustrate patterns those products are known for, not verified internal designs.'
  },
  {
    q: 'Do I need an account?',
    a: 'No. Bookmarks, learned topics, recent searches and theme are saved in your browser local storage. Accounts and sync come with future API updates.'
  },
  {
    q: 'Where should a beginner start?',
    a: 'System Design Fundamentals: DNS, CDN, reverse proxies and load balancers, then caching and databases, ending with a URL shortener design.'
  },
  {
    q: 'Is this enough for system design interviews?',
    a: 'It covers the vocabulary and trade-offs interviewers probe. Pair the High-Level Design path with timed mock interviews where you talk through a design out loud.'
  }
];
