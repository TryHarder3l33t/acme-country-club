const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    "postgresql://ericrodgers@localhost/acme_country_club"
);

//
//Model definitions
//
const Member = sequelize.define("member", {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: false,
  },
});

const Facility = sequelize.define("facility", {
  id: {
    type: Sequelize.DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  name: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: false,
  },
});

const Booking = sequelize.define("booking", {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
    primaryKey: true,
  },
});

//<thing>.hasMany(<items>) crates an itemsId column in the things table
Booking.belongsTo(Member, { as: "booker" });
Booking.belongsTo(Facility);
//Facility.findall({include:[Booking]})
Facility.hasMany(Booking);
//Put a Member id as Sponsor in Member 1st Member is alias
Member.belongsTo(Member, { as: "sponsor" });
//Has many realtionship
//Member.hasMany(Booking);
Member.hasMany(Member, { foreignKey: "sponsorId", as: "sponsored" });

const go = async () => {
  try {
    await sequelize.sync({ force: true });
    const moe = await Member.create({ name: "moe " });
    const lucy = await Member.create({ name: "lucy" });
    const ethyl = await Member.create({ name: "ethyl" });
    const larry = await Member.create({ name: "larry" });
    //Member.hasMany(Member,{foreignKey: 'sponsorId', as: sponsored})
    ethyl.sponsorId = moe.id;
    await ethyl.save();
    moe.sponsorId = lucy.id;
    await moe.save();
    larry.sponsorId = lucy.id;
    await larry.save();

    const tennis = await Facility.create({ name: "tennis" });
    const pingpong = await Facility.create({ name: "pingpong" });
    const marbles = await Facility.create({ name: " marbles" });

    await Booking.create({ facilityId: marbles.id, bookerId: lucy.id });
    await Booking.create({ facilityId: marbles.id, bookerId: lucy.id });
    await Booking.create({ facilityId: tennis.id, bookerId: moe.id });
  } catch (error) {
    console.log(error);
  }
};

go();
//

router.get("/", (req, res) => {
  res.redirect("./facilities");
});

router.get("/facilities", async (req, res, next) => {
  try {
    res.send(
      await Facility.findAll({
        include: [Booking],
      })
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/members", async (req, res) => {
  try {
    res.send(
      await Member.findAll({
        include: [
          { model: Member, as: "sponsor" },
          { model: Member, as: "sponsored" },
        ],
      })
    );
  } catch (error) {}
});

module.exports = router;
