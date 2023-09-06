import React from 'react';

interface StyledTextContainerProps {
 
  children:any
}

const StyledTextContainer: React.FC<StyledTextContainerProps> = ({ children }) => {
  // Split the content into words
  if(typeof children === 'number'){
    
    return <div>{children}</div>;

  }
 
  const words = children.split(' ');
  const stylingWord=["without a walking aid","without assistance"]
  const combinedPattern = stylingWord.map(phrase => `(${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`).join('|');
  const regex = new RegExp(combinedPattern, 'g');
  const replacedContent = children.replace(regex, '<span class="text-red-500">$&</span>');

  console.log(words)

 
      
      return <div  dangerouslySetInnerHTML={{ __html: replacedContent }} />;
     
   
};

export default StyledTextContainer;