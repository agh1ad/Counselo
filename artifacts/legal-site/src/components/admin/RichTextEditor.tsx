import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useCallback, useRef, useState } from "react";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Highlighter, Link as LinkIcon, Minus, RotateCcw, RotateCw,
  Type, RemoveFormatting, Baseline,
  Quote, Code2, Maximize2, Minimize2,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  dir?: "ltr" | "rtl";
  minHeight?: number;
}

const PRESET_COLORS = [
  "#1a1a1a", "#006C35", "#c0392b", "#2980b9",
  "#8e44ad", "#e67e22", "#16a085", "#7f8c8d",
];

function ToolBtn({
  onClick,
  active,
  title,
  children,
  disabled,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`p-1.5 rounded transition-colors text-sm ${
        active
          ? "bg-green-700 text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      } ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="w-px h-5 bg-gray-200 mx-1 self-center shrink-0" />;
}

function ColorPicker({ editor }: { editor: ReturnType<typeof useEditor> }) {
  const inputRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  const currentColor = (editor.getAttributes("textStyle").color as string | undefined) ?? "#1a1a1a";

  const applyColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  return (
    <div className="flex items-center gap-0.5">
      {/* Preset swatches */}
      {PRESET_COLORS.map((c) => (
        <button
          key={c}
          type="button"
          title={c}
          onMouseDown={(e) => { e.preventDefault(); applyColor(c); }}
          className="w-4 h-4 rounded-sm border border-gray-300 hover:scale-110 transition-transform shrink-0"
          style={{ backgroundColor: c }}
        />
      ))}
      {/* Custom color input */}
      <div className="relative ml-0.5" title="Custom color">
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); inputRef.current?.click(); }}
          className="flex items-center gap-1 p-1.5 rounded text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <Baseline size={14} />
          <span
            className="w-3 h-1.5 rounded-sm border border-gray-300"
            style={{ backgroundColor: currentColor }}
          />
        </button>
        <input
          ref={inputRef}
          type="color"
          value={currentColor}
          onChange={(e) => applyColor(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          tabIndex={-1}
        />
      </div>
      {/* Remove color */}
      <button
        type="button"
        title="Remove color"
        onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().unsetColor().run(); }}
        className="p-1.5 rounded text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors text-[10px] font-bold leading-none"
      >
        ✕
      </button>
    </div>
  );
}

export function RichTextEditor({ value, onChange, placeholder, dir = "ltr", minHeight = 320 }: Props) {
  const [fullscreen, setFullscreen] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: placeholder ?? (dir === "rtl" ? "اكتب هنا..." : "Start writing here...") }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        dir,
        class: "focus:outline-none",
        style: `min-height:${minHeight}px; padding: 24px 28px; font-size: 16px; line-height: 1.8; color: #1a1a1a;`,
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  const h = editor.isActive("heading", { level: 2 })
    ? "H2"
    : editor.isActive("heading", { level: 3 })
    ? "H3"
    : "¶";
  const plainText = editor.getText().trim();
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;
  const characterCount = plainText.length;

  return (
    <div className={`border border-gray-200 overflow-hidden bg-white shadow-sm ${fullscreen ? "fixed inset-0 z-[100] rounded-none flex flex-col" : "rounded-xl"}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-100 bg-gray-50 sticky top-0 z-10">
        {/* Undo / Redo */}
        <ToolBtn title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <RotateCcw size={14} />
        </ToolBtn>
        <ToolBtn title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <RotateCw size={14} />
        </ToolBtn>

        <Sep />

        {/* Block type dropdown (visual) */}
        <div className="relative">
          <select
            value={h}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "¶") editor.chain().focus().setParagraph().run();
              else if (v === "H2") editor.chain().focus().toggleHeading({ level: 2 }).run();
              else if (v === "H3") editor.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            className="text-xs font-semibold text-gray-700 border border-gray-200 rounded px-2 py-1 bg-white appearance-none cursor-pointer hover:bg-gray-50 focus:outline-none pr-6"
          >
            <option value="¶">Paragraph</option>
            <option value="H2">Heading 2</option>
            <option value="H3">Heading 3</option>
          </select>
          <Type size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <Sep />

        {/* Inline formatting */}
        <ToolBtn title="Bold (Ctrl+B)" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={14} />
        </ToolBtn>
        <ToolBtn title="Italic (Ctrl+I)" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={14} />
        </ToolBtn>
        <ToolBtn title="Underline (Ctrl+U)" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon size={14} />
        </ToolBtn>
        <ToolBtn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough size={14} />
        </ToolBtn>
        <ToolBtn title="Highlight" active={editor.isActive("highlight")} onClick={() => editor.chain().focus().toggleHighlight().run()}>
          <Highlighter size={14} />
        </ToolBtn>

        <Sep />

        {/* Font color */}
        <ColorPicker editor={editor} />

        <Sep />

        {/* Lists */}
        <ToolBtn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={14} />
        </ToolBtn>
        <ToolBtn title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={14} />
        </ToolBtn>

        <Sep />

        {/* Alignment */}
        <ToolBtn title="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft size={14} />
        </ToolBtn>
        <ToolBtn title="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter size={14} />
        </ToolBtn>
        <ToolBtn title="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight size={14} />
        </ToolBtn>
        <ToolBtn title="Justify" active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
          <AlignJustify size={14} />
        </ToolBtn>

        <Sep />

        {/* Link + HR */}
        <ToolBtn title="Insert / edit link" active={editor.isActive("link")} onClick={setLink}>
          <LinkIcon size={14} />
        </ToolBtn>
        <ToolBtn title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus size={14} />
        </ToolBtn>
        <ToolBtn title="Block quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={14} />
        </ToolBtn>
        <ToolBtn title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <Code2 size={14} />
        </ToolBtn>

        <Sep />

        {/* Clear formatting */}
        <ToolBtn title="Clear formatting" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
          <RemoveFormatting size={14} />
        </ToolBtn>
        <div className="flex-1" />
        <ToolBtn title={fullscreen ? "Exit full screen" : "Full screen editor"} onClick={() => setFullscreen((value) => !value)}>
          {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </ToolBtn>
      </div>

      {/* Editor area */}
      <div
        className={`bg-white cursor-text tiptap-content ${fullscreen ? "flex-1 overflow-y-auto max-w-4xl w-full mx-auto border-x border-gray-100" : ""}`}
        onClick={() => editor.commands.focus()}
      >
        <EditorContent editor={editor} />
      </div>
      <div className="flex items-center justify-between gap-4 px-4 py-2 border-t border-gray-100 bg-gray-50 text-[10px] text-gray-500" aria-live="polite">
        <span>{dir === "rtl" ? `${wordCount} كلمة · ${characterCount} حرف` : `${wordCount} words · ${characterCount} characters`}</span>
        <span>{dir === "rtl" ? "يدعم اللصق من Word والاختصارات القياسية" : "Supports Word paste and standard keyboard shortcuts"}</span>
      </div>
    </div>
  );
}
