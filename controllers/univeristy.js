const { Op } = require("sequelize");
const { University, sequelize } = require("../models");

// API to save country name and data of universities in database
exports.createUnisWithCountry = async (req, res) => {
  const t = await sequelize.transaction();
  const { country, uniData } = req.body;
  //fix the state-province api column name issue -  Need to remove the dash and insert underscore
  const modifiedApiData = uniData.map((uni) => ({
    ...uni,
    state_province: uni["state-province"],
  }));
  try {
    const existingRec = await University.findAndCountAll({
      where: { country: country },
    });
    if (existingRec.Count > 0) {
      return res
        .status(400)
        .json({ message: "Data already exists for this country" });
    }
    const unis = await University.bulkCreate(modifiedApiData, {
      transaction: t,
    });
    t.commit();
    return res.status(200).json({ message: "Success", data: unis });
  } catch (err) {
    t.rollback();
    return res.status(500).json("failed to bulk insert unis " + err);
  }
};

// API to retrieve data of universities based on country name

exports.getUnisByCountry = async (req, res) => {
  try {
    const { country } = req.params;
    const unis = await University.findAll({
      where: {
        country: {
          [Op.iLike]: country,
        },
      },
    });
    return res.status(200).json({ message: "Success", data: unis });
  } catch (err) {
    return res.status(500).json("failed to get unis " + err);
  }
};

// API to update the data of a university based on country name and university ID
exports.updateUniversityData = async (req, res) => {
  const t = await new sequelize.transaction();
  try {
    const { country, uniId } = req.params;
    const existingRec = await University.findByPk(uniId);
    if (!existingRec) {
      return res.status(404).json("No records found for this ID");
    }
    const unis = await University.update(
      { ...req.body },
      { where: { country, id: uniId } },
      { transaction: t }
    );
    t.commit();
    return res.status(200).json({ message: "success", data: unis });
  } catch (err) {
    t.rollback();
    return res.status(500).json("failed to update unis " + err);
  }
};
