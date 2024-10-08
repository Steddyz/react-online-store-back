const { Device } = require("../models/models");
const ApiError = require("../error/ApiError");
const { DeviceInfo } = require("../models/models");

const path = require("path");
const uuid = require("uuid");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;

      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          });
        });
      }

      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    const offset = page * limit - limit;

    if (!brandId && !typeId) {
      const devices = await Device.findAndCountAll({ limit, offset });
      return res.json(devices);
    }

    if (brandId && !typeId) {
      const devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
      return res.json(devices);
    }
    if (!brandId && typeId) {
      const devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
      return res.json(devices);
    }

    if (brandId && typeId) {
      const devices = await Device.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
      return res.json(devices);
    }
  }
  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();
