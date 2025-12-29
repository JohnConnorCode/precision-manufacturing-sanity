'use client';

interface SlateNode {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  children?: SlateNode[];
  url?: string;
  level?: number;
  listType?: string;
}

interface SlateRendererProps {
  content: SlateNode[];
}

export function SlateRenderer({ content }: SlateRendererProps) {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  const renderNode = (node: SlateNode, index: number): React.ReactNode => {
    // Handle text nodes
    if (node.text !== undefined) {
      let text: React.ReactNode = node.text;

      if (node.bold) text = <strong key={index}>{text}</strong>;
      if (node.italic) text = <em key={index}>{text}</em>;
      if (node.underline) text = <u key={index}>{text}</u>;
      if (node.code) text = <code key={index} className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 px-1.5 py-0.5 rounded text-sm">{text}</code>;

      return text;
    }

    // Handle element nodes with children
    const children = node.children?.map((child, i) => renderNode(child, i));

    switch (node.type) {
      case 'h1':
        return <h1 key={index} className="text-4xl font-black mb-6 text-foreground">{children}</h1>;
      case 'h2':
        return <h2 key={index} className="text-3xl font-bold mb-5 text-foreground mt-12">{children}</h2>;
      case 'h3':
        return <h3 key={index} className="text-2xl font-bold mb-4 text-foreground mt-10">{children}</h3>;
      case 'h4':
        return <h4 key={index} className="text-xl font-bold mb-3 text-foreground mt-8">{children}</h4>;
      case 'h5':
        return <h5 key={index} className="text-lg font-bold mb-3 text-foreground mt-6">{children}</h5>;
      case 'h6':
        return <h6 key={index} className="text-base font-bold mb-2 text-foreground mt-4">{children}</h6>;
      case 'blockquote':
        return (
          <blockquote key={index} className="border-l-4 border-blue-600 pl-6 py-2 my-6 italic text-muted-foreground bg-blue-50/50 dark:bg-blue-950/50">
            {children}
          </blockquote>
        );
      case 'ul':
        return <ul key={index} className="list-disc list-inside space-y-2 my-6 ml-4">{children}</ul>;
      case 'ol':
        return <ol key={index} className="list-decimal list-inside space-y-2 my-6 ml-4">{children}</ol>;
      case 'li':
        return <li key={index} className="text-muted-foreground leading-relaxed">{children}</li>;
      case 'link':
        return (
          <a
            key={index}
            href={node.url}
            className="text-blue-600 hover:text-blue-700 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      case 'code':
        return (
          <pre key={index} className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-6">
            <code>{children}</code>
          </pre>
        );
      default:
        // Default to paragraph
        return <p key={index} className="text-muted-foreground leading-relaxed mb-6">{children}</p>;
    }
  };

  return (
    <div className="prose prose-slate max-w-none">
      {content.map((node, index) => renderNode(node, index))}
    </div>
  );
}
