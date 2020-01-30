import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    try {
      const recipient = await Recipient.create(req.body);

      return res.json({ recipient });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}

export default new RecipientController();
