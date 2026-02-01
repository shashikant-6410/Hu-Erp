import Subject from '../models/Subject.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';

const subjectController = {
  // Get all subjects with optional filters
  getAll: async (req, res, next) => {
    try {
      const { search, course, semester, department } = req.query;
      const query = { isDeleted: false };

      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }

      if (course) {
        query.course = course;
      }
      
      if (semester) {
        query.semester = semester;
      }

      if (department) {
        query.department = department;
      }

      const subjects = await Subject.find(query)
        .populate('course', 'name code')
        .populate('department', 'name code')
        .sort({ name: 1 });

      res.status(200).json({
        success: true,
        count: subjects.length,
        data: subjects,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get subject by ID
  getById: async (req, res, next) => {
    try {
      const subject = await Subject.findById(req.params.id)
        .populate('course', 'name code')
        .populate('department', 'name code');

      if (!subject) {
        throw new NotFoundError('Subject not found');
      }

      res.status(200).json({
        success: true,
        data: subject,
      });
    } catch (error) {
      next(error);
    }
  },

  // Create new subject
  create: async (req, res, next) => {
    try {
        const subject = await Subject.create(req.body);
        
        res.status(201).json({
            success: true,
            data: subject
        });
    } catch (error) {
        next(error);
    }
  },

  // Update subject
  update: async (req, res, next) => {
      try {
          const subject = await Subject.findByIdAndUpdate(
              req.params.id,
              req.body,
              { new: true, runValidators: true }
          );

          if (!subject) {
              throw new NotFoundError('Subject not found');
          }

          res.status(200).json({
              success: true,
              data: subject
          });
      } catch (error) {
          next(error);
      }
  },

  // Delete subject
  delete: async (req, res, next) => {
      try {
          const subject = await Subject.findById(req.params.id);

          if (!subject) {
              throw new NotFoundError('Subject not found');
          }

          // Soft delete
          subject.isDeleted = true;
          await subject.save();

          res.status(200).json({
              success: true,
              message: 'Subject deleted successfully'
          });
      } catch (error) {
          next(error);
      }
  }
};

export default subjectController;
