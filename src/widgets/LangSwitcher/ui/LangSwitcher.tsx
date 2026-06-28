import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LangSwitcher.module.scss'

import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'

interface ThemeSwitcherProps {
  className?: string
}

export const LangSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { t, i18n } = useTranslation()

  const toggle = () => {
    void i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }
  return (
    <Button
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={toggle}
      theme={ThemeButton.CLEAR}
    >
      {t('translate')}
    </Button>
  )
}
