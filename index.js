//logging help
console.log(`"\u001b[1;35m <---------------------------->" `);
//Log the time in color
console.log(`"\u001b[1;42m" ${Date().toString()} "\u001b[0m"`);

//
//Express
//
const express = require("express");
const { UUIDV4 } = require("sequelize");
const app = express();
const PORT = process.env.PORT || 5673;
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`\u001b[1;42m" Listening on Port ${PORT} "\u001b[0m`);
});
//

//
//Sequelize stuff
//
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    "postgresql://ericrodgers@localhost/acme_country_club"
);
const sequelizeCheck = () => {
  try {
    sequelize.authenticate();
    console.log(`Sequelize is setup and the DB you are connecting to is okay`);
  } catch (error) {
    console.log(error);
  }
};

//sequelizeCheck();
//

// //
// //Model definitions
// //
// const Member = sequelize.define("member", {
//   id: {
//     type: Sequelize.DataTypes.UUID,
//     defaultValue: Sequelize.DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   name: {
//     type: Sequelize.DataTypes.STRING(20),
//     allowNull: false,
//   },
// });

// const Facility = sequelize.define("facility", {
//   id: {
//     type: Sequelize.DataTypes.UUID,
//     primaryKey: true,
//     defaultValue: Sequelize.DataTypes.UUIDV4,
//   },
//   name: {
//     type: Sequelize.DataTypes.STRING(20),
//     allowNull: false,
//   },
// });

// const Booking = sequelize.define("booking", {
//   id: {
//     type: Sequelize.DataTypes.UUID,
//     defaultValue: Sequelize.DataTypes.UUIDV4,
//     primaryKey: true,
//   },
// });

// //<thing>.hasMany(<items>) crates an itemsId column in the things table
// Booking.belongsTo(Member, { as: "booker" });
// Booking.belongsTo(Facility);
// //Facility.findall({include:[Booking]})
// Facility.hasMany(Booking);
// //Put a Member id as Sponsor in Member 1st Member is alias
// Member.belongsTo(Member, { as: "sponsor" });
// //Has many realtionship
// //Member.hasMany(Booking);
// Member.hasMany(Member, { foreignKey: "sponsorId", as: "sponsored" });

// const go = async () => {
//   try {
//     await sequelize.sync({ force: true });
//     const moe = await Member.create({ name: "moe " });
//     const lucy = await Member.create({ name: "lucy" });
//     const ethyl = await Member.create({ name: "ethyl" });
//     const larry = await Member.create({ name: "larry" });
//     //Member.hasMany(Member,{foreignKey: 'sponsorId', as: sponsored})
//     ethyl.sponsorId = moe.id;
//     await ethyl.save();
//     moe.sponsorId = lucy.id;
//     await moe.save();
//     larry.sponsorId = lucy.id;
//     await larry.save();

//     const tennis = await Facility.create({ name: "tennis" });
//     const pingpong = await Facility.create({ name: "pingpong" });
//     const marbles = await Facility.create({ name: " marbles" });

//     await Booking.create({ facilityId: marbles.id, bookerId: lucy.id });
//     await Booking.create({ facilityId: marbles.id, bookerId: lucy.id });
//     await Booking.create({ facilityId: tennis.id, bookerId: moe.id });
//   } catch (error) {
//     console.log(error);
//   }
// };

// go();
// //
/*
acme_country_club=# select * from members;
                  id                  | name  |         createdAt          |         updatedAt          |              sponsorId               
--------------------------------------+-------+----------------------------+----------------------------+--------------------------------------
 5ee71b3f-c198-445e-addc-bd87380f952a | lucy  | 2022-02-16 20:37:03.869-05 | 2022-02-16 20:37:03.869-05 | 
 187b75d1-7877-4c02-b7a7-314b75fac05e | ethyl | 2022-02-16 20:37:03.87-05  | 2022-02-16 20:37:03.872-05 | b00e9bd6-cafa-4733-933e-5907db8574c5
 b00e9bd6-cafa-4733-933e-5907db8574c5 | moe   | 2022-02-16 20:37:03.866-05 | 2022-02-16 20:37:03.874-05 | 5ee71b3f-c198-445e-addc-bd87380f952a
 fccd508a-5352-4b60-be44-3b5e5c6c193f | larry | 2022-02-16 20:37:03.871-05 | 2022-02-16 20:37:03.875-05 | 5ee71b3f-c198-445e-addc-bd87380f952a
(4 rows)

acme_country_club=# select * from facilities;
                  id                  |   name   |         createdAt          |         updatedAt          
--------------------------------------+----------+----------------------------+----------------------------
 c5c9c3d5-382d-4f6e-b396-e8a0d662c2f9 | tennis   | 2022-02-16 20:37:03.876-05 | 2022-02-16 20:37:03.876-05
 56ceaa60-929b-404f-8b4d-ed3d382e7500 | pingpong | 2022-02-16 20:37:03.877-05 | 2022-02-16 20:37:03.877-05
 74003576-8396-4fc4-99b9-3f682bd862aa |  marbles | 2022-02-16 20:37:03.878-05 | 2022-02-16 20:37:03.878-05
(3 rows)

acme_country_club=# select * from bookings;
                  id                  |         createdAt          |         updatedAt          |               bookerId               |              facilityId              
--------------------------------------+----------------------------+----------------------------+--------------------------------------+--------------------------------------
 3452b276-9ef9-43df-80fd-dc2caa7b2135 | 2022-02-16 20:37:03.879-05 | 2022-02-16 20:37:03.879-05 | 5ee71b3f-c198-445e-addc-bd87380f952a | 74003576-8396-4fc4-99b9-3f682bd862aa
 5c5eaeab-2e4f-459f-a8d0-972082e5a1f9 | 2022-02-16 20:37:03.88-05  | 2022-02-16 20:37:03.88-05  | 5ee71b3f-c198-445e-addc-bd87380f952a | 74003576-8396-4fc4-99b9-3f682bd862aa
 f0dcf5a4-0e11-4bfa-bb08-287abf5a5c04 | 2022-02-16 20:37:03.881-05 | 2022-02-16 20:37:03.881-05 | b00e9bd6-cafa-4733-933e-5907db8574c5 | c5c9c3d5-382d-4f6e-b396-e8a0d662c2f9
*/

app.get("/", (req, res) => {
  res.redirect("/api/facilities");
});

// app.get("/api/facilities", async (req, res, next) => {
//   try {
//     res.send(
//       await Facility.findAll({
//         include: [Booking],
//       })
//     );
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

// app.get("/api/members", async (req, res) => {
//   try {
//     res.send(
//       await Member.findAll({
//         include: [
//           { model: Member, as: "sponsor" },
//           { model: Member, as: "sponsored" },
//         ],
//       })
//     );
//   } catch (error) {}
// });

//Router
const router = require("./routes/api");
app.use("/api", router);
