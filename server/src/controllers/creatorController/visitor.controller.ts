import { Request, Response, NextFunction } from 'express';
import Visitor, { IVisitor } from '../../models/creatorModels/visitor.model.js';

class VisitorController {
    public async addVisitor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { instagramLink } = req.body;

            // Check if the visitor already exists in the database
            const existingVisitor: IVisitor | null = await Visitor.findOne({ instagramLink });

            let data;
            if (existingVisitor) {
                data = { existingVisitor, isExists: true };
                // If the visitor already exists, redirect them to the login page
                res.status(201).json({
                    success: true,
                    message: 'Visitor already exists',
                    data
                });
            } else {
                // If the visitor doesn't exist, create a new visitor record
                const visitor: IVisitor = await Visitor.create({
                    instagramLink,
                    registered: false
                });

                data = { visitor, isExists: false };
                res.status(201).json({
                    success: true,
                    message: 'Visitor added successfully',
                    data
                });
            }
        } catch (error: any) {
            next(error);
        }
    }

    public async getNotRegisteredVisitors(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const notRegisteredVisitors: IVisitor[] = await Visitor.find({ registered: false });

            res.status(200).json({
                success: true,
                message: 'Not registered visitors fetched successfully',
                notRegisteredVisitors
            });
        } catch (error: any) {
            next(error);
        }
    }
}

export default new VisitorController();
