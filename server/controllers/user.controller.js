import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({ message: "Failed to get current user" })
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: `getCurrentUser error: ${error}` })
  }
}

export const saveAssistant = async (req, res) => {
  try {
    const {
      assistantName,
      businessName,
      businessType,
      businessDescription,
      tone,
      theme,
      geminiApiKey,
      pages,
    } = req.body

    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.assistantName = assistantName;
    user.businessName = businessName;
    user.businessDescription = businessDescription;
    user.businessType = businessType;
    user.tone = tone;
    user.theme = theme;

    if (geminiApiKey) {
      user.geminiApiKey = geminiApiKey;
    }

    user.geminiStatus = "Active";       // ✅ capital A to match schema enum
    user.pages = pages || [];
    user.isSetupComplete = true;        // ✅ fixed field name

    await user.save();
    return res.status(200).json(user);

  } catch (error) {
    console.log("saveAssistant error:", error);
    return res.status(500).json({ message: `Failed to save: ${error.message}` })
  }
}
