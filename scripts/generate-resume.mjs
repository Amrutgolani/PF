/**
 * Generates public/resume/Amrut_Golani_Resume.pdf from the portfolio data files.
 * Dependency-free minimal PDF writer (Helvetica, WinAnsi encoding).
 *
 * Usage: npm run resume
 * Replace the generated file with your official CV at any time — the site only
 * links to /resume/Amrut_Golani_Resume.pdf.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { personal, about } from '../src/data/personal.js';
import { experience } from '../src/data/experience.js';
import { skillCategories } from '../src/data/skills.js';
import { education } from '../src/data/education.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/resume/Amrut_Golani_Resume.pdf');

/* ---------------- layout constants ---------------- */
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;

const COLORS = {
  text: [0.08, 0.1, 0.16],
  muted: [0.36, 0.4, 0.5],
  accent: [0.43, 0.16, 0.85],
  rule: [0.85, 0.87, 0.9],
};

/* ---------------- tiny PDF writer ---------------- */
class Pdf {
  constructor() {
    this.pages = [];
    this.current = null;
    this.newPage();
  }

  newPage() {
    this.current = { ops: [] };
    this.pages.push(this.current);
    this.y = PAGE_H - MARGIN;
  }

  static esc(str) {
    let out = '';
    for (const ch of str) {
      const code = ch.charCodeAt(0);
      if (ch === '(' || ch === ')' || ch === '\\') out += `\\${ch}`;
      else if (code === 0x2013) out += '\\226'; // en dash
      else if (code === 0x2014) out += '\\227'; // em dash
      else if (code === 0x2022) out += '\\225'; // bullet
      else if (code === 0x2019) out += '\\222'; // right single quote
      else if (code === 0x201c) out += '\\223';
      else if (code === 0x201d) out += '\\224';
      else if (code > 126) out += '?';
      else out += ch;
    }
    return out;
  }

  color(rgb) {
    return `${rgb.map((c) => c.toFixed(3)).join(' ')} rg`;
  }

  text(str, x, y, { size = 10, font = 'F1', color = COLORS.text } = {}) {
    this.current.ops.push(`BT /${font} ${size} Tf ${this.color(color)} ${x.toFixed(2)} ${y.toFixed(2)} Td (${Pdf.esc(str)}) Tj ET`);
  }

  rule(x1, y, x2, color = COLORS.rule, width = 0.6) {
    this.current.ops.push(
      `${color.map((c) => c.toFixed(3)).join(' ')} RG ${width} w ${x1.toFixed(2)} ${y.toFixed(2)} m ${x2.toFixed(2)} ${y.toFixed(2)} l S`,
    );
  }

  ensure(height) {
    if (this.y - height < MARGIN) this.newPage();
  }

