export const randomColor = () => {
    const randomR = Math.floor(Math.random() * 128) + 128;
    const randomG = Math.floor(Math.random() * 128) + 128;
    const randomB = Math.floor(Math.random() * 128) + 128;
  
    // Thêm dấu ngoặc để ESLint không báo lỗi
    const randomHex = `#${((1 << 24) | (randomR << 16) | (randomG << 8) | randomB)
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  
    return randomHex;
  };
  