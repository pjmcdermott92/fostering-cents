export function estimateReadingTimeFromLexicalBlocks(
  blocks: any[] | null | undefined,
  wordsPerMinute = 200,
): number {
  if (!Array.isArray(blocks)) return 0;

  // Recursively extract plain text from Lexical nodes
  function extractTextFromLexicalNodes(nodes: any[]): string {
    let text = '';
    nodes.forEach((node) => {
      // Lexical text nodes have `text` property
      if (typeof node.text === 'string') {
        text += node.text + ' ';
      }

      // If the node has children, recurse on them
      if (Array.isArray(node.children)) {
        text += extractTextFromLexicalNodes(node.children);
      }
    });
    return text;
  }

  let fullText = '';

  for (const block of blocks) {
    if (block.blockType === 'blogContent') {
      const lexicalContent = block.richText;

      if (lexicalContent && lexicalContent.root && Array.isArray(lexicalContent.root.children)) {
        fullText += extractTextFromLexicalNodes(lexicalContent.root.children) + ' ';
      }
    }
  }

  const wordCount = fullText.trim().split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
