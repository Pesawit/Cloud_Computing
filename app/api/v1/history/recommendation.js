const getRecommendation = (result) => {
	switch (result) {
		case "Brown Spot":
			return "Mengatasi brown spot pada sawit, perlu pupuk yang dapat meningkatkan daya tahan tanaman dan memperbaiki kondisi tanah. pupuk dengan kandungan kalium yang cukup untuk meningkatkan daya tahan tanaman. produk untuk mengatasi brown spot: KCl (Potassium Chloride) ,MKP (Mono Potassium Phosphate), MKP (Mono Potassium Phosphate), pupuk organik seperti kompos dan pupuk kandang";
		case "Healthy":
			return "Pohon dalam kondisi sehat. Pastikan untuk melanjutkan perawatan rutin seperti penyiraman dan pemupukan.";
		case "White Scale":
			return "White scale pada pohon palem sering kali merupakan tanda adanya serangga sisik, produk untuk Mengendalikan White Scale yaitu Insektisida nabati: agromec atau Natural BVR lalu Insektisida kimia: Marshal 200 EC, Confidor 200 SL, Actara 25 WG, atau Matador 25 EC";
		default:
			return "Hasil tidak dikenali.";
	}
};

module.exports = getRecommendation;
