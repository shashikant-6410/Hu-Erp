import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
      index: true,
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
      index: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
      index: true,
    },
    academicYear: {
      type: String,
      required: true,
      index: true,
    },
    dayOfWeek: {
      type: String,
      enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
      required: true,
      index: true,
    },
    startTime: {
      type: String, // "09:00"
      required: true,
    },
    endTime: {
      type: String, // "10:00"
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['THEORY', 'PRACTICAL'],
      default: 'THEORY',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast schedule queries
timetableSchema.index({ course: 1, semester: 1, dayOfWeek: 1 });
timetableSchema.index({ faculty: 1, dayOfWeek: 1 });

// Soft delete filter
timetableSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

const Timetable = mongoose.model('Timetable', timetableSchema);
export default Timetable;