exports.createQR = function (data, size = 150) {
  if (size > 500) {
    size = 150;
  }
  return `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${data}`;
};
