import styled from 'styled-components';

const Row = styled.div`
  color: ${({ theme: { row: { fontColor } } }) => fontColor};
  background-color: ${({ isRowOdd, theme: { row: { dark, light } } }) => isRowOdd ? light : dark}
`;

export default Row;
