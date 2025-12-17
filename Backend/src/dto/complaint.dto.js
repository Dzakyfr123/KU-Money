import Joi from 'joi';

export default class CreateComplaintDTO {
  constructor({ title, category, text, attachment }) {
    const schema = Joi.object({
      title: Joi.string().required(),
      category: Joi.string().required(),
      text: Joi.string().required(),
      attachment: Joi.any().optional(),
    });

    const { error, value } = schema.validate({ title, category, text, attachment });
    if (error) {
      throw new Error(`Validation error: ${error.message}`);
    }

    this.title = value.title;
    this.category = value.category;
    this.text = value.text;
    this.attachment = value.attachment || null;
  }
}
