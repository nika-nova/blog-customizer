import clsx from 'clsx';
import { useState } from 'react';

import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  defaultArticleState,
  type ArticleStateType,
} from '../../constants/articleProps';
import { Button } from '../../ui/button';
import { RadioGroup } from '../../ui/radio-group';
import { Select } from '../../ui/select';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text';

import type React from 'react';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  isOpen: boolean;
  onSubmit: (data: ArticleStateType) => void;
  onReset?: () => void;
  initialData?: ArticleStateType;
};

export const ArticleParamsForm = ({
  isOpen,
  onSubmit,
  onReset,
  initialData,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [values, setValues] = useState<ArticleStateType>(
    initialData ?? defaultArticleState
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit(values);
  };

  const handleReset = (): void => {
    if (onReset) onReset();
    setValues(defaultArticleState);
  };

  const setField = (
    key: keyof ArticleStateType,
    newValue: ArticleStateType[keyof ArticleStateType]
  ): void => {
    setValues((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  return (
    <aside className={clsx(styles.container, isOpen && styles.container_open)}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Text size={31} weight={800} uppercase={true}>
          Задайте параметры
        </Text>

        <div>
          <Select
            title="Шрифт"
            selected={values.fontFamilyOption}
            options={fontFamilyOptions}
            placeholder="Выберите шрифт"
            onChange={(selected) => setField('fontFamilyOption', selected)}
          />
        </div>

        <div>
          <RadioGroup
            name="fontSize"
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={values.fontSizeOption}
            onChange={(selected) => setField('fontSizeOption', selected)}
          />
        </div>

        <div>
          <Select
            title="Цвет шрифта"
            selected={values.fontColor}
            options={fontColors}
            placeholder="Выберите цвет"
            onChange={(selected) => setField('fontColor', selected)}
          />
        </div>

        <Separator />

        <div>
          <Select
            title="Цвет фона"
            selected={values.backgroundColor}
            options={backgroundColors}
            placeholder="Выберите фон"
            onChange={(selected) => setField('backgroundColor', selected)}
          />
        </div>

        <div>
          <Select
            title="Ширина контента"
            selected={values.contentWidth}
            options={contentWidthArr}
            placeholder="Выберите ширину"
            onChange={(selected) => setField('contentWidth', selected)}
          />
        </div>

        <div className={styles.bottomContainer}>
          <Button title="Сбросить" onClick={handleReset} type="clear" />
          <Button title="Применить" htmlType="submit" type="apply" />
        </div>
      </form>
    </aside>
  );
};
