import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async list(req, res) {
    try {
      const recipients = await Recipient.findAndCountAll({});

      return res.status(200).json({
        recipients,
      });
    } catch (err) {
      return res.status(400).json({ error: 'Recipients not found' });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      neighborhood: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zipcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    try {
      const {
        id,
        name,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipcode,
      } = await Recipient.create(req.body);

      return res.json({
        id,
        name,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipcode,
      });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      neighborhood: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      zipcode: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    try {
      const {
        name,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipcode,
      } = await recipient.update(req.body);

      return res.status(200).json({
        id,
        name,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipcode,
      });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}

export default new RecipientController();
