import React from 'react'

interface IProps {
  bgcolor: string;
  completed: number;
}

const ProgressBar = (props: IProps) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 16,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    transition: 'width 1s ease-in-out',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div 
      //  @ts-ignore
      style={fillerStyles}>
        <span 
        //  @ts-ignore
        style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;