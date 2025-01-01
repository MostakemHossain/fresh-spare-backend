import { model, Schema } from 'mongoose';
import { TAddress } from './address.interface';

const addressSchema = new Schema<TAddress>(
  {
    address_line: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
    mobile: { type: String },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const AddressModel = model<TAddress>('address', addressSchema);

export default AddressModel;
