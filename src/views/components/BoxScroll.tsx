import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

// ** Styled Dialog component
export const BoxScroll = styled(Box)`
  &.containScroll {
    overflow-x: 'hidden';
  }
  &.containScroll::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  &.containScroll::-webkit-scrollbar:vertical {
    width: 10px;
  }

  &.containScroll::-webkit-scrollbar-button:increment,
  &.containScroll::-webkit-scrollbar-button {
    display: none;
  }

  &.containScroll::-webkit-scrollbar:horizontal {
    height: 10px;
  }

  &.containScroll::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
  }

  &.containScroll::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &.containScroll::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  &.containScroll::-webkit-scrollbar:vertical {
    width: 10px;
  }

  &.containScroll::-webkit-scrollbar-button:increment,
  &.containScroll::-webkit-scrollbar-button {
    display: none;
  }

  &.containScroll::-webkit-scrollbar:horizontal {
    height: 10px;
  }

  &.containScroll::-webkit-scrollbar-thumb {
    background-color: rgba(194, 194, 194, 0.726);
    border-radius: 10px;
  }

  &.containScroll::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #f1f1f1;
  }
`
