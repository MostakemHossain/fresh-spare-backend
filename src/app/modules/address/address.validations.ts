import { z } from 'zod';

const createAddressValidationSchema = z.object({
  body: z.object({
    address_line: z.string({
      required_error: 'Address line is required',
    }),
    city: z.string({
      required_error: 'City is required',
    }),
    state: z.string({
      required_error: 'State is required',
    }),
    country: z.string({
      required_error: 'Country is required',
    }),
    pincode: z.string({
      required_error: 'Pin code is required',
    }),
    mobile: z.string({
      required_error: 'Mobile number is required',
    }),
  }),
});
const AddressValidation = {
  createAddressValidationSchema,
};

export default AddressValidation;
