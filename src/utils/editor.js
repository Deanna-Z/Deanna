export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function sanitizeEditableHtml(value) {
  const template = document.createElement('template');
  template.innerHTML = String(value);

  return Array.from(template.content.childNodes).map(sanitizeNode).join('');
}

export function editableText({ className = '', isEditing, path, tag = 'span', value }) {
  const attributes = isEditing
    ? ` contenteditable="true" spellcheck="true" data-edit-path="${escapeHtml(path)}"`
    : '';

  return `<${tag} class="${className}"${attributes}>${sanitizeEditableHtml(value)}</${tag}>`;
}

function sanitizeNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    return escapeHtml(node.textContent);
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  const children = Array.from(node.childNodes).map(sanitizeNode).join('');
  const tagName = node.tagName.toLowerCase();

  if (tagName === 'strong' || tagName === 'b' || hasBoldStyle(node)) {
    return `<b>${children}</b>`;
  }

  if (tagName === 'br') {
    return '<br>';
  }

  return children;
}

function hasBoldStyle(node) {
  const fontWeight = node.getAttribute('style')?.match(/font-weight\s*:\s*([^;]+)/i)?.[1]?.trim().toLowerCase();
  if (!fontWeight) return false;

  return fontWeight === 'bold' || Number(fontWeight) >= 600;
}
