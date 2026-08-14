"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import TiptapUnderline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import {
  Bold, Italic, Underline, Strikethrough, Code, Quote,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Heading1, Heading2, Heading3, Heading4, Link as LinkIcon,
  Image as ImageIcon, Table as TableIcon, Minus, Highlighter, Undo, Redo,
  ChevronDown, Pilcrow, X as XIcon,
} from "lucide-react";

const lowlight = createLowlight();

// ─── Helpers ─────────────────────────────────────────────────────────────────

const Divider = () => <div className="w-px h-5 bg-gray-200 mx-0.5 flex-shrink-0" />;

const ToolbarBtn = ({
  onClick, active = false, title, disabled = false, children,
}: {
  onClick: () => void; active?: boolean; title: string;
  disabled?: boolean; children: React.ReactNode;
}) => (
  <button
    type="button"
    onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    disabled={disabled}
    title={title}
    className={`
      inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-all duration-100
      ${active ? "bg-indigo-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}
      ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
    `}
  >
    {children}
  </button>
);

// ─── Inline link input ────────────────────────────────────────────────────────

const LinkInput = ({ editor, onClose }: { editor: any; onClose: () => void }) => {
  const [url, setUrl] = useState(editor.getAttributes("link").href || "");
  const apply = () => {
    if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url, target: "_blank" }).run();
    else editor.chain().focus().unsetLink().run();
    onClose();
  };
  return (
    <div className="flex items-center gap-1.5 px-2">
      <input
        autoFocus
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && apply()}
        placeholder="https://…"
        className="bg-gray-100 text-sm rounded-lg px-2.5 py-1.5 w-52 outline-none border border-gray-300 focus:border-indigo-400 transition-colors"
      />
      <button type="button" onMouseDown={(e) => { e.preventDefault(); apply(); }}
        className="text-xs font-semibold px-2.5 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
        Set
      </button>
      <button type="button" onMouseDown={(e) => { e.preventDefault(); onClose(); }}
        className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
        <XIcon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

// ─── Toolbar ──────────────────────────────────────────────────────────────────

