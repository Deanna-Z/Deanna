export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function editableText({ className = '', isEditing, path, tag = 'span', value }) {
  const attributes = isEditing
    ? ` contenteditable="true" spellcheck="true" data-edit-path="${escapeHtml(path)}"`
    : '';

  return `<${tag} class="${className}"${attributes}>${escapeHtml(value)}</${tag}>`;
}