  build() {
    const objects = [];
    const add = (body) => {
      objects.push(body);
      return objects.length;
    };

    const fontRegular = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
    const fontBold = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
    const pagesId = objects.length + 1 + this.pages.length * 2; // reserve after page+content objects

    const pageIds = [];
    for (const page of this.pages) {
      const stream = page.ops.join('\n');
      const contentId = add(`<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}\nendstream`);
      const pageId = add(
        `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${fontRegular} 0 R /F2 ${fontBold} 0 R >> >> >>`,
      );
      pageIds.push(pageId);
    }

    const realPagesId = add(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`);
    if (realPagesId !== pagesId) throw new Error('Pages object id mismatch');
    const catalogId = add(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
    const infoId = add(
      `<< /Title (${Pdf.esc(`${personal.name} - Resume`)}) /Author (${Pdf.esc(personal.name)}) /Subject (${Pdf.esc(personal.designation)}) /Producer (Portfolio resume generator) >>`,
    );

    let out = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
    const offsets = [];
    objects.forEach((body, i) => {
      offsets.push(Buffer.byteLength(out, 'latin1'));
      out += `${i + 1} 0 obj\n${body}\nendobj\n`;
    });
    const xref = Buffer.byteLength(out, 'latin1');
    out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (const off of offsets) out += `${String(off).padStart(10, '0')} 00000 n \n`;
    out += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R /Info ${infoId} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
    return Buffer.from(out, 'latin1');
  }
}

/* ---------------- text helpers ---------------- */
function wrap(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars) {
      lines.push(line.trim());
      line = w;
    } else {
      line = `${line} ${w}`;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

function charsFor(size, width = CONTENT_W, bold = false) {
  return Math.floor(width / (size * (bold ? 0.56 : 0.5)));
}

/* ---------------- document ---------------- */
const pdf = new Pdf();

function heading(title) {
  pdf.ensure(34);
  pdf.y -= 10;
  pdf.text(title.toUpperCase(), MARGIN, pdf.y, { size: 9.5, font: 'F2', color: COLORS.accent });
  pdf.y -= 6;
  pdf.rule(MARGIN, pdf.y, PAGE_W - MARGIN);
  pdf.y -= 14;
}

function paragraph(text, { size = 9.5, color = COLORS.text, indent = 0, font = 'F1', gap = 4 } = {}) {
  const lines = wrap(text, charsFor(size, CONTENT_W - indent, font === 'F2'));
  for (const line of lines) {
    pdf.ensure(size + 4);
    pdf.text(line, MARGIN + indent, pdf.y, { size, color, font });
    pdf.y -= size + 3.5;
  }
  pdf.y -= gap;
}

function bullet(text, size = 9.3) {
  const lines = wrap(text, charsFor(size, CONTENT_W - 16));
  lines.forEach((line, i) => {
    pdf.ensure(size + 4);
    if (i === 0) pdf.text('\u2022', MARGIN + 6, pdf.y, { size, color: COLORS.accent });
    pdf.text(line, MARGIN + 16, pdf.y, { size });
    pdf.y -= size + 3.2;
  });
}

/* Header */
pdf.text(personal.name.toUpperCase(), MARGIN, pdf.y - 10, { size: 22, font: 'F2' });
pdf.y -= 30;
pdf.text(personal.designation, MARGIN, pdf.y, { size: 11, color: COLORS.accent, font: 'F2' });
pdf.y -= 16;
pdf.text(
  `${personal.email}   |   ${personal.phone}   |   ${personal.location}`,
  MARGIN,
  pdf.y,
  { size: 9, color: COLORS.muted },
);
pdf.y -= 13;
pdf.text(`LinkedIn: ${personal.linkedin}`, MARGIN, pdf.y, { size: 9, color: COLORS.muted });
pdf.y -= 8;

/* Summary */
heading('Professional Summary');
paragraph(about.paragraphs[0]);
paragraph(about.paragraphs[1]);
paragraph(about.paragraphs[2]);

/* Experience */
heading('Professional Experience');
for (const job of experience) {
  pdf.ensure(40);
  pdf.text(job.company.toUpperCase(), MARGIN, pdf.y, { size: 10.5, font: 'F2' });
  const right = `${job.duration}`;
  pdf.text(right, PAGE_W - MARGIN - right.length * 4.6, pdf.y, { size: 9, color: COLORS.muted });
  pdf.y -= 13;
  pdf.text(`${job.role}  \u2013  ${job.type}`, MARGIN, pdf.y, { size: 9.5, color: COLORS.accent, font: 'F2' });
  pdf.y -= 14;
  for (const proj of job.projects) {
    pdf.ensure(30);
    pdf.text(`Project: ${proj.name}`, MARGIN, pdf.y, { size: 9.5, font: 'F2' });
    pdf.y -= 12;
    pdf.text(`Stack: ${proj.stack.join(', ')}`, MARGIN, pdf.y, { size: 8.6, color: COLORS.muted });
    pdf.y -= 12;
    for (const p of proj.points) bullet(p);
    pdf.y -= 5;
  }
  pdf.y -= 4;
}

/* Skills */
heading('Technical Skills');
for (const cat of skillCategories) {
  const label = `${cat.title}: `;
  const names = cat.skills.map((s) => s.name).join(', ');
  const lines = wrap(names, charsFor(9.3, CONTENT_W - 150));
  pdf.ensure(14 * lines.length);
  pdf.text(label, MARGIN, pdf.y, { size: 9.3, font: 'F2' });
  lines.forEach((line) => {
    pdf.text(line, MARGIN + 150, pdf.y, { size: 9.3 });
    pdf.y -= 12.5;
  });
  pdf.y -= 2;
}

/* Education */
heading('Education');
for (const edu of education) {
  pdf.ensure(30);
  pdf.text(edu.degree, MARGIN, pdf.y, { size: 10, font: 'F2' });
  const right = edu.duration;
  pdf.text(right, PAGE_W - MARGIN - right.length * 4.6, pdf.y, { size: 9, color: COLORS.muted });
  pdf.y -= 13;
  pdf.text(`${edu.institute}  \u2013  CGPA ${edu.cgpa}${edu.status === 'Pursuing' ? '  (Pursuing)' : ''}`, MARGIN, pdf.y, {
    size: 9.3,
    color: COLORS.muted,
  });
  pdf.y -= 18;
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, pdf.build());
console.log(`Resume written to ${OUT} (${pdf.pages.length} page${pdf.pages.length > 1 ? 's' : ''})`);
