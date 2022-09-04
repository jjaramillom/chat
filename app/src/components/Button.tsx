import React from 'react';
import {Button, ButtonProps} from '@rneui/themed';

const DefaultButton = (props: ButtonProps) => {
  return <Button activeOpacity={0.6} radius="md" {...props} />;
};

export default DefaultButton;
