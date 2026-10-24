import { defaultArticleState } from '@/constants/articleProps.ts';
import { ArrowButton } from '@/ui/arrow-button';
import { clsx } from 'clsx';
import { useState, type CSSProperties } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [currentState, setCurrentState] = useState(defaultArticleState);
  const [isOpen, setIsOpen] = useState(false);

  const containerStyle: React.CSSProperties = {
    '--font-family': currentState.fontFamilyOption.value ?? '',
    '--font-size': currentState.fontSizeOption.value ?? '',
    '--font-color': currentState.fontColor.value ?? '',
    '--container-width': currentState.contentWidth.value ?? '',
    '--bg-color': currentState.backgroundColor.value ?? '',
  } as CSSProperties;

  return (
    <main className={clsx(styles.main)} style={containerStyle}>
      <ArrowButton
        isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Закрыть настройки' : 'Открыть настройки'}
      />

      <ArticleParamsForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onChange={setCurrentState}
      />

      <Article />
    </main>
  );
};
