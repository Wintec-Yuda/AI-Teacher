import MarkdownPreview from "@uiw/react-markdown-preview";

const MarkdownWithProperHtml = ({ content }: { content: string }) => (
  <MarkdownPreview
    source={content}
    style={{
      backgroundColor: "#F4E5C2",
      padding: "1rem",
      borderRadius: "0.5rem",
      width: "100%",
      boxSizing: "border-box",
      color: "#444444",
    }}
  />
);

export default MarkdownWithProperHtml;
