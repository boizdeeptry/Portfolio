// Terminal intro content. Command/file names stay English by convention.

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const pad2 = (n) => String(n).padStart(2, '0')

export const TERMINAL = {
  host: 'truong@portfolio',
  shell: 'bash 5.2.26',
  login(date = new Date()) {
    const time = `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`
    const tty = this.host.split('@')[0]
    return `Last login: ${DAYS[date.getDay()]} ${MONTHS[date.getMonth()]} ${date.getDate()} ${time} on ${tty}`
  },
  hint: 'Click a tab above to browse — scroll (or press Enter) to boot the site.',
  enterLabel: '▼ scroll to enter',
  tabs: [
    { cmd: 'about', file: 'about.md', icon: '▢' },
    { cmd: 'systems', file: 'systems/', icon: '▤' },
    { cmd: 'ai', file: 'ai-native.sh', icon: '▽' },
    { cmd: 'contact', file: 'contact.sh', icon: '▷' },
  ],
  output: {
    about: [
      '# whoami',
      'Trường — aka boizdeeptry.',
      'Head of Technology @ Midu Group (MenaQ7).',
      '12 production systems · 21 repositories · 7 engineers.',
      'I turn lean teams into AI-native engineering organizations.',
    ],
    systems: [
      '# systems/  (12 in production — highlights)',
      '- DDCC        child height prediction — core consumer product',
      '- zalo-llm    LLM assistant — OpenClaw · RAG · fine-tuned models',
      '- PRM         partner platform — orders, revenue, commissions',
      '- CDP         customer data platform — every sales channel, one store',
      '- sso+storage shared platform foundations, used by 100% of products',
      '- ...and 7 more',
    ],
    ai: [
      'Most teams add AI. We rebuilt the team around it.',
      '- Claude Code as the standard engineering workflow',
      '- custom skill plugins encode our design system + coding standards',
      '- LLM/RAG shipped straight to the Zalo customer channel',
      '# result: 12 → 7 engineers · ~2× delivery throughput',
    ],
    contact: [
      'Email    manvantruong2k@gmail.com',
      'LinkedIn linkedin.com/in/boizdeeptry',
      'Base     Hanoi, Vietnam',
      'Type a message and hit Enter:',
    ],
  },
}
