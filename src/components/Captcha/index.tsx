import * as React from 'react';

function getBase64DataUrl(
  code: string,
  width: number,
  height: number,
  fontSize = 20,
  fontFamily = 'Arial',
) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  // ctx.fillStyle = '#e91e63';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px ${fontFamily}`;
  // ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(code, canvas.width / 2, (canvas.height + fontSize) / 2);

  return canvas.toDataURL('image/png');
}

interface CaptchaProps {
  code: string;
  className?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  fontFamily?: string;
}

const Captcha = (props: CaptchaProps) => {
  const { code, className, width = 100, height = 40, fontSize, fontFamily } = props;

  return (
    <img
      src={getBase64DataUrl(code, width, height, fontSize, fontFamily)}
      alt="captcha"
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Captcha;
