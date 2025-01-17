const Assignment = require("../models/assignmentModel");

exports.upload = async (req, res) => {
  const { task, admin } = req.body;
  const userId = req.user.id;
  try {
    const assignment = new Assignment({ userId, task, admin });
    await assignment.save();
    res.status(201).json({ msg: "Assignment submitted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error submitting assignment" });
  }
};

exports.viewAssignments = async (req, res) => {
  const adminId = req.user.id;
  try {
    const assignments = await Assignment.find({ admin: adminId })
      .populate("userId", "name")
      .exec();
    res.json(assignments);
  } catch (err) {
    res.status(400).json({ error: "Error fetching assignments" });
  }
};

exports.changeStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["accepted", "rejected"].includes(status))
    return res.status(400).json({ error: "Invalid status" });

  try {
    const assignment = await Assignment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(assignment);
  } catch (err) {
    res.status(400).json({ error: "Error updating status" });
  }
};
