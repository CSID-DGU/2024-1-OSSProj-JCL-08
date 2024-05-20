import styled, { css } from "styled-components";

const customMargin = css`
  margin: ${(props) =>
    `${props.top || "0px"} ${props.right || "0px"} ${props.bottom || "0px"} ${
      props.left || "0px"
    }`};
`;

const commonFontSize = css`
  font-size: ${(props) => props.size || "50px"};
`;

export const Root = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
  width: 100%;
  height: 100%;
  `;

export const Typo = styled.span`
  display: ${(props) => props.display || "block"};
  width: ${(props) => props.width || "fit-content"};
  color: #000;
  text-align: center;
  font-weight: ${(props) => props.weight || 600};
  line-height: normal;
  ${commonFontSize} // Reuse the common font size
  ${customMargin}
`;

export const TypoOrange = styled.span`
  color: #ff7425;
`;

export const TypoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 181px;
  flex-shrink: 0;
`;

export const CategoryBox = styled.div`
align-items: flex-end;
border-bottom-style: solid;
border-bottom-width: 1px;
border-color: #61656c;
display: flex;
gap: 30px;
height: 34px;
justify-content: center;
padding: 10px 0px;
width: 100%;
`;

export const CategoryButton = styled.button`
  display: flex;
  padding: 13px 26px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: rgba(220, 220, 220, 0.2);
  &:hover {
    background: rgba(108, 106, 106, 0.2);
  }
`;

export const ContentsBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
  width: 100%;
  height: 100%;
  `;

export const ContentsBox2 = styled.div`
border: 0.8px solid;
border-color: #000000;
border-radius: 10px;
height: 176px;
width: 345px;
display: flex;
`;

export const Contents = styled.div`
  display: flex;
  width: 345px;
  height: 176px;
  flex-shrink: 0;
  padding-left: 24px;
  padding-top: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
`;

export const TypoWhite = styled.span`
  display: ${(props) => props.display || "block"};
  width: ${(props) => props.width || "fit-content"};
  color: #000;
  font-weight: ${(props) => props.weight || 600};
  line-height: normal;
  ${commonFontSize} // Reuse the common font size
  ${customMargin}
`;


export const Layout_R = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 50px;
height: 176px;
flex-shrink: 0;
padding: 30px;
`;

export const Layout_L = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 200px;
height: 176px;
flex-shrink: 0;
padding: 10px;
`;

export const ImageFrame = styled.div`
  border: 1px solid;
  border-color: #000000;
  border-radius: 8.38px;
  width: 88px;
  height: 88px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `;

  export const BookmarkButton = styled.img`
    cursor: pointer;
    margin-left: 210px;
    width: 20px;
    height: 20px;
  `;