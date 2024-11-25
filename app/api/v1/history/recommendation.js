const getRecommendation = (result) => {
  switch (result) {
    case "brown spots":
      return "Pohon membutuhkan perawatan tambahan seperti penyiraman rutin, pupuk nitrogen, dan pemangkasan daun yang terinfeksi.";
    case "healthy":
      return "Pohon dalam kondisi sehat. Pastikan untuk melanjutkan perawatan rutin seperti penyiraman dan pemupukan.";
    case "white scale":
      return "Pohon membutuhkan penyemprotan insektisida untuk mengendalikan hama, dan perawatan tanah untuk meningkatkan kesehatan akar.";
    default:
      return "Hasil tidak dikenali.";
  }
};

module.exports = getRecommendation;