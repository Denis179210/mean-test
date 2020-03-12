import { Record } from "../models/record.model";
import { Role } from '../models';

class Controller {

  async aggregate(req, res) {
    try {

      const aggregation = await Record.aggregate([{ $group: { _id: '$role', count: { $sum: 1}}}])
      const population = await Role.populate(aggregation, {path: '_id', select: 'name',});
      const stats = population.reduce((acc, doc) => {
        return {
          ...acc,
          [doc._id.name]: doc.count,
        }
      }, {});

      await res.json(stats);

    } catch (e) {
      console.error(e);
      res.status(400).end(e.message);
    }
  }

  async receiveMany(req, res) {
    try {
      const criteria = {
        $and: [
          {
            user: req.user._id
          },
          {
            role: req.query.role ? { $eq: req.query.role } : {$exists: true}
          },
          {
            $or: [
              { firstName: { $regex: new RegExp(req.query.search, 'i') }},
              { lastName: { $regex: new RegExp(req.query.search, 'i') }},
              { email: { $regex: new RegExp(req.query.search, 'i') }}
            ]
          }
        ],
      };

      await res.json({
        count: await Record.estimatedDocumentCount(),
        prev: null,
        next: '',
        results: await Record
          .find(criteria)
          .populate('role')
          .exec()
        });

    } catch (e) {
      console.error(e);
    }
  }

  async create(req, res) {
    try {
      const record = await Record.create({...req.body, user: req.user._id});
      await res.json(record);
    } catch (e) {
      console.error(e);
      res.status(400).end(e.message);
    }
  }

  async update(req, res) {
    try {
      const record = Record.findByIdAndUpdate(req.params._id, req.body).exec();
      await res.json(record);
    } catch (e) {
      console.error(e);
    }
  }

  async remove(req, res) {
    try {
      const record = Record.findByIdAndDelete(req.params._id).exec();
      await res.json({record});
    } catch (e) {
      console.error(e);
    }
  }

  async exists(req, res) {
    try {
      const record = await Record.findOne({email: decodeURIComponent(req.query.email)});
      await res.json({exists: !!record});
    } catch (e) {
      console.error(e);
    }
  }

}

export const RecordController = new Controller();
