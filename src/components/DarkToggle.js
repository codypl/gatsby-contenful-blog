import React from 'react';
import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { ThemeContext } from './ThemeContext';
import { COLOR_MODE_KEY } from '../constants';
import { getColorFromTheme } from "../utils/functions";

import iconSystemLight from "../images/icons/baseline_settings_brightness_black_48dp.png";
import iconSystemDark from "../images/icons/baseline_settings_brightness_white_48dp.png";
import iconDarkLight from "../images/icons/outline_dark_mode_black_48dp.png";
import iconDarkDark from "../images/icons/outline_dark_mode_white_48dp.png";
import iconLightLight from "../images/icons/outline_light_mode_black_48dp.png";
import iconLightDark from "../images/icons/outline_light_mode_white_48dp.png";

const themes = [
  {
    id: 'system',
    name: 'Préférence système',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    icon: {
      dark: iconSystemDark,
      light: iconSystemLight,
    }

  },
  {
    id: 'dark',
    name: 'Sombre',
    avatar:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    icon: {
      dark: iconDarkDark,
      light: iconDarkLight,
    }
  },
  {
    id: 'light',
    name: 'Clair',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    icon: {
      dark: iconLightDark,
      light: iconLightLight,
    }
  },

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function getCurrentThemeIndex(colorMode) {
  const hasUsedToggle = typeof localStorage !== 'undefined' && typeof localStorage.getItem(COLOR_MODE_KEY) === 'string';
  let themeIndex = 0

  if (colorMode && hasUsedToggle) {
    //Mode choisi par user : récup via colorMode
    themes.find(function (theme, i) {
      if (theme.id === colorMode) {
        themeIndex = i;
      }
      return themeIndex
    });
  } else {
    //Mode non choisi : préférence système
    themeIndex = 0;
  }
  return themeIndex
}


const DarkToggle = () => {

  const { colorMode, setColorMode } = React.useContext(ThemeContext);
  const currentThemeIndex = getCurrentThemeIndex(colorMode);
  const [selectedTheme, setSelectedTheme] = useState(themes[currentThemeIndex])

  const colorForIconLight = getColorFromTheme(colorMode) === 'light'

  const theme = themes[currentThemeIndex]

  useEffect(() => {
    setSelectedTheme(theme)
  },
    [theme]
  );

  const handleChange = (theme) => {
    setColorMode(theme.id)
    setSelectedTheme(theme)
  };

  if (!colorMode) {
    return null;
  }


  return (
    <div className='w-80'>
      <Listbox value={selectedTheme}
        onChange={(theme) => {
          handleChange(theme);
        }}
        horizontal
      >
        {({ open }) => (
          <>
            <Listbox.Label className="sr-only">Theme</Listbox.Label>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-sm text-left border rounded-md shadow-sm cursor-default border-border bg-interface focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                <span className="flex items-center">
                  <img src={colorForIconLight ? selectedTheme.icon.light : selectedTheme.icon.dark} alt="" className="flex-shrink-0 w-6 h-6" />
                  <span className="block ml-3 truncate">{selectedTheme.name}</span>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                  <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options static className="absolute z-10 w-full py-1 mt-1 overflow-auto text-sm rounded-md shadow-lg bottom-full bg-interface max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {themes.map((theme) => (
                    <Listbox.Option
                      key={theme.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-indigo-600' : 'text-default',
                          'cursor-default select-none relative py-2 pl-3 pr-9'
                        )
                      }
                      value={theme}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <img src={colorForIconLight ? theme.icon.light : theme.icon.dark} alt="" className="flex-shrink-0 w-6 h-6" />
                            <span
                              className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                              {theme.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-default' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon className="w-5 h-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default DarkToggle;
