import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';

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
  onClose: () => void;
  onChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  isOpen,
  onClose,
  onChange,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [values, setValues] = useState<ArticleStateType>(defaultArticleState);

  const closeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (e: MouseEvent): void => {
      if (closeRef.current && !closeRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);

    return (): void => document.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onChange(values);
    onClose();
  };

  const handleReset = (): void => {
    onChange(defaultArticleState);
    setValues(defaultArticleState);
  };

  return (
    <div ref={closeRef}>
      <aside className={clsx(styles.container, isOpen && styles.container_open)}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Text size={31} weight={800} uppercase={true}>
            Задайте параметры
          </Text>

          <Select
            title="шрифт"
            selected={values.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(option) => setValues({ ...values, fontFamilyOption: option })}
          />

          <RadioGroup
            name="fontSize"
            title="размер шрифта"
            options={fontSizeOptions}
            selected={values.fontSizeOption}
            onChange={(option) => setValues({ ...values, fontSizeOption: option })}
          />

          <Select
            title="цвет шрифта"
            selected={values.fontColor}
            options={fontColors}
            onChange={(option) => setValues({ ...values, fontColor: option })}
          />

          <Separator />

          <Select
            title="цвет фона"
            selected={values.backgroundColor}
            options={backgroundColors}
            placeholder="Выберите фон"
            onChange={(option) => setValues({ ...values, backgroundColor: option })}
          />

          <Select
            title="ширина контента"
            selected={values.contentWidth}
            options={contentWidthArr}
            placeholder="Выберите ширину"
            onChange={(option) => setValues({ ...values, contentWidth: option })}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" onClick={handleReset} type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
