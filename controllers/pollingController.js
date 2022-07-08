const mongoose = require("mongoose");
const Poll = require("./../models/Poll");

exports.createPolling = async (req, res) => {
  const { pollingTitle, candidates } = req.body;

  const newPoll = await Poll.create({
    pollingTitle,
    candidates,
  });

  res.json({ message: "polling created ", poll: newPoll }).status(201);
};

// vote
exports.vote = async (req, res, next) => {
  const poll = await Poll.findById({
    _id: mongoose.Types.ObjectId(req.params.id),
  });

  let foundPoll;
  for (let index = 0; index < poll.candidates.length; index++) {
    if (String(poll.candidates[index]._id) === String(req.params.candidateId)) {
      foundPoll = poll.candidates[index];

      if (
        poll.candidates[index].votes.includes(
          mongoose.Types.ObjectId(req.user._id)
        )
      ) {
        res.json({ error: "Already voted" }).status(400);
      } else {
        poll.candidates[index].votes.push(req.user._id);
        res.json({ message: "Thanks for your vote.", foundPoll }).status(400);

        // save a the user vote
        poll.votes.push(req.user._id);
        await poll.save();
      }
      break;
    }
  }
};

exports.recordedVoters = async (req, res, next) => {
  const currentPoll = await Poll.findById({
    _id: mongoose.Types.ObjectId(req.params.id),
  });

  if (currentPoll.votes.includes(mongoose.Types.ObjectId(req.user._id))) {
    res.send(true).status(200);
  } else {
    res.send(false);
  }
};

exports.getOneCandidate = async (req, res, next) => {
  const poll = await Poll.findById({
    _id: mongoose.Types.ObjectId(req.params.id),
  });

  if (!poll) return next(new Error("No such choice found."));

  res.json({ poll }).status(200);
};

exports.getCandidates = async (req, res, next) => {
  const storedPolls = await Poll.find({});

  res.json({ storedPolls }).status(200);
};

exports.deletePolls = async (req, res, next) => {
  await Poll.deleteMany({});

  res.json("deleted").status(200);
};
