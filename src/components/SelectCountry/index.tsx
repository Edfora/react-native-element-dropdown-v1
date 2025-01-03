import React, {
  useImperativeHandle,
  useMemo,
  useRef,
  ReactElement,
  JSXElementConstructor,
} from 'react';
import { Image, View, Text } from 'react-native';
import Dropdown from '../Dropdown';
import { SelectCountryProps } from './model';
import { styles } from './styles';

const SelectCountryComponent: <T>(
  props: SelectCountryProps<T>
) => ReactElement<any, string | JSXElementConstructor<any>> | null =
  React.forwardRef((props, currentRef) => {
    const {
      data,
      value,
      valueField,
      labelField,
      imageField,
      selectedTextStyle,
      imageStyle,
    } = props;
    const ref: any = useRef(null);

    useImperativeHandle(currentRef, () => {
      return { open: eventOpen, close: eventClose };
    });

    const eventOpen = () => {
      ref.current.open();
    };

    const eventClose = () => {
      ref.current.close();
    };

    const _renderItem = (item: any) => {
      return (
        <View style={styles.item}>
          {item[imageField]()}
        </View>
      );
    };

    const selectItem: any = useMemo(() => {
      const index = data.findIndex((e: any) => e[valueField] === value[valueField]);
      return data[index];
    }, [data, valueField, value]);

    return (
      <Dropdown
        ref={ref}
        {...props}
        renderItem={_renderItem}
        renderLeftIcon={() => {
          if (selectItem?.imageField) {
            return selectItem[imageField]()
          } else {
            return null;
          }
        }}
      />
    );
  });

export default SelectCountryComponent;
