import React from 'react';
import { Button, Group } from 'evergreen-ui';
import './index.css';

const FormatPicker = ({ data, selected, onSelect }) => (
  <Group>
    {data.map((item, index) => (
      <Button
        key={index}
        width="64px"
        className="no-shadow"
        appearance={selected.value === item.value ? 'primary' : 'default'}
        intent={selected.value === item.value ? 'success' : ''}
        onClick={() => {
          if (onSelect) {
            onSelect(item);
          }
        }}
      >
        {item.name}
      </Button>
    ))}
  </Group>
);

export default FormatPicker;
