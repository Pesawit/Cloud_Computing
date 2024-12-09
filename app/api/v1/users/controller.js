const fs = require('fs');
const path = require('path');
const User = require('./model');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; 

    const user = await User.findOne({
      where: { id: userId },
      attributes: ["id", "email", "name", "role", "photo"], 
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body; 
    const data = await User.findByPk(userId);

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    // Jika ada foto baru diunggah
    let newPhotoPath = null;
    if (req.file) {
      newPhotoPath = `../../../../public/uploads/profile/${req.file.filename}`;

      // Hapus foto lama jika bukan default
      if (data.photo !== "../../../../public/uploads/profile/default-profile.png") {
        const oldPhotoPath = path.join(
          "../../../../public/uploads/profile",
          path.basename(data.photo)
        );
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath); 
        }
      }
    }

    data.name = name || data.name;
    data.photo = newPhotoPath || data.photo;

    await data.save();

    res.status(200).json({
      message: "Profile updated successfully",
      data: {
        id: data.id,
        name: data.name,
        photo: data.photo,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
