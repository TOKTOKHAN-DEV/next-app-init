import { Select as ChakraSelect, SelectComponent } from 'chakra-react-select'

type Option = Record<'label' | 'value', unknown>

/**
 * `ExtractReadOnlyMap` 타입은 불변 배열(`ReadonlyArray`)에서 각 요소의 속성을 추출하여 새로운 객체 타입을 생성합니다.
 *
 * @template T 불변(`Readonly`) `label`과 `value`를 포함한 `Option` 객체 배열
 *
 * @example
 * ```ts
 * const FRUITS = [
 *  {
 *     label: 'Apple',
 *     value: 'apple',
 *   },
 *   {
 *     label: 'Banana',
 *     value: 'banana',
 *   },
 * ] as const
 *
 * type Options = ExtractReadOnlyMap<typeof FRUITS>
 * //  { label: "Apple" | "Banana" , value: "apple" | "banana" }
 * ```
 */
export type ExtractReadOnlyMap<T extends Readonly<Option[]>> = {
  [K in keyof T[number]]: T[number][K]
}

/**
 * `CommonSelect` 컴포넌트는 ` 'chakra-react-select'`를 기반으로 만들어진 똑똑한개발자 Select 컴포넌트입니다.
 * @see https://github.com/csandman/chakra-react-select
 *
 * @template T 기본 `Option` 타입
 *
 * @param options `SelectOption<T>[]`
 * @param basisProps `ChakraSelect` 컴포넌트에 전달될 추가 속성들입니다. 'chakra-react-select'의 `Props`를 확장합니다.
 *
 * @returns `ChakraSelect` 컴포넌트를 렌더링합니다.
 *
 */

export const Select: SelectComponent = ({
  options,
  isSearchable = false,
  ...basisProps
}) => {
  return (
    <ChakraSelect
      options={options}
      isSearchable={isSearchable}
      chakraStyles={{
        option: (provided, state) => ({
          ...provided,
          bg: 'transparent',
          color: 'content.1',
          _hover: {
            bg: 'primary.1',
            color: '',
          },
          _selected: {
            bg: 'primary.3',
            color: 'white',
            _hover: {
              bg: 'primary.3',
            },
          },
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          bg: 'transparent',
          p: 0,
          w: 6,
          mx: 2,
          cursor: 'inherit',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
      }}
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
      }}
      {...basisProps}
    />
  )
}
