import React, {PropsWithChildren} from 'react';
import block from 'bem-cn-lite';
import {Button, Icon, Text, Theme, ThemeProvider} from '@gravity-ui/uikit';
import {Moon, Sun} from '@gravity-ui/icons';

import './Wrapper.scss';

const b = block('wrapper');

const DARK = 'dark-hc';
const LIGHT = 'light';
const DEFAULT_THEME = LIGHT;

export const DEFAULT_BODY_CLASSNAME = `g-root g-root_theme_${DEFAULT_THEME}`;

export const Wrapper: React.FC<PropsWithChildren> = ({children}) => {
    const [theme, setTheme] = React.useState<Theme>(DEFAULT_THEME);

    const isDark = theme === DARK;

    return (
        <ThemeProvider theme={theme}>
            <div className={b()}>
                <div className={b('theme-button')}>
                    <Button
                        size="xl"
                        view="outlined"
                        onClick={() => {
                            setTheme(isDark ? LIGHT : DARK);
                        }}
                    >
                        <Icon data={isDark ? Sun : Moon} />
                    </Button>
                </div>
                <div className={b('layout')}>
                    <div className={b('header')}>
                        <Text as="h1" variant="header-2">
                            TODOS
                        </Text>
                    </div>
                    <div className={b('content')}>{children}</div>
                </div>
            </div>
        </ThemeProvider>
    );
};
