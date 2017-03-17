import styled from 'styled-components';

const Header = styled.div`
  background-color: ${({ theme: { header: { backgroundColor } } }) => backgroundColor};
  color: ${({ theme: { header: { fontColor } } }) => fontColor};
  font-size: 1.2em;
  font-family: quicksand;
`;

export default Header;
