import React, { useRef, useEffect } from 'react';

const WatermarkedImage = ({ imageUrl, watermarkText, ...props }) => {
    const canvasRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = imgRef.current;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            ctx.font = '48px sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // Semi-transparent white
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(watermarkText, img.width / 2, img.height / 2);
        };
    }, [imageUrl, watermarkText]);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <canvas ref={canvasRef} {...props} />
            <img
                ref={imgRef}
                src={imageUrl}
                alt="Watermarked"
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default WatermarkedImage;
