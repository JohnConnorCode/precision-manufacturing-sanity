/**
 * Extract plain text from Lexical richtext content
 * Handles the {root: {children: [...]}} structure
 */

interface LexicalNode {
  text?: string;
  children?: LexicalNode[];
}

interface LexicalRoot {
  root?: {
    children?: LexicalNode[];
  };
}

export function lexicalToText(lexical: unknown): string {
  if (!lexical || typeof lexical !== 'object') {
    return String(lexical || '');
  }

  // If it's already a string, return it
  if (typeof lexical === 'string') {
    return lexical;
  }

  // Handle Lexical structure
  const doc = lexical as LexicalRoot;
  if (doc.root && doc.root.children) {
    return extractTextFromChildren(doc.root.children);
  }

  return '';
}

function extractTextFromChildren(children: LexicalNode[]): string {
  if (!Array.isArray(children)) {
    return '';
  }

  return children.map(child => {
    // Text node
    if (child.text) {
      return child.text;
    }

    // Element node with children
    if (child.children) {
      return extractTextFromChildren(child.children);
    }

    return '';
  }).join(' ');
}
