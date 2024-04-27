// theme.ts
import { extendTheme } from '@chakra-ui/react';

// create a buttonprops interface
interface ButtonProps {
  colorScheme: 'primary' | 'secondary';
}

const customTheme = extendTheme({
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold', // Normally, you would adjust the font weight like this
      },
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
      },
      variants: {
        'with-shadow': {
          bg: 'red.400',
          boxShadow: '0 0 2px 2px #efdfde',
        },
        solid: (props: ButtonProps) => ({
          bg: props.colorScheme === 'primary' ? 'red.300' : 'red.500',
        }),
      },
    },
  },
});

export default customTheme;
