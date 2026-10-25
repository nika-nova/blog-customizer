import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  defaultArticleState,
  type ArticleStateType,
  type OptionType } from '@/constants/articleProps';
import { ArrowButton } from '@/ui/arrow-button';
import { Button } from '@/ui/button';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import clsx from 'clsx';
import { useState, useRef } from 'react';

import { useSidebarClose } from './useSidebarClose';


import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<ArticleStateType>(defaultArticleState);

  const closeRef = useRef<HTMLDivElement>(null);

  useSidebarClose(closeRef, isOpen, () => setIsOpen(false));

  const handleChange =
    (key: keyof ArticleStateType) =>
    (option: OptionType): void => {
      setValues((previousValues) => ({ ...previousValues, [key]: option }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onApply(values);
    setIsOpen(false);
  };

  const handleReset = (): void => {
    onApply(defaultArticleState);
    setValues(defaultArticleState);
  };

  return (
    <div ref={closeRef}>
      <ArrowButton
        isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Закрыть настройки' : 'Открыть настройки'}
      />

      <aside className={clsx(styles.container, isOpen && styles.container_open)}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as={'h2'} size={31} weight={800} uppercase={true}>
            Задайте параметры
          </Text>

          <Select
            title="шрифт"
            selected={values.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={handleChange('fontFamilyOption')}
          />

          <RadioGroup
            name="fontSize"
            title="размер шрифта"
            options={fontSizeOptions}
            selected={values.fontSizeOption}
            onChange={handleChange('fontSizeOption')}
          />

          <Select
            title="цвет шрифта"
            selected={values.fontColor}
            options={fontColors}
            onChange={handleChange('fontColor')}
          />

          <Separator />

          <Select
            title="цвет фона"
            selected={values.backgroundColor}
            options={backgroundColors}
            placeholder="Выберите фон"
            onChange={handleChange('backgroundColor')}
          />

          <Select
            title="ширина контента"
            selected={values.contentWidth}
            options={contentWidthArr}
            placeholder="Выберите ширину"
            onChange={handleChange('contentWidth')}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
