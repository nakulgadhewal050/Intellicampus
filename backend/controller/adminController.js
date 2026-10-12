export const getAdminDashboard = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Admin dashboard accessed successfully",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error loading admin dashboard",
    });
  }
};