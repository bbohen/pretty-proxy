import styled from 'styled-components';

const Row = styled.div`
  color: #B0BEC5;
  background-color: ${props => props.isRowOdd ? '#37474F' : '#263238'}
`;

export default Row;
