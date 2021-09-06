import { defaultTheme } from 'evergreen-ui';
import { colors } from '@constants';

export default {
  ...defaultTheme,
  components: {
    ...defaultTheme.components,
    Button: {
      ...defaultTheme.components.Button,
      appearances: {
        primary: {
          color: colors.primary.white,
          paddingX: 12,
          paddingY: 8,
          borderRadius: 5,
          backgroundColor: colors.primary.green,
        },
      },
    },
  },
};
