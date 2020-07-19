import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { css } from 'lib/constants';

interface TextInputProps {
  name: string;
  placeholder?: string;
  isDisabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'url' | 'search' | 'number';
  value: any;
  onChange?: any;
  onKeyDown?: any;
  onClick?: any;
  className?: string;
  ref?: any;
  id?: string;
}

const StyledInput = styled.input`
  color: ${css.textGray};
  font-size: 1.7rem;
  margin: 0.5rem 0 1rem;
  display: block;
  text-align: left;
  padding: 0.7rem 1.5rem;
  border-radius: 5px;
  font-weight: 500;
  background: ${css.white};
  transition: all 140ms ease-in;
  border: 1px solid ${css.borderGray};
  width: calc(100% - 3rem);

  &:hover,
  &:focus {
    border-color: ${css.pink};
    outline: none;
    box-shadow: 1px 1px 3px ${css.borderGray};
  }
`;

const TextInput: React.SFC<TextInputProps> = forwardRef(
  (props: TextInputProps, ref: any) => {
    const { id, name, className, isDisabled, ...remainingProps } = props;

    return (
      <StyledInput
        className={className}
        disabled={isDisabled}
        id={id || name}
        name={name}
        ref={ref}
        {...remainingProps}
      />
    );
  },
);

TextInput.defaultProps = {
  isDisabled: false,
  type: 'text',
};

export default TextInput;