const Toolbar = ({ editor }: { editor: any }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const blockTypes = [
    { label: "Paragraph", icon: <Pilcrow className="w-4 h-4" />, action: () => editor.chain().focus().setParagraph().run(), isActive: () => editor.isActive("paragraph") && !editor.isActive("blockquote") },
    { label: "Heading 1", icon: <Heading1 className="w-4 h-4" />, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: () => editor.isActive("heading", { level: 1 }) },
    { label: "Heading 2", icon: <Heading2 className="w-4 h-4" />, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: () => editor.isActive("heading", { level: 2 }) },
    { label: "Heading 3", icon: <Heading3 className="w-4 h-4" />, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: () => editor.isActive("heading", { level: 3 }) },
    { label: "Heading 4", icon: <Heading4 className="w-4 h-4" />, action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(), isActive: () => editor.isActive("heading", { level: 4 }) },
    { label: "Blockquote", icon: <Quote className="w-4 h-4" />, action: () => editor.chain().focus().toggleBlockquote().run(), isActive: () => editor.isActive("blockquote") },
    { label: "Code Block", icon: <Code className="w-4 h-4" />, action: () => editor.chain().focus().toggleCodeBlock().run(), isActive: () => editor.isActive("codeBlock") },
  ];

  const activeBlock = blockTypes.find(b => b.isActive()) ?? blockTypes[0];

  const insertImage = () => {
    const url = window.prompt("Image URL:");
    if (url) editor.chain().focus().setImage({ src: url, alt: "" }).run();
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100 px-3 py-2 flex flex-wrap items-center gap-0.5">

      {/* Block type picker */}
      <div className="relative mr-1" ref={dropRef}>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); setShowDropdown(v => !v); }}
          className="flex items-center gap-1.5 h-8 px-2.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors min-w-[128px]"
        >
          <span className="text-gray-500">{activeBlock.icon}</span>
          <span className="text-xs truncate">{activeBlock.label}</span>
          <ChevronDown className="w-3 h-3 ml-auto text-gray-400 flex-shrink-0" />
        </button>
        {showDropdown && (
          <div className="absolute top-full left-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-2xl py-1 z-50 min-w-[158px]">
            {blockTypes.map(({ label, icon, action, isActive }) => (
              <button
                key={label}
                type="button"
                onMouseDown={(e) => { e.preventDefault(); action(); setShowDropdown(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors
                  ${isActive() ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <span className={isActive() ? "text-indigo-600" : "text-gray-400"}>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <Divider />

      {/* Link input OR link button */}
      {showLinkInput ? (
        <LinkInput editor={editor} onClose={() => setShowLinkInput(false)} />
      ) : (
        <>
          {/* Inline formats */}
          <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold (Ctrl+B)"><Bold className="w-4 h-4" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic (Ctrl+I)"><Italic className="w-4 h-4" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline (Ctrl+U)"><Underline className="w-4 h-4" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough"><Strikethrough className="w-4 h-4" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline Code"><Code className="w-4 h-4" /></ToolbarBtn>
          <ToolbarBtn onClick={() => setShowLinkInput(true)} active={editor.isActive("link")} title="Insert / Edit Link"><LinkIcon className="w-4 h-4" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()} active={editor.isActive("highlight")} title="Highlight"><Highlighter className="w-4 h-4" /></ToolbarBtn>

          <Divider />

          {/* Alignment */}
          <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Left"><AlignLeft className="w-4 h-4" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Center"><AlignCenter className="w-4 h-4" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Right"><AlignRight className="w-4 h-4" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justify"><AlignJustify className="w-4 h-4" /></ToolbarBtn>

          <Divider />

          {/* Lists */}
          <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List"><List className="w-4 h-4" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered List"><ListOrdered className="w-4 h-4" /></ToolbarBtn>

          <Divider />

          {/* Insert */}
          <ToolbarBtn onClick={insertImage} active={false} title="Insert Image"><ImageIcon className="w-4 h-4" /></ToolbarBtn>
          <ToolbarBtn onClick={insertTable} active={false} title="Insert Table"><TableIcon className="w-4 h-4" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Horizontal Divider"><Minus className="w-4 h-4" /></ToolbarBtn>

          <div className="flex-1" />

          <Divider />

          {/* Undo / Redo */}
          <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} active={false} disabled={!editor.can().undo()} title="Undo (Ctrl+Z)"><Undo className="w-4 h-4" /></ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} active={false} disabled={!editor.can().redo()} title="Redo (Ctrl+Y)"><Redo className="w-4 h-4" /></ToolbarBtn>
        </>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = "Start writing your post…" }: RichTextEditorProps) {
  const initialised = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-indigo-600 underline cursor-pointer hover:text-indigo-700 transition-colors" },
      }),
      TiptapImage.configure({
        HTMLAttributes: { class: "rounded-xl mx-auto max-w-full my-4 shadow-md" },
      }),
      TiptapUnderline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Typography,
      HorizontalRule,
      Placeholder.configure({ placeholder }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: { class: "focus:outline-none" },
    },
  });

  // Load external value once (e.g. from API fetch after initial render)
  useEffect(() => {
    if (editor && value && !initialised.current) {
      editor.commands.setContent(value, false as any);
      initialised.current = true;
    }
  }, [value, editor]);

  const wordCount = editor
    ? editor.getText().trim().split(/\s+/).filter(Boolean).length
    : 0;
  const charCount = editor?.getText().length ?? 0;

  if (!editor) return (
    <div className="h-96 rounded-xl border border-gray-200 bg-gray-50 animate-pulse" />
  );

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white focus-within:ring-2 focus-within:ring-indigo-400 focus-within:border-indigo-400 transition-all">
      <Toolbar editor={editor} />

      {/* Canvas */}
      <div className="overflow-y-auto" style={{ maxHeight: "640px" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .ProseMirror {
            min-height: 520px;
            padding: 2rem 2.75rem;
            font-size: 1.0625rem;
            line-height: 1.85;
            color: #1f2937;
            font-family: inherit;
          }
          .ProseMirror > * + * { margin-top: 0.75em; }
          .ProseMirror p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #d1d5db;
            pointer-events: none;
            height: 0;
            font-style: italic;
          }
          .ProseMirror h1 { font-size: 2rem; font-weight: 800; line-height: 1.2; margin-top: 2rem; margin-bottom: 0.5rem; color: #111827; letter-spacing: -0.02em; }
          .ProseMirror h2 { font-size: 1.5rem; font-weight: 700; line-height: 1.3; margin-top: 1.75rem; margin-bottom: 0.5rem; color: #111827; letter-spacing: -0.01em; }
          .ProseMirror h3 { font-size: 1.25rem; font-weight: 600; line-height: 1.4; margin-top: 1.5rem; margin-bottom: 0.4rem; color: #1f2937; }
          .ProseMirror h4 { font-size: 1.1rem; font-weight: 600; line-height: 1.4; margin-top: 1.25rem; margin-bottom: 0.4rem; color: #374151; }
          .ProseMirror p { margin-bottom: 0; }
          .ProseMirror ul, .ProseMirror ol { padding-left: 1.75rem; margin: 0.75rem 0; }
          .ProseMirror li { margin-bottom: 0.3rem; }
          .ProseMirror ul > li { list-style-type: disc; }
          .ProseMirror ul > li > ul > li { list-style-type: circle; }
          .ProseMirror ol > li { list-style-type: decimal; }
          .ProseMirror blockquote {
            border-left: 4px solid #6366f1;
            margin: 1.5rem 0;
            padding: 1.25rem 1.5rem;
            background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
            border-radius: 0 0.75rem 0.75rem 0;
            font-style: italic;
            color: #4b5563;
            position: relative;
          }
          .ProseMirror blockquote::before {
            content: '"';
            position: absolute;
            top: -0.5rem;
            left: 1rem;
            font-size: 4rem;
            color: #a5b4fc;
            font-family: Georgia, serif;
            line-height: 1;
          }
          .ProseMirror code {
            background: #f3f4f6;
            color: #7c3aed;
            font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
            font-size: 0.875em;
            padding: 0.15em 0.45em;
            border-radius: 0.35rem;
            border: 1px solid #e5e7eb;
          }
          .ProseMirror pre {
            background: #0f172a;
            color: #e2e8f0;
            font-family: 'JetBrains Mono', 'Fira Code', monospace;
            font-size: 0.875rem;
            padding: 1.5rem;
            border-radius: 0.875rem;
            overflow-x: auto;
            margin: 1.5rem 0;
            line-height: 1.75;
            border: 1px solid #1e293b;
            box-shadow: 0 4px 24px rgba(0,0,0,0.18);
          }
          .ProseMirror pre code { background: none; color: inherit; padding: 0; border: none; font-size: inherit; border-radius: 0; }
          .ProseMirror hr {
            border: none;
            height: 2px;
            background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
            margin: 2.5rem 0;
            border-radius: 9999px;
          }
          .ProseMirror a { color: #4f46e5; text-decoration: underline; text-decoration-color: #a5b4fc; transition: color 0.15s; }
          .ProseMirror a:hover { color: #4338ca; }
          .ProseMirror mark { background: #fef08a; border-radius: 0.25rem; padding: 0.05em 0.3em; }
          .ProseMirror img {
            max-width: 100%;
            height: auto;
            border-radius: 0.875rem;
            margin: 2rem auto;
            display: block;
            box-shadow: 0 8px 32px rgba(0,0,0,0.12);
            transition: box-shadow 0.2s;
          }
          .ProseMirror img:hover { box-shadow: 0 12px 40px rgba(99,102,241,0.18); }
          .ProseMirror img.ProseMirror-selectednode { outline: 3px solid #6366f1; outline-offset: 3px; }

          /* Table styles */
          .ProseMirror .tableWrapper { overflow-x: auto; margin: 1.5rem 0; }
          .ProseMirror table {
            border-collapse: collapse;
            width: 100%;
            font-size: 0.9375rem;
            border-radius: 0.75rem;
            overflow: hidden;
          }
          .ProseMirror table td, .ProseMirror table th {
            border: 1px solid #e5e7eb;
            padding: 0.65rem 1rem;
            text-align: left;
            vertical-align: top;
            position: relative;
          }
          .ProseMirror table th {
            background: #f8fafc;
            font-weight: 600;
            color: #374151;
            font-size: 0.8125rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
          }
          .ProseMirror table tr:hover td { background: #fafafa; }
          .ProseMirror table .selectedCell:after {
            background: rgba(99,102,241,0.12);
            content: "";
            left: 0; right: 0; top: 0; bottom: 0;
            pointer-events: none;
            position: absolute;
          }
          .ProseMirror table .column-resize-handle {
            background-color: #6366f1;
            bottom: 0;
            position: absolute;
            right: -2px;
            pointer-events: none;
            top: 0;
            width: 3px;
          }
          .ProseMirror .resize-cursor { cursor: col-resize; }
        `}} />
        <EditorContent editor={editor} />
      </div>

      {/* Status bar */}
      <div className="px-5 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <span>{wordCount} word{wordCount !== 1 ? "s" : ""}</span>
        <span>{charCount} characters</span>
      </div>
    </div>
  );
}
