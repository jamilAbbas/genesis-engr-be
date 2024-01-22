const express = require("express");
const {
  getUnisByCountry,
  createUnisWithCountry,
  updateUniversityData,
} = require("../controllers/univeristy");
const router = express.Router();

router.route("/").post(createUnisWithCountry);
router.route("/getByCountry").get(getUnisByCountry);
router.route("/:uniId/:country").patch(updateUniversityData);

module.exports = router;
