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
  color: ${(props) => props.color || " #61656D"};
  text-align: center;
  font-size: 22px;
  font-style: normal;
  line-height: 24px; /* 109.091% */
  letter-spacing: 0.12px;
  font-weight: ${(props) => props.weight || 600};
  line-height: normal;
  ${commonFontSize} // Reuse the common font size
  ${customMargin}s
`;


export const TypoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-shrink: 0;
  margin-top: 100px;
  margin-bottom: 30px;
`;

export const CategoryBox = styled.div`
align-items: flex-end;
border-bottom: 1px solid #61656D;
display: flex;
gap: 30px;
height: 34px;
justify-content: center;
padding: 10px 0px;
width: 100%;
`;

export const CategoryButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  &:hover {
    background: #fff;
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
  overflow: hidden;
`;

export const TypoWhite = styled.span`
  display: ${(props) => props.display || "block"};
  width: ${(props) => props.width || "fit-content"};
  color: #4E4B66;
  font-weight: ${(props) => props.weight || 600};
  line-height: normal;
  ${commonFontSize} // Reuse the common font size
  ${customMargin}
`;
export const TitleTypo = styled.span`
  display: ${(props) => props.display || "block"};
  width: ${(props) => props.width || "fit-content"};
  color: #4E4B66;
  font-weight: 800;
  line-height: normal;
  ${commonFontSize} // Reuse the common font size
  ${customMargin}
  text-align: center;
  margin-bottom: 4px;
`;
export const ContentTypo = styled.span`
  display: ${(props) => props.display || "block"};
  width: ${(props) => props.width || "fit-content"};
  color: #4E4B66;
  font-weight: 600;
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
padding-left: 10px;
`;

export const ImageFrame = styled.div`
  border: 1px solid;
  border-color: #C4C4C4;
  border-radius: 8.38px;
  width: 88px;
  height: 88px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `;
  export const NewsImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;
  export const BookmarkButton = styled.img`
    cursor: pointer;
    margin-left: 210px;
    margin-top: 5px;
    width: 20px;
    height: 20px;
  `;

  export const ReadMoreLink = styled.a`
  font-size: 10px;
  display: block; 
  margin-top: 10px; 
  text-align: right; 
`;
