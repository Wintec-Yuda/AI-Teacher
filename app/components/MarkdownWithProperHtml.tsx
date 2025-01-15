import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { Typography } from '@mui/material';

const MarkdownWithProperHtml = ({ content }: { content: string }) => (
  <Typography className='space-y-2'>
    <ReactMarkdown
      children={content}
      rehypePlugins={[rehypeSanitize]}
    />
  </Typography>
);

export default MarkdownWithProperHtml;
