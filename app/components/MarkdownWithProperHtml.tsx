import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { Typography } from '@mui/material';

const MarkdownWithProperHtml = ({ content }: { content: string }) => (
  <Typography component="div" className='space-y-4'>
    <ReactMarkdown
      children={content}
      rehypePlugins={[rehypeSanitize]} // Sanitize invalid HTML elements
    />
  </Typography>
);

export default MarkdownWithProperHtml;
