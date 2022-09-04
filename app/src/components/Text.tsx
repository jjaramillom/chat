import React, {PropsWithChildren} from 'react';
import {Text, TextProps} from '@rneui/themed';

const DefaultText = (props: PropsWithChildren<TextProps>) => {
  const {children, ...rest} = props;
  return <Text {...rest}>{children}</Text>;
};

export default DefaultText;
