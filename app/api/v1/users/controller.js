const fs = require('fs');
const path = require('path');
const User = require('./model');

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body; 
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Jika ada foto baru diunggah
    let newPhotoPath = null;
    if (req.file) {
      newPhotoPath = `../../../../public/uploads/profile/${req.file.filename}`;

      // Hapus foto lama jika bukan default
      if (user.photo !== "../../../../public/uploads/profile/default-profile.png") {
        const oldPhotoPath = path.join(
          __dirname,
          "../../../../public/uploads/profile",
          path.basename(user.photo)
        );
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath); 
        }
      }
    }

    user.name = name || user.name;
    user.photo = newPhotoPath || user.photo;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        name: user.name,
        photo: user.photo,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
