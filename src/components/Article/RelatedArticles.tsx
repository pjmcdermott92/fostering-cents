import { RichText } from '@/components/RichText';
import { cn } from '@/lib/utils';
import type { Article } from '@/payload-types';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { BlockWrapper } from '../BlockWrapper';
import { ArticleGrid } from '../ArticlesGrid';

export type RelatedArticlesProps = {
  className?: string;
  docs?: Article[] | null | undefined;
  introContent?: SerializedEditorState;
  customHeader?: string;
  hideHeader?: boolean;
};

export function RelatedArticles({
  className,
  docs,
  introContent,
  customHeader = 'Related Articles',
  hideHeader,
}: RelatedArticlesProps) {
  return (
    <BlockWrapper
      settings={{ bgType: 'solid', bgColor: 'accentLight' }}
      padding={{ top: 'small', bottom: 'small' }}
    >
      <div className={cn(className)}>
        <div className="contain mt-6 space-y-6">
          {!hideHeader && <h2 className="text-center text-4xl">{customHeader}</h2>}
          {introContent && <RichText className="my-2" data={introContent} />}
          <ArticleGrid hidePublishDate articles={docs || []} />
        </div>
      </div>
    </BlockWrapper>
  );
}
