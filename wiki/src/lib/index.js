// place files you want to import through the `$lib` alias in this folder.
export function markdownToHtml(markdown) {
    // Convert headings
    markdown = markdown.replace(
        /^#\s(.*)$/gm,
        "<h1 class='text-2xl font-bold mt-3 mb-1'>$1</h1>",
    );
    markdown = markdown.replace(
        /^##\s(.*)$/gm,
        "<h2 class='text-lg font-bold mt-3 mb-1'>$1</h2>",
    );
    markdown = markdown.replace(/^###\s(.*)$/gm, "<h3 class='my-3'>$1</h3>");

    // Convert bold text
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert unordered lists
    markdown = markdown.replace(/^\*\s(.*)$/gm, "<li>$1</li>");
    markdown = markdown.replace(/(<li>.*?<\/li>)/g, "<ul>$1</ul>");

    // Convert links
    markdown = markdown.replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a class="underline text-blue-500" href="$2">$1</a>',
    );

    // Convert paragraphs
    markdown = markdown.replace(/(.+?)(?:\r?\n\r?\n|$)/g, "<p>$1</p>");

    return markdown;
}